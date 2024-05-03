import { sortPlacesByDistance } from "../loc.js";
import { fetchAvailablePlace } from "../http.js";
import { useFetch } from "../hook/useFetch.js";
import Places from "./Places.jsx";
import Error from "./Error.jsx";

async function fetchSortedPlaces() {
  const places = await fetchAvailablePlace();
  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPlaces = sortPlacesByDistance(
        places,
        position.coords.latitude,
        position.coords.longitude
      );

      resolve(sortedPlaces);
    });
  });
}

export default function AvailablePlaces({ onSelectPlace }) {
  const {
    error,
    isFetching,
    fetchData: availablePlaces,
  } = useFetch(fetchSortedPlaces, []);

  if (error) {
    return <Error title="An error occured" message={error.message} />;
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Fetching available places..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
