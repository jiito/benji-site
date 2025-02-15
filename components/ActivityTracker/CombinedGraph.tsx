"use client";
import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import { Bike, Code } from "lucide-react";

interface Activity {
  id: number;
  start_date: string;
  distance: number;
}

interface Contribution {
  id: number;
  date: string;
  contribution_count: number;
}

interface CombinedData {
  date: Date;
  activity?: Activity;
  contribution?: Contribution;
}

interface CellProps {
  loading: boolean;
  data: CombinedData;
  delay: number;
  stravaColorScale: d3.ScaleLinear<string, string>;
  githubColorScale: d3.ScaleLinear<string, string>;
  showStrava: boolean;
  showGithub: boolean;
}

const Cell: React.FC<CellProps> = ({
  loading,
  data,
  delay,
  stravaColorScale,
  githubColorScale,
  showStrava,
  showGithub,
}) => {
  const { date, activity, contribution } = data;
  const hasActivity = !!activity && showStrava;
  const hasContribution = !!contribution?.contribution_count && showGithub;
  const distance = activity?.distance || 0;
  const count = contribution?.contribution_count || 0;

  // Create label that shows both activity and contribution if present
  const label = [];
  if (hasActivity) {
    const distanceLabel =
      distance > 1000 ? `${(distance / 1000).toFixed(1)} km` : `${distance} m`;
    label.push(`Strava: ${distanceLabel}`);
  }
  if (hasContribution) {
    label.push(`GitHub: ${count} contributions`);
  }
  const combinedLabel = label.length > 0 ? label.join(" | ") : "No activity";

  // Blend colors based on presence of activity and contributions
  const getBackgroundColor = () => {
    if (loading) return "#ebedf0";
    if (!hasActivity && !hasContribution) return "#ebedf0";

    if (hasActivity && hasContribution) {
      // Blend colors when both exist
      const stravaColor = d3.color(stravaColorScale(distance))!;
      const githubColor = d3.color(githubColorScale(count))!;
      return d3.interpolateRgb(stravaColor, githubColor)(0.5);
    }

    if (hasActivity) return stravaColorScale(distance);
    return githubColorScale(count);
  };

  return (
    <td
      className="hover:scale-110 transition-transform duration-200 ease-in-out"
      title={`${date.toLocaleDateString()} - ${combinedLabel}`}
    >
      <div
        className="w-[10px] h-[10px] rounded-[2px] transition-colors duration-500"
        style={{
          backgroundColor: getBackgroundColor(),
          animation: loading ? `shimmer 1.5s infinite ${delay}ms` : "none",
        }}
      />
    </td>
  );
};

const DAYS_IN_WEEK = 7;

// Helper function to ensure consistent date handling
const normalizeDate = (date: Date | string): string => {
  const d = new Date(date);
  return d.toISOString().split("T")[0];
};

interface ToggleButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  activeColor: string;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({
  active,
  onClick,
  icon,
  label,
  activeColor,
}) => {
  const colorClasses = {
    "blue-600": "text-blue-600 stroke-blue-600",
    "#216e39": "text-[#216e39] stroke-[#216e39]",
  };

  return (
    <button
      onClick={onClick}
      className={`p-2 rounded-full transition-all duration-300 ${
        active
          ? colorClasses[activeColor as keyof typeof colorClasses]
          : "text-gray-400 stroke-gray-400"
      }`}
      title={label}
    >
      {icon}
    </button>
  );
};

const CombinedGraph: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showStrava, setShowStrava] = useState(true);
  const [showGithub, setShowGithub] = useState(true);

  // Get start date (last Sunday)
  const endDate = new Date();
  const startDate = new Date(endDate);
  startDate.setDate(endDate.getDate() - 365);
  const currentDay = startDate.getDay();
  startDate.setDate(startDate.getDate() - currentDay);

  // Create array of dates
  const dates: Date[] = [];
  const currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  // Group into weeks
  const weeks: Date[][] = [];
  for (let i = 0; i < dates.length; i += DAYS_IN_WEEK) {
    weeks.push(dates.slice(i, i + DAYS_IN_WEEK));
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch both datasets in parallel
        const [activitiesResponse, contributionsResponse] = await Promise.all([
          fetch("/api/activities"),
          fetch("/api/github-contributions"),
        ]);

        if (!activitiesResponse.ok || !contributionsResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        const activitiesData = await activitiesResponse.json();
        const contributionsData = await contributionsResponse.json();

        setActivities(Array.isArray(activitiesData) ? activitiesData : []);
        setContributions(
          Array.isArray(contributionsData) ? contributionsData : []
        );
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setError("Failed to load activity data. Please try again later.");
        setActivities([]);
        setContributions([]);
      } finally {
        setTimeout(() => setLoading(false), 500);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return (
      <div className="p-4 flex items-center justify-center h-[200px]">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  const maxDistance = Math.max(
    ...activities.map((activity) => activity.distance),
    1
  );
  const maxContributions = Math.max(
    ...contributions.map((contribution) => contribution.contribution_count),
    1
  );

  const stravaColorScale = d3
    .scaleLinear<string>()
    .domain([0.1, maxDistance])
    .range(["#9bbde9", "#214e6e"])
    .clamp(true);

  const githubColorScale = d3
    .scaleLinear<string>()
    .domain([0.1, maxContributions])
    .range(["#9be9a8", "#216e39"])
    .clamp(true);

  return (
    <>
      <div className="flex gap-1 items-center justify-end">
        <ToggleButton
          active={showStrava}
          onClick={() => setShowStrava(!showStrava)}
          icon={
            <Bike className="w-5 h-5" strokeWidth={showStrava ? 2.5 : 1.5} />
          }
          label="Toggle Strava Activities"
          activeColor="blue-600"
        />
        <ToggleButton
          active={showGithub}
          onClick={() => setShowGithub(!showGithub)}
          icon={
            <Code className="w-5 h-5" strokeWidth={showGithub ? 2.5 : 1.5} />
          }
          label="Toggle GitHub Contributions"
          activeColor="#216e39"
        />
      </div>
      <table className="w-full border-spacing-2 mb-4">
        <tbody>
          {weeks[0].map((_, dayIndex) => (
            <tr key={dayIndex} className="h-[12px]">
              {weeks.map((week, weekIndex) => {
                const date = week[dayIndex];
                if (!date) return null;

                const normalizedDate = normalizeDate(date);
                const activity = activities.find(
                  (activity) =>
                    normalizeDate(activity.start_date) === normalizedDate
                );
                const contribution = contributions.find(
                  (contribution) =>
                    normalizeDate(contribution.date) === normalizedDate
                );

                return (
                  <Cell
                    key={`${weekIndex}-${dayIndex}`}
                    loading={loading}
                    data={{ date, activity, contribution }}
                    delay={(weekIndex * 7 + dayIndex) * 20}
                    stravaColorScale={stravaColorScale}
                    githubColorScale={githubColorScale}
                    showStrava={showStrava}
                    showGithub={showGithub}
                  />
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default CombinedGraph;
