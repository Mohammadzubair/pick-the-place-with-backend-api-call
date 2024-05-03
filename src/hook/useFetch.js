import { useEffect, useState } from "react";

export function useFetch(fetchFN, initialValue) {

  const [isFetching, setIsFetching] = useState()
  const [error, setError] = useState()
  const [fetchData, setFetchData] = useState(initialValue)

  useEffect(() => {
    setIsFetching(true);

    async function fetchUser() {
      try {
        const data = await fetchFN();
        setFetchData(data);
      } catch (error) {
        setError({
          message: error.message || "Failed to fetch data.",
        });
      }

      setIsFetching(false);
    }

    fetchUser();
  }, [fetchFN]);

  return { isFetching, error, fetchData, setFetchData }
}
