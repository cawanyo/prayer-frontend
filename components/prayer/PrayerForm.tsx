"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  Form,
} from "@/components/ui/form"
import {useContext, useState } from "react"
import { PrayerFormValidation } from "@/lib/validation"
import PrayerFormContent from "./PrayerFormContent"
import { useRouter } from "next/navigation"
import { AuthContext } from "@/utils/AuthContext"







export default function Priere() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const  router = useRouter();
  const auth = useContext(AuthContext);

  // 1. Define your form. 
  const form = useForm<z.infer<typeof PrayerFormValidation>>({
    resolver: zodResolver(PrayerFormValidation),
    defaultValues: {
      name: auth?.user? auth.user?.first_name : "" ,
      email: auth?.user? auth.user?.email :"",
      phone: auth?.user? auth.user?.phone :"",
      subject: "",
      subjectType: ""
    },
  })

  async function onSubmit(formData: z.infer<typeof PrayerFormValidation>){


    setIsLoading(true);
    setError("");
    try {
      const res = await fetch("http://127.0.0.1:8000/api/prayers/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: formData.subject,
          submiter_name: formData.name,
          submiter_email: formData.email,
          submiter_phone: formData.phone,
          user: auth?.user? auth.user.id : null,
          category: null, // Adjust to match actual category ID,
          state: 'pending'
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to submit prayer");
      }
      router.push("/prayer/success");

    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }

    router.push(('prayer/success'))
  }


  return (
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <PrayerFormContent form={form}  />
        
        <div className="text-right">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 text-white px-6 py-2 rounded-md shadow hover:bg-blue-700"
            >
              Submit Request
            </button>
          </div>
      </form>
    </Form>
  )
}
