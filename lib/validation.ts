import { string, z } from "zod";

const usernameAvailable = async (username: string) => {
  const res = await fetch(`http://127.0.0.1:8000/api/accounts/check-username/?username=${username}`);
  if (!res.ok) return false;
  console.log(res)
  const data = await res.json();
  return data.available;
};

const emailAvailable = async (email: string): Promise<boolean> => {
  const res = await fetch(`http://127.0.0.1:8000/api/accounts/check-email/?email=${encodeURIComponent(email)}`);
  if (!res.ok) return false;
  const data = await res.json();
  return data.available;
};



export const CommentValidation = z.object({
  content: z.string().min(2, 'Too short')
})


export const ProgramValidation = z.object({
  name: z.string().min(3, 'Too short'),
  start_time: z.string().min(1, "Start time is required"),
  end_time: z.string().min(1, "End time is required"),
  person: z.string().optional(),

})

export const SignInFormValidation = z.object({
  username: z
    .string()
    .refine(async (value) => await usernameAvailable(value)==false, {
      message: "Username does not exist",
    })
    ,
  password: z.
    string()
    .min(6, 'Too short')
    .max(15, 'Too long')
})

export const SignUpFormValidation = z.object({
  first_name: z.string().min(2, "Name Too Short"),
  username: z.string()
            .min(2, "Name Too Short")
            .refine(async (value) => await usernameAvailable(value), {
              message: "Username is already taken",
            }),
  last_name: z.string(),
  email: z
    .string()
    .email('This email is invalid')
    .refine(async (value) => await emailAvailable(value), {
      message: "Email is already registered",
    })
    ,
  
  password: z.
    string()
    .min(6, 'Too short')
    .max(15, 'Too long')
  ,
  passwordConfirm: z.
    string()
    .min(6, 'Too short')
    .max(15, 'Too long')
  ,

  member: z.boolean(),
  phone: z
    .optional(
    z.string()),
}).refine((data) => data.password === data.passwordConfirm, {
  message: "Password don't match",
  path: ["passwordConfirm"]
})

export const UpdateValidation = z.object({
  first_name: z.string().min(2, "Name Too Short"),
  username: z.string()
            .min(2, "Name Too Short")
           ,
  last_name: z.string(),
  email: z
    .string()
    .email('This email is invalid')
    ,
    phone: z
    .optional(
    z.string()),

})


export const PrayerFormValidation= z.object({
  name: z
    .string()
    .max(50, "Name must be at most 50 characters")
    .optional(),
  email: z.optional(
    z.string()
    .email("Invalid email address")
    ),
  phone: z
    .optional(
    z.string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number")
    )
    ,
  subject: z
    .string()
    .min(5),
  subjectType: z
      .string()
      .optional()
});


export const rdvAvailabilitySchema = z.object({
  id : z.number().optional(),
  date: z.string().nonempty("Date is required"),
  start_time: z.string().nonempty("Start time is required"),
  end_time: z.string().nonempty("End time is required"),
});

export const rdvFormSchema = z.object({
  rdv_availabilities: z.array(rdvAvailabilitySchema).min(1, "At least one availability is required"),
  informations: z.string()
});

export const confirmRdvFormSchema = z.object({
  date: z.string(),
  time: z.string(),
  informations: z.string()
});