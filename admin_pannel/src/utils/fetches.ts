export async function postRequest(url: string, value: object = {}) {
  try {
    const jsonRes = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(value),
    });

    const response = await jsonRes.json();
    return response;
  } catch (error) {
    return { error: true, message: error };
  }
}
