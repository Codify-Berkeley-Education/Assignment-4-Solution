// getAlbums.ts
// Given an artist name, return all of that artist's albums as an array or Resource objects.
import ky from "ky";
import getItem from "./getItem";
import { baseUrl, authOptions } from "../constants";
import { Resource } from "../types";

export default async function getAlbums(
  artistName: string
): Promise<Resource[]> {
  // Get the artist ID
  const artist: Resource | null = await getItem(artistName, "artist");
  if (artist === null) {
    return [];
  }

  // Get the albums
  const requestURI = `${baseUrl}/artists/${artist.SpotifyID}/albums?include_groups=album&limit=50`;
  const response: any = await ky.get(encodeURI(requestURI), authOptions).json();

  // Return the album names
  return response.items.map((item: any) => {
    return {
      name: item.name,
      SpotifyID: item.id,
      type: "album",
    };
  });
}

// const response = await getAlbums("Taylor Swift");
