export type ResourceType = "artist" | "album" | "track";

export type Resource = {
  name: string;
  SpotifyID: string;
  type: ResourceType;
};

// Used to specify the target attributes of recommended from the /recommendations endpoint
// All values are 0-1 except for popularity, which is 0-100
export type Settings = {
  target_danceability?: number;
  target_energy?: number;
  target_instrumentalness?: number;
  target_popularity?: number;
};
