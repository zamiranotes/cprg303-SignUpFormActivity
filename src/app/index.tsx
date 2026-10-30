import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { Control, Controller, FieldPath, useForm } from "react-hook-form";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";
import { z } from "zod";

const signupSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(2, "First name is required, 2 characters minimum")
      .max(30, "First name must be 30 characters or less"),
    lastName: z
      .string()
      .trim()
      .min(2, "Last name is required, 2 characters minimum")
      .max(30, "Last name must be 30 characters or less"),
    email: z.string().trim().email("Enter a valid email address"),
    password: z.string().min(8, "Must contain at least 8 characters"),
    confirmPassword: z.string().min(1, "Password confirmation is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type SignupFormData = z.infer<typeof signupSchema>;

type FieldProps = {
  control: Control<SignupFormData>;
  name: FieldPath<SignupFormData>;
  placeholder: string;
  secure?: boolean;
  email?: boolean;
};

function Field({ control, name, placeholder, secure, email }: FieldProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <>
          <TextInput
            style={styles.input}
            placeholder={placeholder}
            secureTextEntry={secure}
            keyboardType={email ? "email-address" : "default"}
            autoCapitalize={email ? "none" : "sentences"}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
          />
          {error && <Text style={styles.error}>{error.message}</Text>}
        </>
      )}
    />
  );
}

export default function SignUpScreen() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (d: SignupFormData) => {
    console.log("Valid data:", d);
    router.push({
      pathname: "/confirmation",
      params: { firstName: d.firstName },
    });
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>New User? Sign Up Today!</Text>
      <Field control={control} name="firstName" placeholder="First Name" />
      <Field control={control} name="lastName" placeholder="Last Name" />
      <Field control={control} name="email" placeholder="Enter Email" email />
      <Field
        control={control}
        name="password"
        placeholder="Enter Password"
        secure
      />
      <Field
        control={control}
        name="confirmPassword"
        placeholder="Confirm Password"
        secure
      />
      <Pressable style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    gap: 20,
  },
  field: {
    gap: 5,
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
  },
  errorText: {
    borderColor: "#c62828",
  },
  error: {
    color: "#f31414",
    fontSize: 13,
  },
  button: {
    backgroundColor: "#03142c",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
});
