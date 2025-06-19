import React from 'react'
import CustomFormField from '../form/CustomFormField'
import { FormFieldType } from '@/constants'
import { UseFormReturn } from 'react-hook-form';


type FormValues = {
    username: string;
    password: string;
  };


export default function SignInForm({form}: {form: UseFormReturn<FormValues>}) {
  return (
    <div className=" ">

        <CustomFormField 
            type={FormFieldType.INPUT}
            control={form.control}
            name="username"
            label="Username"
            placeholder="John_Doe"
            iconSrc="/assets/icons/user.svg"
            iconAlt="user"
            disabled

        />

        <CustomFormField 
                type={FormFieldType.PASSWORD}
                control={form.control}
                name="password"
                label="Password"
                placeholder="********"
                iconSrc="/assets/icons/user.svg"
                iconAlt="user"
                disabled

                />
    </div>


  )
}
