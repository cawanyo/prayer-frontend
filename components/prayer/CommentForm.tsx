import { CommentValidation } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form } from '../ui/form'
import CustomFormField from '../form/CustomFormField'
import { FormFieldType } from '@/constants'
import { submitComment } from '@/utils/prayer_requests'
import SubmitButton from '../form/SubmitButton'
import { AuthContext } from '@/utils/AuthContext'

export default function CommentForm({prayer_id, setCommentId}: {prayer_id: number, setCommentId:(i:number)=>void}) {
    const auth = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const form = useForm<z.infer<typeof CommentValidation>>({
        resolver: zodResolver(CommentValidation),
        defaultValues: {
          content: ""
        },
      })

      async function onSubmit(formData: z.infer<typeof CommentValidation>){

        setIsLoading(true);
        setError("");
        if(auth?.user?.username){
            const res = await submitComment({prayer_id: prayer_id, content:formData.content, submiter_name:auth.user.username});
            setCommentId(res.id)
            form.reset();
        }
      }
  return (
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2 mb-3">
        <CustomFormField
          type={FormFieldType.INPUT}
          control={form.control}
          name="content"
          disabled
        />
        <SubmitButton text='add' />
      </form>
    </Form>
  )
}
