import { FormFieldType } from '@/constants'
import React from 'react'
import CustomFormField from '../form/CustomFormField'
import { UseFormReturn } from 'react-hook-form';

type FormValues = {
    username: string;
    first_name: string,
    last_name: string,
    email: string,
    phone?: string,
  };

export default function UpdateForm({form, disabled}: {form: UseFormReturn<FormValues>, disabled:boolean}) {
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
            disabled={true}

            />
        
        <CustomFormField 
                type={FormFieldType.INPUT}
                control={form.control}
                name="first_name"
                label="First Name"
                placeholder="John Doe"
                iconSrc="/assets/icons/user.svg"
                iconAlt="user"
                disabled={disabled}

                />
            
            <CustomFormField 
                type={FormFieldType.INPUT}
                control={form.control}
                name="last_name"
                label="Last Name"
                placeholder="John Doe"
                iconSrc="/assets/icons/user.svg"
                iconAlt="user"
                disabled={disabled}

                />

        <CustomFormField 
            type={FormFieldType.INPUT}
            control={form.control}
            name="email"
            label="Email"
            placeholder="john.doe@gmail.com"
            iconSrc="/assets/icons/user.svg"
            iconAlt="email"
            disabled={true}

            />
        
        <CustomFormField 
            type={FormFieldType.PHONE_INPUT}
            control={form.control}
            name="phone"
            label="Numero"
            placeholder="(+33) 8888888888"
            disabled={disabled}
            />

        
    </div>
  )
}
