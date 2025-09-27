"use server";

export async function newPassword(data: Record<string, FormDataEntryValue>) {
  const response = await fetch(`${process.env.RESET_PASSWORD_API_URL}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const payload = await response.json();
  return payload;
}
