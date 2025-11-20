/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';
import z from 'zod';
import { parse } from "cookie";
import { cookies } from 'next/headers';

const loginValidationZodSchema = z
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

export const loginUser = async (_currentState: any, formData: any): Promise<any> => {
    try {
        let accessTokenObject: null | any = null;
        let refreshTokenObject: null | any = null;

        const loginData = {
            email: formData.get('email'),
            password: formData.get('password')
        };

        const validatedFields = loginValidationZodSchema.safeParse(loginData);

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

        const res = await fetch('http://localhost:5000/api/v1/auth/login', {
            method: 'POST',
            body: JSON.stringify(loginData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        // .then(res => res.json());

        const result = await res.json();

        const setCookieHeaders = res.headers.getSetCookie();

        if (setCookieHeaders && setCookieHeaders.length > 0) {
            setCookieHeaders.forEach((cookie : string) => {
                const parsedCookie = parse(cookie)

                if (parsedCookie['accessToken']) {
                    accessTokenObject = parsedCookie;
                }
                if (parsedCookie['refreshToken']) {
                    refreshTokenObject = parsedCookie;
                }
            })
        } else {
            throw new Error("No Set-Cookie header found")
        }

        if (!accessTokenObject) {
            throw new Error('Tokens not found in cookies');
        }
        if (!refreshTokenObject) {
            throw new Error('Tokens not found in cookies');
        }

        const cookieStore = await cookies();

        cookieStore.set("accessToken", accessTokenObject.accessToken, {
            secure: true,
            httpOnly: true,
            maxAge: parseInt(accessTokenObject.MaxAge),
            path: accessTokenObject.Path || "/",
        })

        cookieStore.set("refreshToken", refreshTokenObject.refreshToken, {
            secure: true,
            httpOnly: true,
            maxAge: parseInt(refreshTokenObject.MaxAge),
            path: refreshTokenObject.Path || "/"
        });

        return result;

    } catch (err) {
        console.log('Error logging in user:', err);
        return { err: 'Login failed' };
    }
};
