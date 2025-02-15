"use client";
import React, { useEffect, useState } from "react";
import * as d3 from "d3";

interface Activity {
  id: number;
  start_date: string;
  distance: number;
}

interface CellProps {
  loading: boolean;
  date: Date;
  activity?: Activity;
  delay: number;
  colorScale: d3.ScaleLinear<string, string>;
}

const Cell: React.FC<CellProps> = ({
  loading,
  date,
  activity,
  delay,
  colorScale,
}) => {
  const hasActivity = !!activity;
  const distance = activity?.distance || 0;
  const distanceLabel = distance
    ? distance > 1000
      ? `${(distance / 1000).toFixed(1)} km`
      : `${distance} m`
    : "";

  return (
    <td
      className="hover:scale-110 transition-transform duration-200 ease-in-out"
      title={date.toLocaleDateString() + " " + distanceLabel}
    >
      <div
        className="w-[10px] h-[10px] rounded-[2px] transition-colors duration-500"
        style={{
          backgroundColor: loading
            ? "#ebedf0"
            : hasActivity
            ? colorScale(distance)
            : "#ebedf0",
          animation: loading ? `shimmer 1.5s infinite ${delay}ms` : "none",
        }}
      />
    </td>
  );
};

const ShimmerCell: React.FC<{ delay: number }> = ({ delay }) => (
  <td className="relative">
    <div
      className="w-[10px] h-[10px] rounded-[2px] bg-gray-200"
      style={{
        animation: `shimmer 1.5s infinite ${delay}ms`,
      }}
    />
  </td>
);

const ShimmerGraph: React.FC = () => {
  const weeks = Array(52).fill(0); // One year of weeks
  const days = Array(7).fill(0);
  const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Calculate month labels similar to the main component
  const endDate = new Date();
  const startDate = new Date(endDate);
  startDate.setDate(endDate.getDate() - 365);
  startDate.setDate(startDate.getDate() - startDate.getDay()); // Adjust to previous Sunday

  const dates: Date[] = [];
  const currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  // Group into weeks
  const weekDates: Date[][] = [];
  for (let i = 0; i < dates.length; i += 7) {
    weekDates.push(dates.slice(i, i + 7));
  }

  // Get month labels with their week counts
  const monthsData = weekDates.reduce(
    (acc: { month: string; weekCount: number }[], week, index) => {
      const month = week[0].toLocaleString("default", { month: "short" });
      if (
        index === 0 ||
        weekDates[index - 1][0].getMonth() !== week[0].getMonth()
      ) {
        acc.push({ month, weekCount: 1 });
      } else {
        acc[acc.length - 1].weekCount++;
      }
      return acc;
    },
    []
  );

  const cellWidth = 10;
  const gapWidth = 2;

  return (
    <div className="p-4">
      <div className="flex ml-[34px] mb-1">
        {monthsData.map(({ month, weekCount }, index) => {
          const width = weekCount * (cellWidth + gapWidth) - gapWidth;
          return (
            <div
              key={`${month}-${index}`}
              className="text-gray-400 text-xs min-w-6 text-center whitespace-nowrap overflow-hidden text-ellipsis"
              style={{
                width: `${width}px`,
                animation: `shimmer 1.5s infinite ${index * 100}ms`,
              }}
            >
              {month}
            </div>
          );
        })}
      </div>
      <table className="w-full border-spacing-2">
        <tbody>
          {days.map((_, dayIndex) => (
            <tr key={dayIndex}>
              <td className="w-[30px] pr-1">
                <div className="text-gray-400 text-xs text-right">
                  {[1, 3, 5].includes(dayIndex) ? dayLabels[dayIndex] : ""}
                </div>
              </td>
              {weeks.map((_, weekIndex) => (
                <ShimmerCell
                  key={`${weekIndex}-${dayIndex}`}
                  delay={(weekIndex * 7 + dayIndex) * 20}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const ActivityGraph: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get start date (last Sunday) - moved up since we need it for both states
  const endDate = new Date();
  const startDate = new Date(endDate);
  startDate.setDate(endDate.getDate() - 365);
  // Adjust to previous Sunday
  startDate.setDate(startDate.getDate() - startDate.getDay());

  // Create array of dates
  const dates: Date[] = [];
  const currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  // Group into weeks
  const weeks: Date[][] = [];
  for (let i = 0; i < dates.length; i += 7) {
    weeks.push(dates.slice(i, i + 7));
  }

  // Get month labels with their week counts
  const monthsData = weeks.reduce(
    (acc: { month: string; weekCount: number }[], week, index) => {
      const month = week[0].toLocaleString("default", { month: "short" });
      if (
        index === 0 ||
        weeks[index - 1][0].getMonth() !== week[0].getMonth()
      ) {
        acc.push({ month, weekCount: 1 });
      } else {
        acc[acc.length - 1].weekCount++;
      }
      return acc;
    },
    []
  );

  const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const cellWidth = 10;
  const gapWidth = 2;

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("/api/activities", {
          headers: { access_token: "123" },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setActivities(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch activities:", error);
        setError("Failed to load activities. Please try again later.");
        setActivities([]);
      } finally {
        // Add a small delay before removing loading state to ensure smooth transition
        setTimeout(() => setLoading(false), 500);
      }
    };

    fetchActivities();
  }, []);

  if (loading) {
    return <ShimmerGraph />;
  }

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
  const colorScale = d3
    .scaleLinear<string>()
    .domain([0.1, maxDistance])
    .range(["#9bbde9", "#214e6e"])
    .clamp(true);

  return (
    <div className="p-4">
      <div className="flex ml-[34px] mb-1">
        {monthsData.map(({ month, weekCount }, index) => {
          const width = weekCount * (cellWidth + gapWidth) - gapWidth;
          return (
            <div
              key={`${month}-${index}`}
              className="text-gray-400 text-xs min-w-6 text-center whitespace-nowrap overflow-hidden text-ellipsis"
              style={{ width: `${width}px` }}
            >
              {month}
            </div>
          );
        })}
      </div>
      <table className="w-full border-spacing-2">
        <tbody>
          {weeks[0].map((_, dayIndex) => (
            <tr key={dayIndex}>
              <td className="w-[30px] pr-1">
                <div className="text-gray-400 text-xs text-right">
                  {[1, 3, 5].includes(dayIndex) ? dayLabels[dayIndex] : ""}
                </div>
              </td>
              {weeks.map((week, weekIndex) => {
                const date = week[dayIndex];
                if (!date) return null;

                const activity = activities.find(
                  (activity) =>
                    new Date(activity.start_date).toDateString() ===
                    date.toDateString()
                );

                return (
                  <Cell
                    key={`${weekIndex}-${dayIndex}`}
                    loading={loading}
                    date={date}
                    activity={activity}
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

export default ActivityGraph;
