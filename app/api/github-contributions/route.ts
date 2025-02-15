import { NextResponse } from "next/server";

const GITHUB_API_URL = "https://api.github.com/graphql";
const GITHUB_USERNAME = "jiito"; // Replace with your actual GitHub username

interface ContributionDay {
  contributionCount: number;
  date: string;
}

async function getContributions() {
  const query = `
    query {
      user(login: "${GITHUB_USERNAME}") {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
              }
            }
          }
        }
      }
    }
  `;

  const response = await fetch(GITHUB_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch GitHub contributions");
  }

  const data = await response.json();

  // Flatten the weeks array into a single array of contribution days
  const contributions =
    data.data.user.contributionsCollection.contributionCalendar.weeks
      .flatMap(
        (week: { contributionDays: ContributionDay[] }) => week.contributionDays
      )
      .map((day: ContributionDay) => ({
        id: new Date(day.date).getTime(), // Use timestamp as ID
        date: day.date,
        contribution_count: day.contributionCount,
      }));

  return contributions;
}

export async function GET() {
  try {
    const contributions = await getContributions();
    return NextResponse.json(contributions);
  } catch (error) {
    console.error("Error fetching GitHub contributions:", error);
    return NextResponse.json(
      { error: "Failed to fetch GitHub contributions" },
      { status: 500 }
    );
  }
}
