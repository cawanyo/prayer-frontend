import CustomFormField from '@/components/form/CustomFormField'
import { Form } from '@/components/ui/form'
import { FormFieldType } from '@/constants'
import { ProgramValidation } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {SelectItem} from "@/components/ui/select"
import { z } from 'zod'
import { UserType } from '@/types/user'
import { format } from 'date-fns'
import { getAvailableUsers } from '@/utils/availability_request'
import { addProgramm } from '@/utils/planing'
import { ProgramType } from '@/types/planing'



interface props {
    day:Date, 
    setOpen: (open:boolean) => void,
    program?: ProgramType | null ,
    setProgram: (program: ProgramType) => void
}

export default function PlaningForm({day, setOpen, program, setProgram}: props) {
    const [isLoading, setIsLoading] = useState(false);
    const [availableUser, setAvailableUser] = useState<UserType[]>([])
    const fullDateKey = format(day, "yyyy-MM-dd");

    useEffect(()=>{
        const getUsers = async () => {
            const {success, data:users} = await getAvailableUsers({date:fullDateKey})
            if (success)
                setAvailableUser(users)
        }
        getUsers()
    })
    const form = useForm<z.infer<typeof ProgramValidation>>({
        resolver: zodResolver(ProgramValidation),
        defaultValues: {
          name: program? program.name : "",
          start_time: program? program.start_time : "",
          end_time: program? program.end_time : "",
        },
      })

    const onSubmit = async (formData: z.infer<typeof ProgramValidation>) => {
        try {
            
            const {success, data:program }= await addProgramm({
                person: formData.person? JSON.parse(formData.person as string) : null,
                name: formData.name,
                date: fullDateKey,
                start_time: formData.start_time,
                end_time: formData.end_time
            });
            if (success)
                setProgram(program)
            setOpen(false)
            
        } catch (error) {
            
        }
    }
  return (
    <Form {...form} >
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <div>
            <CustomFormField 
            type={FormFieldType.INPUT}
            control={form.control}
            name="name"
            label="Nom du Programme"
            placeholder="Prière"

            />
            <div className='grid grid-cols-2 items-center'>
                <CustomFormField 
                type={FormFieldType.TIME}
                control={form.control}
                name="start_time"
                label="Début"
                placeholder=""

                />
                <CustomFormField 
                    type={FormFieldType.TIME}
                    control={form.control}
                    name="end_time"
                    label="FIN"
                    placeholder=""

                    />
            </div>

            <CustomFormField
            type={FormFieldType.SELECT}
            control={form.control}
            name="person"
            label="Personne de service"
            placeholder="Selectionner "

        >
            {
                availableUser.map((user) => (
                    <SelectItem key={user.username} value={JSON.stringify(user)}>
                        <div className="flex cursor-pointer items-center gap-2 my-1">
                            
                            <p>
                                {`${user.first_name} ${user.last_name}`} 
                            </p>
                        </div>
                    </SelectItem>
                ))
            }
        </CustomFormField>
            

        </div>
        <div className="text-right">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 text-white px-6 py-2 rounded-md shadow hover:bg-blue-700"
            >
              Add Program
            </button>
          </div>
      </form>
    </Form>
  )
}
