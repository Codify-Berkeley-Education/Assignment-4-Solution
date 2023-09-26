// recommendPlaylist.ts
// Given a array of resources, and a settings object, return a playlist of 10 songs that match the settings
// using the recommendations endpoint.
// The playlist should be an array of Resource objects of type "track"

import ky from "ky";
import getItem from "./getItem.ts";
import getTracks from "./getTracks.ts";
import { baseUrl, authOptions } from "../constants.ts";
import { Resource, Settings } from "../types.ts";

export default async function recommendPlaylist(
  seedResources: Resource[],
  settings: Settings
): Promise<Resource[]> {
  // Iterate through all of the seedResources and get the IDs of the artists and tracks
  const seedArtistIDs: string[] = [];
  const seedTrackIDs: string[] = [];
  for (let i = 0; i < seedResources.length; i++) {
    if (seedResources[i].type === "artist") {
      seedArtistIDs.push(seedResources[i].SpotifyID);
    } else if (seedResources[i].type === "track") {
      seedTrackIDs.push(seedResources[i].SpotifyID);
    }
  }

  // Convert the seed resources into a comma-separated strings
  const seedArtistIDsString: string = seedArtistIDs.join(",");
  const seedTrackIDsString: string = seedTrackIDs.join(",");

  // Convert all defined settings to a comma-separated string
  // One hell of a chained function call
  const settingsString: string = Object.entries(settings)
    .filter(([, value]) => value !== undefined)
    .map(([key, value]) => `${key}=${value}`)
    .join(",");

  // Make the request to the recommendations endpoint
  const response: any = await ky
    .get(
      `${baseUrl}/recommendations?seed_artists=${seedArtistIDsString}&seed_tracks=${seedTrackIDsString}&${settingsString}`,
      authOptions
    )
    .json();

  // Convert the response into an array of Resource objects
  const recommendedTracks: Resource[] = [];
  for (let i = 0; i < response.tracks.length; i++) {
    recommendedTracks.push({
      name: response.tracks[i].name,
      SpotifyID: response.tracks[i].id,
      type: "track",
    });
  }

  return recommendedTracks;
}

const seedResources: Resource[] = [
  {
    name: "vampire",
    SpotifyID: "1kuGVB7EU95pJObxwvfwKS",
    type: "track",
  },
  {
    name: "bad idea right?",
    SpotifyID: "3IX0yuEVvDbnqUwMBB3ouC",
    type: "track",
  },
  {
    name: "deja vu",
    SpotifyID: "6HU7h9RYOaPRFeh0R3UeAr",
    type: "track",
  },
];

const options: Settings = {};

const response = await recommendPlaylist(seedResources, options);
console.log(response);
