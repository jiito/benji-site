"use client";
import React, { useEffect, useState } from "react";
import * as d3 from "d3";

interface Contribution {
  id: number;
  date: string;
  contribution_count: number;
}

interface CellProps {
  loading: boolean;
  date: Date;
  contribution?: Contribution;
  delay: number;
  colorScale: d3.ScaleLinear<string, string>;
}

const Cell: React.FC<CellProps> = ({
  loading,
  date,
  contribution,
  delay,
  colorScale,
}) => {
  const hasContribution = !!contribution?.contribution_count;
  const count = contribution?.contribution_count || 0;
  const contributionLabel = count
    ? `${count} contributions`
    : "No contributions";

  return (
    <td
      className="hover:scale-110 transition-transform duration-200 ease-in-out"
      title={`${date.toLocaleDateString()} - ${contributionLabel}`}
    >
      <div
        className="w-[10px] h-[10px] rounded-[2px] transition-colors duration-500"
        style={{
          backgroundColor: loading
            ? "#ebedf0"
            : hasContribution
            ? colorScale(count)
            : "#ebedf0",
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

const GithubGraph: React.FC = () => {
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get start date (last Sunday) - moved up since we need it for both states
  const endDate = new Date();
  const startDate = new Date(endDate);
  startDate.setDate(endDate.getDate() - 365);

  // Adjust to previous Sunday
  const currentDay = startDate.getDay();
  startDate.setDate(startDate.getDate() - currentDay);

  // Create array of dates
  const dates: Date[] = [];
  const currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  // Group into weeks starting from Sunday
  const weeks: Date[][] = [];
  for (let i = 0; i < dates.length; i += DAYS_IN_WEEK) {
    weeks.push(dates.slice(i, i + DAYS_IN_WEEK));
  }

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("/api/github-contributions");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setContributions(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch contributions:", error);
        setError(
          "Failed to load GitHub contributions. Please try again later."
        );
        setContributions([]);
      } finally {
        setTimeout(() => setLoading(false), 500);
      }
    };

    fetchContributions();
  }, []);

  if (error) {
    return (
      <div className="p-4 flex items-center justify-center h-[200px]">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  const maxContributions = Math.max(
    ...contributions.map((contribution) => contribution.contribution_count),
    1
  );
  const colorScale = d3
    .scaleLinear<string>()
    .domain([0.1, maxContributions])
    .range(["#9be9a8", "#216e39"])
    .clamp(true);

  return (
    <div className="p-4">
      <table className="w-full border-spacing-2">
        <tbody>
          {weeks[0].map((_, dayIndex) => (
            <tr key={dayIndex} className="h-[12px]">
              {weeks.map((week, weekIndex) => {
                const date = week[dayIndex];
                if (!date) return null;

                const contribution = contributions.find(
                  (contribution) =>
                    normalizeDate(contribution.date) === normalizeDate(date)
                );

                return (
                  <Cell
                    key={`${weekIndex}-${dayIndex}`}
                    loading={loading}
                    date={date}
                    contribution={contribution}
                    delay={(weekIndex * 7 + dayIndex) * 20}
                    colorScale={colorScale}
                  />
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GithubGraph;
