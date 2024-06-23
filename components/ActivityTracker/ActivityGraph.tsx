import React, { useEffect, useState } from "react";
import { getStravaAdapter } from "../../utils/StravaAdapter";

interface Activity {
  start_date: string;
}

interface ActivityGraphProps {
  activities: Activity[];
}

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
  // console.assert(diff < 0);

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

const ActivityGraph: React.FC<ActivityGraphProps> = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const fetchActivities = async () => {
    setLoading(true);
    let activities: Activity[] = [];
    activities = await getStravaAdapter().getActivitiesPage(1);
    activities = activities.concat(
      await getStravaAdapter().getActivitiesPage(2)
    );
    activities = activities.concat(
      await getStravaAdapter().getActivitiesPage(3)
    );

    // if (
    //   activities.sort((a, b) => new Date(a.start_date) > new Date(b.start_date))[0] <
    // )
    setActivities(activities);
    setLoading(false);
  };
  useEffect(() => {
    fetchActivities();
  }, []);
  const today = new Date();

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
      console.log(cellDay, activities);
      const matchingActivityDays = activities.filter(
        (ad) => new Date(ad.start_date).toDateString() == cellDay.toDateString()
      );
      console.log(matchingActivityDays);

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

  return (
    <>
      {loading ? <div>Loading...</div> : null}
      <table>
        <tbody>{tableRows}</tbody>
      </table>
    </>
  );
};

export default ActivityGraph;
