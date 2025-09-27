
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useFormContext } from "react-hook-form"
export default function EmailInput() {

const form = useFormContext() 

  return <>

  {/* <Input type="email" placeholder="Email" {...register("email")}   /> */}
  <FormField
  control={form.control}
  name="email"
  render={({ field }) => (
    <FormItem className="mb-4">
      <FormLabel className="text-base text-gray-800">Email</FormLabel>
      <FormControl>
        <Input placeholder="user@example.com" {...field}   type="email" className={`placeholder:text-gray-400 border rounded-none ${
  form.formState.errors.email ? "border-red-600" : "border-gray-200"
}`}/>
      </FormControl>
      <FormMessage />
      
    </FormItem>
  )}
/>
  </>

}
