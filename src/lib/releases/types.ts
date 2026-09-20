export type GithubRelease = {
  tag_name: string;
  name: string;
  body: string;
  html_url: string;
  published_at: string;
  prerelease: boolean;
  draft: boolean;
};

export type ChangelogRelease = {
  tag: string;
  title: string;
  publishedAt: string;
  htmlUrl: string;
  prerelease: boolean;
  sections: { heading: string; items: string[] }[];
  source: "live" | "cache";
};
