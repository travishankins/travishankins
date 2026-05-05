import * as fs from "fs";
import { fetchGitHubData } from "./fetchGitHubData";

const githubUsername = "travishankins";
const websiteUrl = "https://travishankins.com";
const linkedinUrl = "https://www.linkedin.com/in/travishankins";

// Hand-curated list of repos to feature.
// Reorder to control display order.
const featuredRepos = [
  "azure-launchpad",
  "azure-agentic-demo",
  "azure-monitor-poc",
  "azure-fileshare-cost-workbook",
  "azure-file-purge",
];

async function generateMarkdown(): Promise<void> {
  const websiteBadge = `[![Website](https://img.shields.io/badge/-travishankins.com-1f6feb?style=flat-square&logo=googlechrome&logoColor=white)](${websiteUrl})`;
  const linkedinBadge = `[![LinkedIn](https://img.shields.io/badge/-LinkedIn-0A66C2?style=flat-square&logo=linkedin&logoColor=white)](${linkedinUrl})`;
  const followBadge = `[![GitHub followers](https://img.shields.io/github/followers/${githubUsername}?label=Follow&style=social)](https://github.com/${githubUsername}?tab=followers)`;
  const profileViewsBadge = `![Profile views](https://komarev.com/ghpvc/?username=${githubUsername}&style=flat-square&color=blue)`;

  const techBadges = [
    "![Azure](https://img.shields.io/badge/-Azure-0078D4?style=flat-square&logo=microsoftazure&logoColor=white)",
    "![Terraform](https://img.shields.io/badge/-Terraform-7B42BC?style=flat-square&logo=terraform&logoColor=white)",
    "![Bicep](https://img.shields.io/badge/-Bicep-0078D4?style=flat-square&logo=microsoftazure&logoColor=white)",
    "![Docker](https://img.shields.io/badge/-Docker-2496ED?style=flat-square&logo=docker&logoColor=white)",
    "![Kubernetes](https://img.shields.io/badge/-Kubernetes-326CE5?style=flat-square&logo=kubernetes&logoColor=white)",
    "![GitHub Actions](https://img.shields.io/badge/-GitHub%20Actions-2088FF?style=flat-square&logo=githubactions&logoColor=white)",
    "![Azure DevOps](https://img.shields.io/badge/-Azure%20DevOps-0078D7?style=flat-square&logo=azuredevops&logoColor=white)",
    "![PowerShell](https://img.shields.io/badge/-PowerShell-5391FE?style=flat-square&logo=powershell&logoColor=white)",
  ].join(" ");

  const streakCard = `[![GitHub Streak](https://streak-stats.demolab.com?user=${githubUsername}&theme=transparent)](https://git.io/streak-stats)`;

  const featuredReposList = await fetchGitHubData(githubUsername, featuredRepos);

  const lastUpdated = new Date().toUTCString();

  const markdownText = `<h1 align="center">Hi, I'm Travis 👋</h1>

<p align="center"><em>Principal Cloud Solution Architect @ Microsoft</em></p>

<p align="center">

${websiteBadge} ${linkedinBadge} ${followBadge} ${profileViewsBadge}

</p>

---

### About

- 🏗️  Helping enterprises land well on Azure
- 🚀 Currently building **Azure LaunchPad** and going deep on **DevOps & Automation**
- 💬 Ask me about Azure landing zones, Terraform, platform engineering, or containers

### Tech

${techBadges}

---

### 📊 GitHub Stats

<p align="center">

${streakCard}

</p>

---

### 🛠️ Featured Repos

<!-- FEATURED-REPOS:START -->
${featuredReposList}
<!-- FEATURED-REPOS:END -->

---

<p align="center"><sub>Built with ❤️, TypeScript, and GitHub Actions · Last updated ${lastUpdated}</sub></p>
`;

  // Write the template directly. GitHub's markdown renderer handles the
  // mixed HTML + Markdown perfectly; running it through markdown-it strips
  // markdown that lives inside HTML blocks (e.g. shields.io badges in <p>).
  fs.writeFileSync("README.md", markdownText);
  console.log("✅ README.md generated.");
}

generateMarkdown().catch((err) => {
  console.error(err);
  process.exit(1);
});
