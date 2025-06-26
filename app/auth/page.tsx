'use client'
import SignInForm from "@/components/auth/SignInForm";
import SignUpForm from "@/components/auth/SignUpForm";
import SubmitButton from "@/components/form/SubmitButton";
import { Form } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { SignInFormValidation, SignUpFormValidation } from "@/lib/validation";
import { askMember, createUser, getMe, loginUser } from "@/utils/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {  useAuth } from "@/utils/AuthContext";
import LoadingOverlay from "@/components/base/LoadingOverlay";

const AuthPage = () => {

  const auth = useAuth()

  const [isLogin, setIsLogin] = useState(true);

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError("")
  }

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>('');
  const  router = useRouter();

  useEffect( () => {
    if(!auth?.loading && auth?.isAuthenticated){
      redirect('/dashboard')
    }
  }, [auth?.isAuthenticated])

  // 1. Define your form. 
  const signInForm = useForm<z.infer<typeof SignInFormValidation>>({
    mode: "onBlur",
    resolver: zodResolver(SignInFormValidation),
    defaultValues: {
      username: "" ,
      password: "",
    },
  })

  const signUpForm = useForm<z.infer<typeof SignUpFormValidation>>({
    mode: "onBlur",
    resolver: zodResolver(SignUpFormValidation),
    defaultValues: {
      last_name: "",
      username: "",
      first_name: "",
      email: "",
      phone: "",
      passwordConfirm:"",
      password: "",
      member: false
    },
  })

  async function onSignInSubmit(formData: z.infer<typeof SignInFormValidation>){
    setIsLoading(true);
    setError("");
    const res = await loginUser({ username: formData.username, password: formData.password });
    if (res.success) {
      auth?.login(res.data.access, res.data.refresh);
      router.push('/dashboard')
    } else {
        setError(res.error);

    } 
    setIsLoading(false);
  }

  async function onSignUpSubmit(formData: z.infer<typeof SignUpFormValidation>){

    setIsLoading(true);
    setError("");
    const res = await createUser({
      username: formData.username,
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
      password: formData.password,
      phone: formData.phone
    })

    if (res.success) {
      const login = await loginUser({ username: formData.username, password: formData.password });
      if (login.success){
        await auth?.login(login.data.access, login.data.refresh);
        
        if (formData.member)
          await askMember()
        router.push('/dashboard');
      }
      
    } else {
     
    }
    setIsLoading(false);
  }

  return (
    <div className="flex items-center justify-center px-4">
      {
        isLoading
        &&
        <LoadingOverlay />
      }
      <div className={cn("bg-white rounded-xl mt-5 shadow-2xl w-full  p-6 space-y-4", isLogin? "max-w-md" : "md:w-2xl")}>
        <h1 className="text-xl font-bold text-center text-gray-800">
          {isLogin ? "Sign In" : "Create Account"}
        </h1>

        {isLogin ?
        (
            <Form {...signInForm} >
                <form onSubmit={signInForm.handleSubmit(onSignInSubmit)} className="space-y-6 flex-1">   
                   
                    <SignInForm form={signInForm} />
                    <p className="text-xs text-red-600 italic">{error}</p>
                    <SubmitButton text="Sign In" disabled={isLoading}/>
                </form>
            </Form>   
        )


        :
        <Form {...signUpForm} >
            <form onSubmit={signUpForm.handleSubmit(onSignUpSubmit)} className="space-y-6 flex-1">   
                <SignUpForm form={signUpForm} />   
                <p className="text-xs text-red-600 italic">{error}</p>
                <SubmitButton text="Sign Up" disabled={isLoading}/>
            </form>
        </Form>

        
        
        }
            
        
        <p className="text-center text-sm text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={toggleMode}
            className="text-blue-600 ml-1 hover:underline"
          >
            {isLogin ? "Sign Up" : "Sign In"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
