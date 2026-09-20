import { createServerFn } from "@tanstack/react-start";
import { loadReleases } from "./fetch";

export const getReleases = createServerFn({ method: "GET" }).handler(async () => {
  return loadReleases();
});

export const refreshReleases = createServerFn({ method: "POST" }).handler(async () => {
  return loadReleases(true);
});
