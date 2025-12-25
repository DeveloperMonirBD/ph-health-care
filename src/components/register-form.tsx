'use client';

import { registerPatient } from '@/services/auth/registerPatient';
import { useActionState, useEffect } from 'react';
import { Button } from './ui/button';
import { Field, FieldDescription, FieldGroup, FieldLabel } from './ui/field';
import { Input } from './ui/input';
import { toast } from 'sonner';
import InputFieldError from './modules/Shared/InputFieldError';


const RegisterForm = () => {
    const [state, formAction, isPending] = useActionState(registerPatient, null);

    // const getFieldError = (fieldName: string) => {
    //     if (state && state.errors) {
    //         const error = state.errors.find((err: any) => err.field === fieldName);
    //         if (error) {
    //             return error.message;
    //         } else {
    //             return null;
    //         }
    //     } else {
    //         return null;
    //     }
    // };

    useEffect(() => {
        if (state && !state.success && state.message) {
            toast.error(state.message);
        }
    }, [state]);

    return (
        <form action={formAction}>
            <FieldGroup>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Name */}
                    <Field>
                        <FieldLabel htmlFor="name">Full Name</FieldLabel>
                        <Input id="name" name="name" type="text" placeholder="John Doe" />
                        {/* {getInputFieldError('name', state) && <FieldDescription className="text-red-600">{getInputFieldError('name', state)}</FieldDescription>} */}

                        <InputFieldError field="name" state={state} />
                    </Field>

                    {/* Address */}
                    <Field>
                        <FieldLabel htmlFor="address">Address</FieldLabel>
                        <Input id="address" name="address" type="text" placeholder="123 Main St" />

                        {/* {getInputFieldError('address', state) && <FieldDescription className="text-red-600">{getInputFieldError('address', state)}</FieldDescription>} */}
                        <InputFieldError field="address" state={state} />
                    </Field>

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
                        <Input id="password" name="password" type="password" />

                        {/* {getInputFieldError('password', state) && <FieldDescription className="text-red-600">{getInputFieldError('password', state)}</FieldDescription>} */}

                        <InputFieldError field="password" state={state} />
                    </Field>

                    {/* Confirm Password */}
                    <Field className="md:col-span-2">
                        <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
                        <Input id="confirmPassword" name="confirmPassword" type="password" />

                        {/* {getInputFieldError('confirmPassword', state) && <FieldDescription className="text-red-600">{getInputFieldError('confirmPassword', state)}</FieldDescription>} */}

                        <InputFieldError field="confirmPassword" state={state} />
                    </Field>
                </div>
                <FieldGroup className="mt-4">
                    <Field>
                        <Button type="submit" disabled={isPending}>
                            {isPending ? 'Creating Account...' : 'Create Account'}
                        </Button>

                        <FieldDescription className="px-6 text-center">
                            Already have an account?{' '}
                            <a href="/login" className="text-blue-600 hover:underline">
                                Sign in
                            </a>
                        </FieldDescription>
                    </Field>
                </FieldGroup>
            </FieldGroup>
        </form>
    );
};

export default RegisterForm;
