"use server";

export async function forgetAction(data: Record<string, FormDataEntryValue>) {
  const response = await fetch(`${process.env.FORGET_PASSWORD_API_URL}`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const payload = await response.json();

  return payload;
}
