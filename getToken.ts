import ky from "ky";
import fs from "fs";

const client_id = Bun.env.CLIENT_ID;
const client_secret = Bun.env.CLIENT_SECRET;

// Get the access token from Spotify
async function getToken(
  clientId: string | undefined,
  clientSecret: string | undefined
): Promise<string | undefined> {
  const authOptions = {
    headers: {
      Authorization: "Basic " + btoa(`${clientId}:${clientSecret}`),
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
    }),
  };

  try {
    const response = await ky.post(
      "https://accounts.spotify.com/api/token",
      authOptions
    );
    if (response.status === 200) {
      const body: any = await response.json();
      const token = body.access_token;
      console.log("Access Token:", token);
      return token;
    } else {
      console.error("Request failed with status:", response.status);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

// Load the existing .env file content
fs.readFile(".env", "utf8", async (err, data) => {
  if (err) {
    console.error("Error reading .env file:", err);
    return;
  }

  // Get the new access token
  const newAccessToken = await getToken(client_id, client_secret);

  // Check if the token already exists in the .env file
  if (data.includes("ACCESS_TOKEN=")) {
    // Replace the existing token with the new one
    const updatedEnv = data.replace(
      /ACCESS_TOKEN=.*/,
      `ACCESS_TOKEN=${newAccessToken}`
    );
    fs.writeFile(".env", updatedEnv, "utf8", (err) => {
      if (err) {
        console.error("Error writing to .env file:", err);
      } else {
        console.log("Access token updated successfully in .env file.");
      }
    });
  } else {
    // If the token doesn't exist, append it to the end of the file
    const envWithToken = `${data}\nACCESS_TOKEN=${newAccessToken}\n`;
    fs.writeFile(".env", envWithToken, "utf8", (err) => {
      if (err) {
        console.error("Error writing to .env file:", err);
      } else {
        console.log("Access token added successfully to .env file.");
      }
    });
  }
});
