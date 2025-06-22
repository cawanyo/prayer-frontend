import React from 'react'
import CustomFormField from '../form/CustomFormField'
import { FormFieldType, SubjectType } from '@/constants'
import { SelectItem } from '../ui/select'
import Image from 'next/image'
import { UseFormReturn } from 'react-hook-form';

// Define your form type
type FormValues = {
  subject: string;
  name?: string;
  email?: string;
  phone?: string;
  subjectType?: string;
};

interface props {
  form: UseFormReturn<FormValues>,
}
const PrayerFormContent = ({form, }: {form: UseFormReturn<FormValues>,
                                            
                                            }) => {
  return (
    <div className='md:w-2xl'>
        <CustomFormField 
          type={FormFieldType.INPUT}
          control={form.control}
          name="name"
          label="Votre nom"
          placeholder="John Doe"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
          

        />

        <CustomFormField 
          type={FormFieldType.INPUT}
          control={form.control}
          name="email"
          label="Email"
          placeholder="johndoe@gmail.com"
          iconSrc="/assets/icons/email.svg"
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
            type={FormFieldType.SELECT}
            control={form.control}
            name="subjectType"
            label="Type de sujet"
            placeholder="Selectionner le type de sujet"
            

        >
            {
                SubjectType.map((type) => (
                    <SelectItem key={type.name} value={type.name}>
                        <div className="flex cursor-pointer items-center gap-2 my-1">
                            <div className="w-[32px] h-[32px] rounded-full overflow-hidden">
                              <Image
                                  src={type.image}
                                  width={32}
                                  height={32}
                                  
                                  alt={type.name}
                                
                              />
                            </div>
                            
                            <p>
                                {type.name} 
                            </p>
                        </div>
                    </SelectItem>
                ))
            }
        </CustomFormField>

        <CustomFormField
          type={FormFieldType.TEXT_AREA}
          control={form.control}
          name="subject"
          label="Sujet de Prière (*)"
          
        />
    </div>
  )
}

export default PrayerFormContent
