import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { verifyAction } from "../_actions/verify.action";
import { CodeValues } from "@/lib/schemas/auth.schemas";


export default function useVerify() {
const router = useRouter()

const {isPending, error ,mutate}= useMutation({
    mutationFn: async(values :CodeValues) =>{
        const response = await verifyAction(values)
        
   if (response?.code===400) {
     throw new Error(response.message);
   }

   if (response?.status === "Success") {
     router.push("/createnewpassword");
   }

   return response;
    }
})
return { isPending, error, verify: mutate }
}