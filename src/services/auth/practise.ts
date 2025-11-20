'user server'

import z, { success } from 'zod'

const registerValidationZodSchema = z.object({
    name: z.string().min(1, { message: 'Name is required' }).min(2, { message: 'Name must be at least 2 characters' }).max(100, { message: 'Name must not exceed 100 characters' }).trim(),
    address: z.string().min(1, { message: 'address is required' }).min(5, { message: 'address must be al least 5 characters' }), email: z.string().min(1, { message: 'Email is required' }).email({ message: "Please enter a valid emaik address" }).max(255, { message: 'Email must not exceed 255 characters' }).toLowerCase().trim(), password: z.string().min(1, { message: "Password is required" }).min(8, { message: "Password must be at least 8 characters" }).max(100, { message: 'Password must not exceed 100 characters' }).regex(), confirmPassword: z.string().min(1, { message: 'Confirm Password is required' }).refime(val => val.length > 0, {message: 'Confirm Password is required'})
})


const validationResult = registerValidationZodSchema.safeParse({
    name: formData.get('name'),
    address: formData.get('address'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword')
})

if (!validationResult.success) {
    return {
        success: false,
        errors: validationResult.error.issues.map(issue => {
            return {
                field: issue.path[0],
                message: issue.message
            }
        })
    }
}