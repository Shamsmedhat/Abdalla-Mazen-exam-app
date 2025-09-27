"use server"


export async function verifyAction(data: Record<string, FormDataEntryValue>) {
const response = await fetch(`${process.env.RESET_CODE_API_URL}`,{
    method:"POST",
    body: JSON.stringify(data),
    headers:{
        "Content-Type" :"application/json"
    }
    });
    const payload = await response.json();
     return payload;

}
