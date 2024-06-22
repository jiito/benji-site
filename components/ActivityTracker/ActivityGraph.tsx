import React from "react";

interface Activity {
  start_date: string;
}

interface ActivityGraphProps {
  activities: Activity[];
}

const getDayOfYear = (date: Date) => {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff =
    date.getTime() -
    start.getTime() +
    (start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000;
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
};

const getDaysSinceDate = (date: Date) => {
  const today = new Date();
  const diff = today.getTime() - date.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
};

const ActivityGraph: React.FC<ActivityGraphProps> = ({ activities }) => {
  const today = new Date();
  const currentDayOfWeek = today.getDay();
  const daysSinceLastYear = getDaysSinceDate(
    new Date(today.getFullYear() - 1, today.getMonth(), today.getDate())
  );

  const activityDays = activities.map((activity) => {
    const date = new Date(activity.start_date);
    return getDaysSinceDate(date);
  });

  const weeksInYear = Math.ceil(daysSinceLastYear / 7);
  const tableRows = [];
  for (let day = 0; day < 7; day++) {
    const cells = [];
    for (let week = 0; week < weeksInYear; week++) {
      const daySinceLastYear = week * 7 + day;
      const isActive = activityDays.includes(daySinceLastYear);
      const isToday = daySinceLastYear === 0 && day === currentDayOfWeek;
      const date = new Date(today.getFullYear(), 0, 1);
      date.setDate(date.getDate() + daySinceLastYear);
      const tooltip = date.toDateString();
      // Only display up to the current day of the week for the last week
      if (week === weeksInYear - 1 && day > currentDayOfWeek) {
        break;
      }
      cells.unshift(
        <td
          key={week}
          title={tooltip}
          style={{
            backgroundColor: isToday ? "blue" : isActive ? "red" : "gray",
            width: "10px",
            height: "10px",
          }}
        ></td>
      );
    }
    tableRows.push(<tr key={day}>{cells}</tr>);
  }

  return (
    <table>
      <tbody>{tableRows}</tbody>
    </table>
  );
};

export default ActivityGraph;
