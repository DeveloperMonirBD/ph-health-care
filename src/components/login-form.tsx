'use client';

import { useActionState, useEffect } from 'react';
import { Button } from './ui/button';
import { Field, FieldDescription, FieldGroup, FieldLabel } from './ui/field';
import { Input } from './ui/input';
import { loginUser } from '@/services/auth/loginUser';
import { toast } from 'sonner';
import InputFieldError from './modules/Shared/InputFieldError';


const LoginForm = ({ redirect } : {redirect?: string}) => {
    const [state, formAction, isPending] = useActionState(loginUser, null);

    // const getFieldError = (fieldName: string) => {
    //     if (state && state.errors) {
    //         const error = state.errors.find((err: any) => err.field === fieldName);
    //         return error.message;
    //     } else {
    //         return null;
    //     }
    // };

    useEffect(() => {
        if (state && !state.success && state.message) {
            toast.error(state.message);
        }
    }, [state])

    return (
        <form action={formAction}>
            {redirect && <input type="hidden" name="redirect" value={redirect} />}
            <FieldGroup>
                <div className="grid grid-cols-1 gap-4">
                    {/* Email */}
                    <Field>
                        <FieldLabel htmlFor="email">Email</FieldLabel>
                        <Input id="email" name="email" type="email" placeholder="m@example.com" />

                        {/* {getInputFieldError('email', state) && <FieldDescription className="text-red-600">{getInputFieldError('email', state)}</FieldDescription>} */}

                        <InputFieldError field="email" state={state} />
                    </Field>

                    {/* Password */}
                    <Field>
                        <FieldLabel htmlFor="password">Password</FieldLabel>
                        <Input id="password" name="password" type="password" placeholder="Enter your password" />

                        {/* {getInputFieldError('password', state) && <FieldDescription className="text-red-600">{getInputFieldError('password', state)}</FieldDescription>} */}

                        <InputFieldError field="password" state={state} />
                    </Field>
                </div>
                <FieldGroup className="mt-4">
                    <Field>
                        <Button type="submit" disabled={isPending} className="w-full">
                            {isPending ? 'Logging in...' : 'Login'}
                        </Button>

                        <FieldDescription className="px-6 text-center">
                            Don&apos;t have an account?{' '}
                            <a href="/register" className="text-blue-600 hover:underline">
                                Sign up
                            </a>
                        </FieldDescription>
                        <FieldDescription className="px-6 text-center">
                            <a href="/forget-password" className="text-blue-600 hover:underline">
                                Forgot password?
                            </a>
                        </FieldDescription>
                    </Field>
                </FieldGroup>
            </FieldGroup>
        </form>
    );
};

export default LoginForm;
