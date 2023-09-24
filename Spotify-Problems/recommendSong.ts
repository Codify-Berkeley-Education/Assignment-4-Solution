// recommendSong.ts
// Given either an album or an artist, and a list of song resources (tracks), to exclude
// return the most popular song on the album, or most popular song by the artist, that is not in the list of excluded songs.
// If all songs in the album/artist are in the list of excluded songs, throw an error.

// Use the popularity field to determine the most popular song.
// If there are two songs of equal popularity, return the first one.

// For this problem, ensure you are passing 'ES' (English Speaking) as the market parameter to the API.

import ky from "ky";
import getItem from "./getItem";
import getTracks from "./getTracks";
import { baseUrl, authOptions } from "../constants";
import { Resource } from "../types";

export default async function recommendSong(
  seed: Resource,
  excluded: Resource[]
): Promise<Resource> {
  if (seed.type === "album") {
    return await recommendFromAlbum(seed, excluded);
  } else if (seed.type === "artist") {
    return await recommendFromArtist(seed, excluded);
  }
  throw new Error(`Seed type ${seed.type} not supported`);
}

// Use the top-tracks endpoint, and get the song with the highest popularity.
// Return the first item from that list
async function recommendFromArtist(
  seed: Resource,
  excluded: Resource[]
): Promise<Resource> {
  const requestURI = `${baseUrl}/artists/${seed.SpotifyID}/top-tracks?market=ES`;
  const response: any = await ky.get(encodeURI(requestURI), authOptions).json();

  const excludeTrackIDs: string[] = excluded.map((track: Resource) => {
    return track.SpotifyID;
  });

  for (let i = 0; i < response.tracks.length; i++) {
    if (!excludeTrackIDs.includes(response.tracks[i].id)) {
      return {
        name: response.tracks[i].name,
        SpotifyID: response.tracks[i].id,
        type: "track",
      };
    }
  }

  throw new Error(
    `No songs found for artist ${seed.name} not in excluded list`
  );
}

// There is no dedicated API route for getting the most popular song from an album.
// Therefore, we must iterate through all of the album's tracks and find the most popular one.
async function recommendFromAlbum(
  seed: Resource,
  excluded: Resource[]
): Promise<Resource> {
  let highestPopularity: number = -1;
  let mostPopularSong: Resource;
  const tracks: Resource[] = await getTracks(seed.name);
  //   return mostPopularSong;
}

const item = await getItem("Olivia Rodrigo", "artist");
console.log(item);
const response = await recommendSong(item, [
  {
    name: "vampire",
    SpotifyID: "1kuGVB7EU95pJObxwvfwKS",
    type: "track",
  },
]);
console.log(response);
