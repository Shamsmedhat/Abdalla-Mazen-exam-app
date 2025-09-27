// "use client";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { SubmitHandler, useForm } from "react-hook-form";
// import { registerSchema, RegisterValues } from "@/lib/schemas/auth.schemas";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import { Check, CircleX, LoaderCircle } from "lucide-react";
// import EmailInput from "@/app/(auth)/_components/email-input";
// import { PhoneInput } from "@/app/(auth)/_components/phone-input";
// import { useEffect } from "react";
// import { getSession } from "next-auth/react";
// import { Button } from "@/components/ui/button";
// import useDelete from "../_hooks/use-delete";
// import { DialogDemo } from "./modal";
// import useEdit from "../_hooks/use-edit";
// import { Toaster, toast } from "sonner";
// export default function AccountForm() {
//   // Hook
//   const { deleteUser } = useDelete();
//   const { edit, isPending } = useEdit();

//   // Form
//   const form = useForm<Omit<RegisterValues, "password" | "rePassword">>({
//     defaultValues: {
//       firstName: "",
//       lastName: "",
//       username: "",
//       email: "",
//       phone: "",
//     },
//     resolver: zodResolver(
//       registerSchema.omit({ password: true, rePassword: true })
//     ),
//   });

//   // Functions
//   function formatPhone(phone: string) {
//     if (phone.startsWith("0")) {
//       return "+20" + phone.slice(1);
//     }
//     return phone;
//   }
//   async function handleCheck() {
//     const session = await getSession();
//     console.log("Session:", session);
//   }
//   const onSubmit: SubmitHandler<
//     Omit<RegisterValues, "password" | "rePassword">
//   > = async (values) => {
//     const payload = {
//       ...values,
//       phone: values.phone.startsWith("+20")
//         ? values.phone.replace("+20", "0")
//         : values.phone,
//     };
//     edit(payload);
//     toast(
//       <div className=" flex items-center text-white ">
//         <Check className="text-emerald-500" /> Event has been created
//       </div>,
//       {
//         style: {
//           background: "#1F2937",
//         },
//       }
//     );
//   };

//   // Effects
//   useEffect(() => {
//     async function loadSession() {
//       const session = await getSession();
//       if (session?.user) {
//         form.reset({
//           firstName: session.user.firstName || "",
//           lastName: session.user.lastName || "",
//           username: session.user.username || "",
//           email: session.user.email || "",
//           phone: formatPhone(session.user.phone) || "",
//         });
//       }
//     }
//     loadSession();
//   }, []);
//   useEffect(() => {
//     handleCheck();
//   }, []);
//   const { isValid, isSubmitted } = form.formState;
//   return (
//     <>
//       <div className=" bg-white  h-full w-full  px-6 pt-6">
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)}>
//             <div>
//               <div className="flex  gap-2 mb-4 justify-between  ">
//                 {/* First name */}
//                 <div className="w-full">
//                   {/* First name field */}
//                   <FormField
//                     control={form.control}
//                     name="firstName"
//                     render={({ field }) => (
//                       <FormItem>
//                         {/* First name label */}
//                         <FormLabel>First name</FormLabel>
//                         <FormControl>
//                           <Input
//                             className={`placeholder:text-gray-400 w-full border rounded-none ${
//                               form.formState.errors.firstName
//                                 ? "border-red-600"
//                                 : "border-gray-200"
//                             }`}
//                             placeholder="Abdallah"
//                             {...field}
//                           />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </div>
//                 {/* Last name */}
//                 <div className="w-full">
//                   {/* Last name field */}
//                   <FormField
//                     control={form.control}
//                     name="lastName"
//                     render={({ field }) => (
//                       <FormItem>
//                         {/* Last name label */}
//                         <FormLabel>Last name</FormLabel>
//                         <FormControl>
//                           <Input
//                             className={`placeholder:text-gray-400 w-full border rounded-none ${
//                               form.formState.errors.lastName
//                                 ? "border-red-600"
//                                 : "border-gray-200"
//                             }`}
//                             placeholder="Mazen"
//                             {...field}
//                           />
//                         </FormControl>
//                         {/* Form message */}
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* User */}
//             <FormField
//               control={form.control}
//               name="username"
//               render={({ field }) => (
//                 <FormItem className="mb-4">
//                   {/* User label*/}
//                   <FormLabel>UserName</FormLabel>
//                   <FormControl>
//                     <Input
//                       className={`placeholder:text-gray-400 border rounded-none ${
//                         form.formState.errors.username
//                           ? "border-red-600"
//                           : "border-gray-200"
//                       }`}
//                       placeholder="user123"
//                       {...field}
//                     />
//                   </FormControl>
//                   {/* Form message */}
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             {/* Email component */}
//             <EmailInput />

//             {/* Phone */}
//             <FormField
//               control={form.control}
//               name="phone"
//               render={({ field }) => (
//                 <FormItem className="mb-4">
//                   {/* Phone label */}
//                   <FormLabel>Phone</FormLabel>
//                   <FormControl>
//                     <PhoneInput
//                       defaultCountry="EG"
//                       international
//                       {...field}
//                       className={`placeholder:text-gray-400  rounded-none ${
//                         form.formState.errors.phone
//                           ? "border-red-600 border"
//                           : "border-gray-200"
//                       }`}
//                     />
//                   </FormControl>
//                   {/* Form message */}
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             {/* Validation error */}
//             {(form.formState.errors.email ||
//               form.formState.errors.firstName ||
//               form.formState.errors.lastName ||
//               form.formState.errors.phone ||
//               form.formState.errors.username) && (
//               <>
//                 <div className="relative">
//                   <CircleX
//                     className="absolute bg-white rounded-sm w-fit translate-y-1/2 left-1/2 -translate-x-1/2 z-10"
//                     color="#DC2626"
//                   />
//                 </div>
//                 <Alert variant="destructive" className="text-center mb-4">
//                   <AlertDescription>Something went wrong</AlertDescription>
//                 </Alert>
//               </>
//             )}

//             <div className="flex w-full justify-between gap-3.5 ">
//               {/* Modal */}
//               <DialogDemo onConfirm={deleteUser} />
//               {/* Button */}
//               <Button
//                 disabled={isPending || (!isValid && isSubmitted)}
//                 type="submit"
//                 className="bg-blue-600 text-white hover:bg-blue-700 rounded-none w-full"
//               >
//                 {isPending ? (
//                   <LoaderCircle className="animate-spin " />
//                 ) : (
//                   "Save Changes"
//                 )}
//               </Button>
//             </div>
//           </form>
//         </Form>
//         {/* Toaster  */}
//         <Toaster position="bottom-right" closeButton />
//       </div>
//     </>
//   );
// }

"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { registerSchema, RegisterValues } from "@/lib/schemas/auth.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Check, CircleX, LoaderCircle } from "lucide-react";
import EmailInput from "@/app/(auth)/_components/email-input";
import { PhoneInput } from "@/app/(auth)/_components/phone-input";
import { useCallback, useEffect } from "react";
import { getSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import useDelete from "../_hooks/use-delete";
import { DialogDemo } from "./modal";
import useEdit from "../_hooks/use-edit";
import { Toaster, toast } from "sonner";

export default function AccountForm() {
  // Hook
  const { deleteUser } = useDelete();
  const { edit, isPending } = useEdit();

  // Form
  const form = useForm<Omit<RegisterValues, "password" | "rePassword">>({
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      phone: "",
    },
    resolver: zodResolver(
      registerSchema.omit({ password: true, rePassword: true })
    ),
  });

  // Functions
  function formatPhone(phone: string) {
    if (phone.startsWith("0")) {
      return "+20" + phone.slice(1);
    }
    return phone;
  }

  const handleCheck = useCallback(async () => {
    const session = await getSession();
    console.log("Session:", session);
  }, []);

  const onSubmit: SubmitHandler<
    Omit<RegisterValues, "password" | "rePassword">
  > = async (values) => {
    const payload = {
      ...values,
      phone: values.phone.startsWith("+20")
        ? values.phone.replace("+20", "0")
        : values.phone,
    };
    edit(payload);
    toast(
      <div className=" flex items-center text-white ">
        <Check className="text-emerald-500" /> Event has been created
      </div>,
      {
        style: {
          background: "#1F2937",
        },
      }
    );
  };

  // Effects
  useEffect(() => {
    async function loadSession() {
      const session = await getSession();
      if (session?.user) {
        form.reset({
          firstName: session.user.firstName || "",
          lastName: session.user.lastName || "",
          username: session.user.username || "",
          email: session.user.email || "",
          phone: formatPhone(session.user.phone) || "",
        });
      }
    }
    loadSession();
  }, [form]); // Added form dependency

  useEffect(() => {
    handleCheck();
  }, [handleCheck]); // Added handleCheck dependency

  const { isValid, isSubmitted } = form.formState;
  
  return (
    <>
      <div className=" bg-white  h-full w-full  px-6 pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div>
              <div className="flex  gap-2 mb-4 justify-between  ">
                {/* First name */}
                <div className="w-full">
                  {/* First name field */}
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        {/* First name label */}
                        <FormLabel>First name</FormLabel>
                        <FormControl>
                          <Input
                            className={`placeholder:text-gray-400 w-full border rounded-none ${
                              form.formState.errors.firstName
                                ? "border-red-600"
                                : "border-gray-200"
                            }`}
                            placeholder="Abdallah"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {/* Last name */}
                <div className="w-full">
                  {/* Last name field */}
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        {/* Last name label */}
                        <FormLabel>Last name</FormLabel>
                        <FormControl>
                          <Input
                            className={`placeholder:text-gray-400 w-full border rounded-none ${
                              form.formState.errors.lastName
                                ? "border-red-600"
                                : "border-gray-200"
                            }`}
                            placeholder="Mazen"
                            {...field}
                          />
                        </FormControl>
                        {/* Form message */}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            {/* User */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="mb-4">
                  {/* User label*/}
                  <FormLabel>UserName</FormLabel>
                  <FormControl>
                    <Input
                      className={`placeholder:text-gray-400 border rounded-none ${
                        form.formState.errors.username
                          ? "border-red-600"
                          : "border-gray-200"
                      }`}
                      placeholder="user123"
                      {...field}
                    />
                  </FormControl>
                  {/* Form message */}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email component */}
            <EmailInput />

            {/* Phone */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="mb-4">
                  {/* Phone label */}
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <PhoneInput
                      defaultCountry="EG"
                      international
                      {...field}
                      className={`placeholder:text-gray-400  rounded-none ${
                        form.formState.errors.phone
                          ? "border-red-600 border"
                          : "border-gray-200"
                      }`}
                    />
                  </FormControl>
                  {/* Form message */}
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Validation error */}
            {(form.formState.errors.email ||
              form.formState.errors.firstName ||
              form.formState.errors.lastName ||
              form.formState.errors.phone ||
              form.formState.errors.username) && (
              <>
                <div className="relative">
                  <CircleX
                    className="absolute bg-white rounded-sm w-fit translate-y-1/2 left-1/2 -translate-x-1/2 z-10"
                    color="#DC2626"
                  />
                </div>
                <Alert variant="destructive" className="text-center mb-4">
                  <AlertDescription>Something went wrong</AlertDescription>
                </Alert>
              </>
            )}

            <div className="flex w-full justify-between gap-3.5 ">
              {/* Modal */}
              <DialogDemo onConfirm={deleteUser} />
              {/* Button */}
              <Button
                disabled={isPending || (!isValid && isSubmitted)}
                type="submit"
                className="bg-blue-600 text-white hover:bg-blue-700 rounded-none w-full"
              >
                {isPending ? (
                  <LoaderCircle className="animate-spin " />
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          </form>
        </Form>
        {/* Toaster  */}
        <Toaster position="bottom-right" closeButton />
      </div>
    </>
  );
}