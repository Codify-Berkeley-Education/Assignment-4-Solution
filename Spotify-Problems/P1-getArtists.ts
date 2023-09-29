// getArtists.js
// Most of the time, a user will think about an artist in terms of their name, not their ID.
// As a result, we need to be able to convert an artist name to an artist ID.
// Create a function called getArtistId that takes an artist name as an argument and returns the artist ID.
// If the artist's exact name doesn't exist, return null.

import ky from "ky";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });
// Necessary because we are not in the same directory
const access_token = process.env.ACCESS_TOKEN;

export default async function getArtistId(
  artistName: string
): Promise<string | null> {
  // Get the access token from the .env file

  // Base URL for Spotify API
  const base_url = "https://api.spotify.com/v1";

  // Set up the authorization options for passing in the access token
  const authOptions = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };

  // What endpoint are we accessing?
  const endpoint = "/" + "search"; // Todo edit me

  //what are we actually searching?
  const query = "q=" + artistName; // Todo edit me

  // either artist, album, playlist, or track
  const resource_type = "type=artist"; // Todo edit me

  // '?' indicates we are passing in query parameters
  const request_uri =
    base_url + endpoint + "?" + query + "&" + resource_type + "&limit=1"; // Todo optionally add any other useful query params

  // Get the response
  const response: any = await ky
    .get(encodeURI(request_uri), authOptions)
    .json();

  // From the response, if the artist name matches exactly, return the artist ID
  if (response.artists.items[0].name === artistName) {
    return response.artists.items[0].id;
  }

  // Otherwise, return null
  return null;
}

// Response from getArtistId("Taylor Swift")
const sample_response = {
  artists: {
    href: "https://api.spotify.com/v1/search?query=Taylor+Swift&type=artist&locale=en-US%2Cen%3Bq%3D0.9&offset=0&limit=1",
    items: [
      {
        external_urls: {
          spotify: "https://open.spotify.com/artist/06HL4z0CvFAxyc27GXpf02",
        },
        followers: {
          href: null,
          total: 87011244,
        },
        genres: ["pop"],
        href: "https://api.spotify.com/v1/artists/06HL4z0CvFAxyc27GXpf02",
        id: "06HL4z0CvFAxyc27GXpf02",
        images: [
          {
            height: 640,
            url: "https://i.scdn.co/image/ab6761610000e5eb6a224073987b930f99adc706",
            width: 640,
          },
          {
            height: 320,
            url: "https://i.scdn.co/image/ab676161000051746a224073987b930f99adc706",
            width: 320,
          },
          {
            height: 160,
            url: "https://i.scdn.co/image/ab6761610000f1786a224073987b930f99adc706",
            width: 160,
          },
        ],
        name: "Taylor Swift",
        popularity: 100,
        type: "artist",
        uri: "spotify:artist:06HL4z0CvFAxyc27GXpf02",
      },
    ],
    limit: 1,
    next: null,
    offset: 0,
    previous: null,
    total: 1,
  },
};
