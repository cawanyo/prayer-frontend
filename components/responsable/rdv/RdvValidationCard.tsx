import CustomFormField from '@/components/form/CustomFormField';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { FormFieldType, SubjectType } from '@/constants';
import { confirmRdvFormSchema } from '@/lib/validation';
import { RDVType } from '@/types/rdv';
import { zodResolver } from '@hookform/resolvers/zod';
import { SelectItem } from '@radix-ui/react-select';
import Image from 'next/image';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface props {
    rdv: RDVType
}

export default function RdvValidationCard({rdv}: props) {
    const form = useForm<z.infer<typeof confirmRdvFormSchema>>({
        resolver: zodResolver(confirmRdvFormSchema),
        defaultValues: {
            informations: rdv.informations,
        },
      });
      const [loading, setLoading] = useState(false);

      const onSubmit = async (data: z.infer<typeof confirmRdvFormSchema>) => {

        
        }

        
  return (
    <div className="max-w-3xl max-h-[600px] overflow-scroll mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <div className='flex justify-between'>
        <h1 className="text-2xl font-semibold mb-6">Valider le rendez-vous</h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className='md:w-2xl'>
            <p>
                Soumis par: {rdv.created_by.username}
            </p>
            <CustomFormField
                control={form.control} 
                type={FormFieldType.TEXT_AREA} 
                name={'informations'}  
                label='Informations'              
            />
        
        <Button type='submit'>
                validate
        </Button>
        </div>
        </form>
      </Form>
      
    </div>
  )
}
