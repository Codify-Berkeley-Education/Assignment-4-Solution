export type ResourceType = "artist" | "album" | "track";

export type Resource = {
  name: string;
  SpotifyID: string;
  type: ResourceType;
};
