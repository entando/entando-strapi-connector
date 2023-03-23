interface PayloadData {
  configUrl: string
  token: string
}

export const getData = async (url: string) => {
  const response = await fetch(url)
    .then((res) => {
      if (res.ok) {
        return res.json()
      }
      throw new Error("Error while fetching data")
    })
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
    .then((res) => {
      if (res.ok) {
        return res.json()
      }
      throw new Error("Error while posting data")
    })
    .then((data) => data)
    .catch((error) => error)

  return response
}
