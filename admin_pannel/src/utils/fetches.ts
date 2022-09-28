export async function postRequest(url: string, value: object = {}) {
  try {
    const jsonRes = await fetch(url, {
      method: "POST",
      body: JSON.stringify(value),
    });

    return await jsonRes.json();
  } catch (error) {
    console.log(error);
  }
}
