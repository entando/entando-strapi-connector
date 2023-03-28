interface PayloadData {
  configUrl: string
  token: string
}

export const getData = async (url: string) => {
  const response = await fetch(url)
    .then((res) => res.json())
    .then((data) => data)
    .catch((error) => error)

  return response
}

export const postData = async (url: string, payload: PayloadData) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("POST data", data)
      return data
    })
    .catch((error) => {
      console.log("POST error", error)
      return error
    })

  return response
}
