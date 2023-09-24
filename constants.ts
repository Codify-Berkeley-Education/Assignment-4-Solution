import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

// Get the access token from the .env file
const access_token = process.env.ACCESS_TOKEN;

// Set up the authorization options for passing in the access token
export const authOptions = {
  headers: {
    Authorization: `Bearer ${access_token}`,
  },
};

// Base URL for Spotify API
export const baseUrl: string = "https://api.spotify.com/v1";
