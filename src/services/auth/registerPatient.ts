/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import z from 'zod';

const registerValidationZodSchema = z
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

// export type RegisterValidation = z.infer<typeof registerValidationZodSchema>;

export const registerPatient = async (_currentState: any, formData: any): Promise<any> => {
    try {
        // Validate form data using Zod schema
        // const validationResult = registerValidationZodSchema.safeParse({
        //     name: formData.get('name'),
        //     address: formData.get('address'),
        //     email: formData.get('email'),
        //     password: formData.get('password'),
        //     confirmPassword: formData.get('confirmPassword)
        // });

        // // Return validation errors if validation fails
        // if (!validationResult.success) {
        //     return {
        //         success: false,
        //       errors: validationResult.error.issues.map(issue => {
        //     return {
        //         field: issue.path[0],
        //         message: issue.message
        //     }
        // }
        //     };
        // }

        // const registerData = {
        //     password: validationResult.data.password,
        //     patient: {
        //         name: validationResult.data.name,
        //         email: validationResult.data.email,
        //         address: validationResult.data.address
        //     }
        // };

        const validationData = {
            name: formData.get('name'),
            address: formData.get('address'),
            email: formData.get('email'),
            password: formData.get('password'),
            confirmPassword: formData.get('confirmPassword')
        };

        const validatedFields = registerValidationZodSchema.safeParse(validationData);

        if (!validatedFields.success) {
            return {
                success: false,
                errors: validatedFields.error.issues.map(issue => {
                    return {
                        field: issue.path[0],
                        message: issue.message
                    };
                })
            };
        }

        const registerData = {
            password: formData.get('password'),
            patient: {
                name: formData.get('name'),
                email: formData.get('email'),
                address: formData.get('address')
            }
        };

        const newFormData = new FormData();
        newFormData.append('data', JSON.stringify(registerData));

        const res = await fetch('http://localhost:5000/api/v1/user/create-patient', {
            method: 'POST',
            body: newFormData
        }).then(res => res.json());

        console.log(res, 'response from create-patient');

        return res;
    } catch (err) {
        console.log('Error registering patient:', err);
        return { success: false, error: 'Registration failed' };
    }
};
