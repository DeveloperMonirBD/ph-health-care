/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';
import z from 'zod';
import { parse } from "cookie";
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { getDefaultDashboardRoute, isValidRedirectForRole, UserRole } from '@/lib/auth-utils';

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
        const redirectTo = formData.get('redirect') || null;

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
            maxAge: parseInt(accessTokenObject['Max-Age']) || 1000 * 60 * 60,
            path: accessTokenObject.Path || "/",
            sameSite: accessTokenObject['SameSite'] || "none"
        })

        cookieStore.set('refreshToken', refreshTokenObject.refreshToken, {
            secure: true,
            httpOnly: true,
            maxAge: parseInt(refreshTokenObject['Max-Age']) || 1000 * 60 * 60 * 24 * 90,
            path: refreshTokenObject.Path || '/',
            sameSite: refreshTokenObject['SameSite'] || 'none'
        });

        const verifiedToken: string | JwtPayload = jwt.verify(accessTokenObject.accessToken, process.env.JWT_SECRET as string);

        if (typeof verifiedToken === 'string') {
            throw new Error("Invalid token");
        }

        const userRole: UserRole = verifiedToken.role;

        if (redirectTo) {
            const requestedPath = redirectTo.toString();
            if (isValidRedirectForRole(requestedPath, userRole)) {
                redirect(requestedPath);
            } else {
                redirect(getDefaultDashboardRoute(userRole));
            }
        }

    } catch (error: any) {
        // Re-throw NEXT_REDIRECT errors so Next.js can handle them
        if (error?.digest?.startsWith('NEXT_REDIRECT')) {
            throw error;
        }
            
        console.log('Error logging in user:', error);
        return { error: 'Login failed' };
    }
};
