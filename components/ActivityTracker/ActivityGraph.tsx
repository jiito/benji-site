'use client'
import React, { useEffect, useState } from "react";

interface Activity {
  id: number;
  start_date: string;
  distance: number;
}

const ActivityGraph: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch("/api/activities", {
          headers: { access_token: "123" },
        });
        const data = await response.json();
        setActivities(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch activities:", error);
        setActivities([]);
      }
    };

    fetchActivities();
  }, []);

  // Get start date (last Sunday)
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
  const cellWidth = 10; // Width of each cell
  const gapWidth = 2; // Gap between cells

  return (
    <div className="p-4">
      <div className="flex ml-[34px] mb-2">
        {monthsData.map(({ month, weekCount }, index) => {
          const width = weekCount * (cellWidth + gapWidth) - gapWidth;
          return (
            <div
              key={`${month}-${index}`}
              className="text-gray-400 text-xs min-w-6 text-left whitespace-nowrap overflow-hidden text-ellipsis"
              style={{ width: `${width}px` }}
            >
              {month}
            </div>
          );
        })}
      </div>
      <table className="w-full border-spacing-2">
        <tbody className="w-full border-spacing-2">
          {[0, 1, 2, 3, 4, 5, 6].map((dayIndex) => (
            <tr key={dayIndex} className="h-[10px] border-spacing-2">
              <div className="text-gray-400 text-xs w-[30px] text-right mr-1 h-[10px]">
                {dayLabels[dayIndex]}
              </div>
              {weeks.map((week, weekIndex) => {
                const date = week[dayIndex];
                if (!date) return null;

                const hasActivity = activities.some(
                  (activity) =>
                    new Date(activity.start_date).toDateString() ===
                    date.toDateString()
                );

                return (
                  <td
                    key={`${weekIndex}-${dayIndex}`}
                    className="hover:scale-110 transition-transform duration-200 ease-in-out"
                    title={date.toLocaleDateString()}
                  >
                    <div
                      className={`w-[10px] h-[10px] rounded-[2px] ${
                        hasActivity ? "bg-green-500" : "bg-gray-200"
                      }`}
                    />
                  </td>
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
