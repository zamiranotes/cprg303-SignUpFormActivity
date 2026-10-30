import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Sign Up Page" }} />
      <Stack.Screen
        name="confirmation"
        options={{ title: "Account Created" }}
      />
    </Stack>
  );
}
