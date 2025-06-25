import { UpdateValidation } from '@/lib/validation';
import { useAuth } from '@/utils/AuthContext';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from '../ui/form';
import UpdateForm from '../auth/UpdateForm';
import SubmitButton from '../form/SubmitButton';
import { Button } from '../ui/button';
import { UserType } from '@/types/user';
import { updateMe } from '@/utils/auth';

interface props {
    disabled: boolean,
    setDisabled: (disabled: boolean) => void,
    user:UserType
 }

export default function ProfileUpdate({disabled, setDisabled, user}: props) {
    const [isLoading, setIsLoading] = useState(false);

    
    const updateForm = useForm<z.infer<typeof UpdateValidation>>({
        mode: "onChange",
        resolver: zodResolver(UpdateValidation),
        defaultValues: {
          last_name: user.last_name,
          username: user.username,
          first_name: user.first_name,
          email: user.email,
          phone: user.phone,
        },
      })
    

      async function onSignUpSubmit(formData: z.infer<typeof UpdateValidation>){

        setIsLoading(true);
        const res = updateMe({
          last_name: formData.last_name,
          first_name: formData.first_name,
          email: formData.email,
          phone: formData.phone
        })
        setDisabled(true);
    }
  return (
    <div className='bg-white rounded-2xl shadow-2xl border-gray-100 p-5 my-5'>
       <Form {...updateForm} >
            <form onSubmit={updateForm.handleSubmit(onSignUpSubmit)} className="space-y-6 flex-1 max-w-2xl m-auto">   
                <UpdateForm form={updateForm} disabled={disabled} />  
                {
                  disabled?
                  <Button className="bg-gray-600" onClick={() => setDisabled(false)}> Update Profile</Button>
                  :
                  <div className='flex justify-end gap-3 items-center'> 
                        <Button className="bg-gray-600" onClick={() => setDisabled(true)}> Cancel </Button>
                       <SubmitButton text="Update" disabled={isLoading}/>
                  </div>
                 
                }
                
            </form>
        </Form>
    </div>
  )
}
