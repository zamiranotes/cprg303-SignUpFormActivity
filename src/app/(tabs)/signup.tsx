import { Text, TextInput, Pressable, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const signupSchema = z.object({
  firstName: z.string().min(2, "First name is required, 2 characters minimum").max(30, "First name must be less than 30 characters"),
  lastName: z.string().min(2, "Last name is required, 2 characters minimum").max(30, "Last name must be less than 30 characters"),
  email: z.email("Enter a valid email address"),
  password: z.string().min(8, "Must contain at least 8 characters"),
  confirmPassword: z.string(),
});

type SignupFormData = z.infer<typeof signupSchema>;

