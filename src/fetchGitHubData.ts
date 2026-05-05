/**
 * Fetch metadata for a list of repositories from the public GitHub REST API
 * and render them as an HTML <ul>.
 */
export async function fetchGitHubData(
  owner: string,
  repos: string[],
): Promise<string> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const items = await Promise.all(
    repos.map(async (repo) => {
      const res = await fetch(
        `https://api.github.com/repos/${owner}/${repo}`,
        { headers },
      );
      if (!res.ok) {
        throw new Error(
          `Failed to fetch ${owner}/${repo}: ${res.status} ${res.statusText}`,
        );
      }
      const data = (await res.json()) as {
        html_url: string;
        name: string;
        description: string | null;
        stargazers_count: number;
        forks_count: number;
        language: string | null;
      };

      const emoji = pickEmoji(data.name, data.language);
      const desc = data.description ? escapeHtml(data.description) : "";

      return `<li>${emoji} <a href="${data.html_url}" target="_blank" rel="noopener noreferrer"><b>${data.name}</b></a> - ${desc}</li>`;
    }),
  );

  return `<ul>\n  ${items.join("\n  ")}\n</ul>`;
}

/** Pick an emoji based on repo name keywords / primary language. */
function pickEmoji(name: string, language: string | null): string {
  const n = name.toLowerCase();
  const lang = (language ?? "").toLowerCase();
  if (n.includes("terraform") || lang === "hcl") return "🌍";
  if (n.includes("bicep") || lang === "bicep") return "💪";
  if (n.includes("agent") || n.includes("ai")) return "🤖";
  if (n.includes("launch") || n.includes("starter")) return "🚀";
  if (n.includes("monitor") || n.includes("observ")) return "📈";
  if (n.includes("cost") || n.includes("billing")) return "💸";
  if (n.includes("purge") || n.includes("clean")) return "🧹";
  if (n.includes("docker") || n.includes("container")) return "🐳";
  if (n.includes("k8s") || n.includes("kube")) return "⎈";
  if (n.includes("action") || n.includes("workflow")) return "⚙️";
  if (n.includes("azure")) return "☁️";
  if (lang === "python") return "🐍";
  if (lang === "typescript" || lang === "javascript") return "📜";
  if (lang === "powershell") return "💠";
  return "📦";
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
