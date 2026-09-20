import { createFileRoute } from "@tanstack/react-router";
import { loadReleases } from "@/lib/releases/fetch";

export const Route = createFileRoute("/api/releases")({
  server: {
    handlers: {
      GET: async () => {
        const data = await loadReleases();
        return Response.json(data, {
          headers: { "Cache-Control": "public, max-age=60" },
        });
      },
    },
  },
});
