/* eslint-disable @typescript-eslint/no-explicit-any */
import z from "zod";

export const registerPatientValidationZodSchema = z
    .object({
        name: z.string().min(1, { message: 'Name is required' }).min(2, { message: 'Name must be at least 2 characters' }).max(100, { message: 'Name must not exceed 100 characters' }).trim(),
        address: z
            .string()
            .min(1, { message: 'Address is required' })
            .min(5, { message: 'Address must be at least 5 characters' })
            .max(255, { message: 'Address must not exceed 255 characters' })
            .trim(),
        email: z
            .string()
            .min(1, { message: 'Email is required' })
            .email({ message: 'Please enter a valid email address' })
            .max(255, { message: 'Email must not exceed 255 characters' })
            .toLowerCase()
            .trim(),
        password: z
            .string()
            .min(1, { message: 'Password is required' })
            .min(8, { message: 'Password must be at least 8 characters' })
            .max(100, { message: 'Password must not exceed 100 characters' })
            .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~])/, {
                message: 'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character'
            }),
        confirmPassword: z
            .string()
            .min(1, { message: 'Confirm Password is required' })
            .refine(val => val.length > 0, { message: 'Confirm Password is required' })
    })
    .refine((data: any) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword']
    })
    .strict();

    export const loginValidationZodSchema = z
        .object({
            email: z.string().min(1, 'Email is required').email('Please enter a valid email address').toLowerCase().trim().max(255, 'Email must not exceed 255 characters'),

            password: z
                .string()
                .min(1, 'Password is required')
                .min(8, 'Password must be at least 8 characters')
                .max(100, 'Password must not exceed 100 characters')
                .regex(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~])/,
                    'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character'
                )
        })
        .strict();
