import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const TOKEN = "62e9627babfac0ae901395eb4fafa13166b3d5e0";

    // Calculate timestamps for date range (1 year ago to now)
    const now = Math.floor(Date.now() / 1000); // Current time in seconds
    const oneYearAgo = now - 365 * 24 * 60 * 60; // One year ago in seconds

    let page = 1;
    const perPage = 100; // Maximum allowed by Strava API
    let allActivities: any[] = [];
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

    res.status(200).json(filteredActivities);
  } catch (error) {
    console.error("Error fetching activities:", error);
    res.status(500).json({ error: "Failed to fetch activities" });
  }
}
