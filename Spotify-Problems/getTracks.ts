// getTracks.ts
// Given an album name, return all of that album's tracks as an array or Resource objects.

import ky from "ky";
import getItem from "./getItem";
import { baseUrl, authOptions } from "../constants";
import { Resource } from "../types";

export default async function getTracks(
  albumName: string
): Promise<Resource[]> {
  // Get the album ID
  const album: Resource | null = await getItem(albumName, "album");
  if (album === null) {
    return [];
  }

  // Get the tracks
  const requestURI = `${baseUrl}/albums/${album.SpotifyID}/tracks?limit=50`;
  const response: any = await ky.get(encodeURI(requestURI), authOptions).json();

  // Return the track names
  return response.items.map((item: any) => {
    return {
      name: item.name,
      SpotifyID: item.id,
      type: "track",
    };
  });
}

// console.log(await getTracks("Red (Taylor's Version)"));
