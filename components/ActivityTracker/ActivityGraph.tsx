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

const getDateFromDiff = (diff: number) => {
  const today = new Date();
  const date = new Date(today.getFullYear(), 0, 1);
  date.setDate(date.getDate() + diff);
  return date;
};

function isLeapYear(date: Date) {
  const year = date.getFullYear();
  return year % 4 === 0
    ? year % 100 === 0
      ? year % 400 === 0
        ? true
        : false
      : true
    : false;
}

/**
 *
 * @param date the date to compute from
 * @param weekAgo the week number
 * @param dayOfWeek
 * @returns
 */
const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function lastDayOfMonth(monthIdx: number, leapYear = false) {
  if (monthIdx == 1 && leapYear) {
    return 29;
  }
  return monthDays[monthIdx];
}
const computeDateFromDiff = (date: Date, diff: number): Date => {
  console.assert(diff < 0);

  if (diff > date.getDate()) {
    let newMonth = date.getMonth() - 1;
    let newYear = date.getFullYear();
    if (date.getMonth() == 0) {
      newMonth = 11;
      newYear--;
    }
    return computeDateFromDiff(
      new Date(newYear, newMonth, lastDayOfMonth(newMonth, isLeapYear(date))),
      diff - date.getDate()
    );
  } else {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - diff);
  }
};

const ActivityGraph: React.FC<ActivityGraphProps> = ({ activities }) => {
  const today = new Date();

  const activityDays = activities.map(
    (activity) => new Date(activity.start_date)
  );

  const tableRows = [];
  for (let day = 0; day < 7; day++) {
    const cells = [];
    for (let week = 0; week < 52; week++) {
      const dayOffset = today.getDay() - day;
      if (week === 0 && dayOffset < 0) {
        continue;
      }
      const dayDiff = week * 7 + dayOffset;
      const cellDay = computeDateFromDiff(today, dayDiff);
      const matchingActivityDays = activityDays.filter(
        (ad) => ad.toDateString() == cellDay.toDateString()
      );

      cells.unshift(
        <td
          key={week}
          title={cellDay.toDateString()}
          style={{
            backgroundColor:
              matchingActivityDays.length > 0 ? "orange" : "gray",
            borderRadius: "2px",

            width: "10px",
            height: "10px",
          }}
        ></td>
      );
    }
    tableRows.push(<tr key={day}>{cells}</tr>);
  }

  const dateDiffsToTest = [0, 7, 43, 68, 100, 300];

  return (
    <>
      <table>
        <tbody>{tableRows}</tbody>
      </table>
    </>
  );
};

export default ActivityGraph;
