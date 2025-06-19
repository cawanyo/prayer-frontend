import { z } from "zod";

const usernameAvailable = async (username: string) => {
  const res = await fetch(`http://127.0.0.1:8000/api/accounts/check-username/?username=${username}`);
  if (!res.ok) return false;

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
  content: z.string().min(10, 'Too short')
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
  firstName: z.string().min(2, "Name Too Short"),
  username: z.string()
            .min(2, "Name Too Short")
            .refine(async (value) => await usernameAvailable(value), {
              message: "Username is already taken",
            }),
  lastName: z.string(),
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

export const PrayerFormValidation= z.object({
  name: z
    .string()
    .max(50, "Name must be at most 50 characters")
    .optional(),
  email: z.optional(
    z.string()
    //.email("Invalid email address")
    ),
  phone: z
    .optional(
    z.string()
    //.refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number")
    )
    ,
  subject: z
    .string()
    .min(5),
  subjectType: z
      .string()
      .optional()
});
