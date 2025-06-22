import { FormFieldType } from '@/constants'
import React from 'react'
import CustomFormField from '../form/CustomFormField'
import { UseFormReturn } from 'react-hook-form';

type FormValues = {
    username: string;
    password: string;
    passwordConfirm: string,
    first_name: string,
    last_name: string,
    email: string,
    phone?: string,
    member: boolean
  };

export default function SignUpForm({form}: {form: UseFormReturn<FormValues>}) {
  return (
    <div className="md:w-lg">
        <CustomFormField 
            type={FormFieldType.INPUT}
            control={form.control}
            name="username"
            label="Username"
            placeholder="John Doe"
            iconSrc="/assets/icons/user.svg"
            iconAlt="user"


            />
        
        <CustomFormField 
                type={FormFieldType.INPUT}
                control={form.control}
                name="first_name"
                label="First Name"
                placeholder="John Doe"
                iconSrc="/assets/icons/user.svg"
                iconAlt="user"
                

                />
            
            <CustomFormField 
                type={FormFieldType.INPUT}
                control={form.control}
                name="last_name"
                label="Last Name"
                placeholder="John Doe"
                iconSrc="/assets/icons/user.svg"
                iconAlt="user"
                

                />

        <CustomFormField 
            type={FormFieldType.INPUT}
            control={form.control}
            name="email"
            label="Email"
            placeholder="john.doe@gmail.com"
            iconSrc="/assets/icons/user.svg"
            iconAlt="email"
            

            />
        
        <CustomFormField 
            type={FormFieldType.PHONE_INPUT}
            control={form.control}
            name="phone"
            label="Numero"
            placeholder="(+33) 8888888888"
            
            />

        <CustomFormField 
                type={FormFieldType.PASSWORD}
                control={form.control}
                name="password"
                label="Password"
                placeholder="********"
                iconSrc="/assets/icons/user.svg"
                iconAlt="user"
                

                />
        <CustomFormField 
                type={FormFieldType.PASSWORD}
                control={form.control}
                name="passwordConfirm"
                label="Confirm Password"
                placeholder="********"
                iconSrc="/assets/icons/user.svg"
                iconAlt="user"
                

                />
        
        <CustomFormField 
                type={FormFieldType.CHECKBOX}
                control={form.control}
                name="member"
                label="Demande de membre"
                placeholder="********"

                />
        
    </div>
  )
}
