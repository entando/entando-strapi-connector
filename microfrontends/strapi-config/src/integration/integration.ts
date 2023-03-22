export const fetchData = async (url: string) => {
  const fetchedData = await fetch(url)
    .then((res) => {
      if (res.ok) {
        return res.json()
      }
      throw new Error("errorFetchingData")
    })
    .then((data) => data)
    .catch((error) => error)
  return fetchedData
}
