"use server";

export async function registerUser(data: Record<string, FormDataEntryValue>) {
  // Send request to regoster
  const response = await fetch(`${process.env.SIGN_UP_API_URL}`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const payload = await response.json();
console.log(payload)
  return payload;
}
