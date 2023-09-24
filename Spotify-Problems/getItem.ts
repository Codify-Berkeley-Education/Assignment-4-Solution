// getItem.js
// Using the ideas from the getArtistId function, create a function called getItemID that takes in a resource type (artist, album, or track) and a resource name and returns the resource ID or null.
// I would highly recommend coming up with a way to store common information in a single place.

import ky from "ky";
import { authOptions, baseUrl } from "../constants";
import { ResourceType, Resource } from "../types";

export default async function getItem(
  resourceName: string,
  resourceType: ResourceType
): Promise<Resource> {
  const requestURI = `${baseUrl}/search?q=${resourceName}&type=${resourceType}&limit=1`;
  // Get the response
  const response: any = await ky.get(encodeURI(requestURI), authOptions).json();

  const pluralResourceName: string = `${resourceType}s`;

  // From the response, if the artist/track/album name matches exactly, return the artist ID
  if (response[pluralResourceName]?.items[0].name === resourceName) {
    return {
      name: response[pluralResourceName].items[0].name,
      SpotifyID: response[pluralResourceName].items[0].id,
      type: resourceType,
    };
  }
  throw new Error(`No ${resourceType} found with name ${resourceName}`);
}

// const response = await getItem("Olivia Rodrigo", "artist");
// const response = await getItemID("Red (Taylor's Versionn)", "album");

// console.log(response);
