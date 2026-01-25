/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { serverFetch } from '@/lib/server-fetch';
import { zodValidator } from '@/lib/zodValidator';
import { createDoctorZodSchema, updateDoctorZodSchema } from '@/zod/doctors.validation';
import { IDoctor } from '../types/doctor.interface';

export async function createDoctor(_prevState: any, formData: FormData) {
    try {
        const validationPayload: IDoctor = {
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            contactNumber: formData.get('contactNumber') as string,
            address: formData.get('address') as string,
            registrationNumber: formData.get('registrationNumber') as string,
            experience: Number(formData.get('experience') as string),
            gender: formData.get('gender') as 'MALE' | 'FEMALE',
            appointmentFee: Number(formData.get('appointmentFee') as string),
            qualification: formData.get('qualification') as string,
            currentWorkingPlace: formData.get('currentWorkingPlace') as string,
            designation: formData.get('designation') as string,
            password: formData.get('password') as string
        };

        const validatedPayload = zodValidator(validationPayload, createDoctorZodSchema);

     if (!validatedPayload.success && validatedPayload.errors) {
         return {
             success: validatedPayload.success,
             message: 'Validation failed',
             formData: validationPayload,
             errors: validatedPayload.errors
         };
     }

     if (!validatedPayload.data) {
         return {
             success: false,
             message: 'Validation failed',
             formData: validationPayload
         };
     }
     const backendPayload = {
         password: validatedPayload.data.password,
         doctor: {
             name: validatedPayload.data.name,
             email: validatedPayload.data.email,
             contactNumber: validatedPayload.data.contactNumber,
             address: validatedPayload.data.address,
             registrationNumber: validatedPayload.data.registrationNumber,
             experience: validatedPayload.data.experience,
             gender: validatedPayload.data.gender,
             appointmentFee: validatedPayload.data.appointmentFee,
             qualification: validatedPayload.data.qualification,
             currentWorkingPlace: validatedPayload.data.currentWorkingPlace,
             designation: validatedPayload.data.designation,
             specialties: validatedPayload.data.specialties
         }
     };

        const newFormData = new FormData();
        newFormData.append('data', JSON.stringify(backendPayload));

        if (formData.get('file')) {
            newFormData.append('file', formData.get('file') as Blob);
        }

        const response = await serverFetch.post('/user/create-doctor', {
            body: newFormData
        });

        const result = await response.json();

        return result;
    } catch (error: any) {
        console.log(error);
        return { success: false, message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}` };
    }
}

export async function getDoctors(queryString?: string) {
    try {
        const response = await serverFetch.get(`/doctor${queryString ? `?${queryString}` : ''}`);
        const result = await response.json();
        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}

export async function getDoctorById(id: string) {
    try {
        const response = await serverFetch.get(`/doctor/${id}`);
        const result = await response.json();
        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}

export async function updateDoctor(id: string, _prevState: any, formData: FormData) {
    try {
        const payload: Partial<IDoctor> = {
            name: formData.get('name') as string,
            contactNumber: formData.get('contactNumber') as string,
            address: formData.get('address') as string,
            registrationNumber: formData.get('registrationNumber') as string,
            experience: Number(formData.get('experience') as string),
            gender: formData.get('gender') as 'MALE' | 'FEMALE',
            appointmentFee: Number(formData.get('appointmentFee') as string),
            qualification: formData.get('qualification') as string,
            currentWorkingPlace: formData.get('currentWorkingPlace') as string,
            designation: formData.get('designation') as string
        };
        const validatedPayload = zodValidator(payload, updateDoctorZodSchema).data;

        const response = await serverFetch.patch(`/doctor/${id}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(validatedPayload)
        });
        const result = await response.json();
        return result;
    } catch (error: any) {
        console.log(error);
        return { success: false, message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}` };
    }
}

export async function softDeleteDoctor(id: string) {
    try {
        const response = await serverFetch.delete(`/doctor/soft/${id}`);
        const result = await response.json();

        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}

export async function deleteDoctor(id: string) {
    try {
        const response = await serverFetch.delete(`/doctor/${id}`);
        const result = await response.json();

        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}
