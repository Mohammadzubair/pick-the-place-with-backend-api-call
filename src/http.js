import { BASE_URL } from "./Url";

export async function fetchAvailablePlace() {
  const response = await fetch(`${BASE_URL}/places`);
  const resData = await response.json();

  if (!response.ok) {
    throw new Error(
      `Failed to fetch available places. Please try again later.`
    );
  }

  return resData.places;
}


export async function fetchUserPlace() {
  const response = await fetch(`${BASE_URL}/user-places`);
  const resData = await response.json();

  if (!response.ok) {
    throw new Error(
      `Failed to fetch user places. Please try again later.`
    );
  }

  return resData.places;
}


export async function updateUserPlaces(places) {
  const response = await fetch(`${BASE_URL}/user-places`, {
    method: 'PUT',
    body: JSON.stringify({ places }),
    headers: {
      "content-type": "application/json"
    }
  })

  const resData = await response.json

  if (!response.ok) {
    throw new Error("Failed to update user data.")
  }

  return resData.message;
}