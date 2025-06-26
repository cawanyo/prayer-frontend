'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';import * as z from 'zod';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { rdvFormSchema } from '@/lib/validation';
import { toast } from 'sonner';
import { Form } from '@/components/ui/form';
import CustomFormField from '@/components/form/CustomFormField';
import { FormFieldType } from '@/constants';
import { addRDV, deleteAvailability, deleteRDV, updateRDV} from '@/utils/rdv';
import { Trash } from 'lucide-react';
import { RDVType } from '@/types/rdv';

type FormData = z.infer<typeof rdvFormSchema>;

interface props {
    update?: boolean,
    rdv?: RDVType,
}

export default function RDVForm({update, rdv}:props) {
    const [disabled, setDisabled] = useState(update);
  const form = useForm<FormData>({
    resolver: zodResolver(rdvFormSchema),
    defaultValues: {
      rdv_availabilities: update? rdv?.rdv_availabilities : [{ date: "", start_time: "", end_time: "" }],
      informations: update? rdv?.informations : ""
    },
  });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "rdv_availabilities",
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FormData) => {
   setLoading(true);
   const add = async () => {
    const {success, data:rdv} = await addRDV({
      rdv_availabilities: data.rdv_availabilities ,
      informations: data.informations? data.informations : ''
  })

     if(success)
       toast.success("RDV successfully submitted");
     setLoading(false);
     form.reset()
   }
   
   const update = async (id: number) => {
    const rdv = await updateRDV({
      rdv_availabilities: data.rdv_availabilities ,
      informations: data.informations? data.informations : ''
    }, id)

     if(rdv)
       toast.success("RDV successfully submitted");
     setDisabled(true)
     setLoading(false);

   }

   if (rdv){
    update(rdv.id)
   }
   else{
    add()
   }
  };


  const onDeleteAvailability = async (index:number) =>
    {
      remove(index);
      const defaultValues = form.formState.defaultValues;
      if(defaultValues?.rdv_availabilities && defaultValues.rdv_availabilities[index]?.id){
        const out = deleteAvailability(defaultValues.rdv_availabilities[index]?.id)
      }
    }

  const onDeleteRdv = async () => {
    if(rdv){
      const out = deleteRDV(rdv?.id)
    }
     
  }

  
  return (

    <div className="max-w-3xl max-h-[600px] overflow-scroll mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <div className='flex justify-between'>
        <h1 className="text-2xl font-semibold mb-6">{update? 'Mettre à jour le Rdv' : 'Créer un RDV'}</h1>
        {rdv &&<Button onClick={() => onDeleteRdv()} className='bg-gray-100'><Trash color='red'/></Button>}
      </div>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <CustomFormField
                control={form.control} 
                type={FormFieldType.TEXT_AREA} 
                name={'informations'}  
                label='Informations'              
                disabled={disabled}
            />
        <p>Vos disponibilités</p>
        {fields.map((field, index) => (
          <div key={field.id} className="border p-4 rounded-lg space-y-2">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Input
                type="date"
                {...form.register(`rdv_availabilities.${index}.date`)}
                placeholder="Date"
                disabled={disabled}
              />
              <Input
                type="time"
                {...form.register(`rdv_availabilities.${index}.start_time`)}
                placeholder="Heure début"
                disabled={disabled}
              />
              <Input
                type="time"
                {...form.register(`rdv_availabilities.${index}.end_time`)}
                placeholder="Heure fin"
                disabled={disabled}
              />
             
            </div>
            {form.formState.errors.rdv_availabilities?.[index] && (
              <p className="text-red-500 text-sm">{form.formState.errors.rdv_availabilities[index]?.date?.message}</p>
            )}
            {
                ((update && 
                !disabled) || !update)
                &&

                  <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => onDeleteAvailability(index)}
                      >
                      Supprimer
                  </Button>
                
            }
            
          </div>
        ))}

         <div>
            {form.formState.errors.rdv_availabilities?.root && (
              <p className="text-red-500 text-sm">{form.formState.errors.rdv_availabilities.root.message}</p>
            )}
         </div>
          
          {
            ((update && 
              !disabled) || !update)
              &&
              <Button type="button" variant="outline" onClick={() => append({ date: "", start_time: "", end_time: "" })}>
                + Ajouter une disponibilité
            </Button>
          }
        <div className="flex flex-col gap-2 justify-end items-center sm:flex-row">
        
        
            {
                update?
                <div>
                    {disabled? 
                      <Button onClick={() => setDisabled(false)}>
                        Update
                    </Button>
                    :
                      <div className=' flex gap-4'>
                        <Button onClick={() => setDisabled(true)} className='bg-gray-500'>
                          Cancel
                        </Button>
                        <Button type="submit"  className=' bg-cyan-800'>
                          Submit the change
                        </Button>
                      </div>
                  }
                 </div> 
                
                :
                <Button type="submit" disabled={loading}>
                    {loading ? "Création..." : "Créer le RDV"}
                </Button>
            }
        </div>
      </form>
      </Form>
    </div>
  );
}
