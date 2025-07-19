import { NextResponse } from "next/server";

interface StravaActivity {
  start_date: string;
  [key: string]: unknown;
}

async function refreshToken() {
  const response = await fetch("https://www.strava.com/oauth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: process.env.STRAVA_CLIENT_ID,
      client_secret: process.env.STRAVA_CLIENT_SECRET,
      refresh_token: process.env.STRAVA_REFRESH_TOKEN,
      grant_type: "refresh_token",
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to refresh token");
  }

  const data = await response.json();
  return data.access_token;
}

export async function GET() {
  try {
    // Get a fresh access token
    const TOKEN = await refreshToken();

    // Calculate timestamps for date range (1 year ago to now)
    const now = Math.floor(Date.now() / 1000); // Current time in seconds
    const oneYearAgo = now - 365 * 24 * 60 * 60; // One year ago in seconds

    let page = 1;
    const perPage = 100; // Maximum allowed by Strava API
    let allActivities: StravaActivity[] = [];
    let shouldContinue = true;

    // Fetch activities until we have all activities from the past year
    while (shouldContinue) {
      const response = await fetch(
        `https://www.strava.com/api/v3/athlete/activities?after=${oneYearAgo}&per_page=${perPage}&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Strava API responded with status: ${response.status}`);
      }

      const activities = await response.json();

      // If we got no activities, we've reached the end
      if (activities.length === 0) {
        shouldContinue = false;
        continue;
      }

      // Add activities to our collection
      allActivities = [...allActivities, ...activities];

      // Check if the last activity is older than one year
      const lastActivityTime =
        new Date(activities[activities.length - 1].start_date).getTime() / 1000;
      if (lastActivityTime < oneYearAgo) {
        shouldContinue = false;
      }

      page++;
    }

    // Filter out any activities older than one year (just to be safe)
    const filteredActivities = allActivities.filter(
      (activity) => new Date(activity.start_date).getTime() / 1000 >= oneYearAgo
    );

    return NextResponse.json(filteredActivities);
  } catch (error) {
    console.error("Error fetching activities:", error);
    return NextResponse.json(
      { error: "Failed to fetch activities" },
      { status: 500 }
    );
  }
}
