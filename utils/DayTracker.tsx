import {
  isToday,
  isSameDay,
  addDays,
  addMonths,
  subMonths,
  nextMonday,
  differenceInCalendarDays,
  isEqual,
} from "date-fns";
import { StravaAdapter } from "./StravaAdapter";

export class DayTracker {
  dates: Date[] = [];
  activities: any[] = [];

  constructor(monthsAfter: number, monthsBefore: number) {
    this.dates = this.createDateArray(monthsAfter, monthsBefore);
  }

  createDateArray(monthsAfter: number, monthsBefore: number): Date[] {
    // create a day array for the current month
    const date = new Date();
    const startDate = nextMonday(subMonths(date, monthsBefore));
    const lastDate = addMonths(date, monthsAfter);
    const numberOfDaysToMake = differenceInCalendarDays(lastDate, startDate);
    const days = [];

    for (let i = 0; i <= numberOfDaysToMake; i++) {
      days.push(addDays(startDate, i));
    }

    return days;
  }

  getDayColor(day: Date) {
    // if there is an activity on this day, return a color
    const activity = this.activities.find((a) => {
      // see if the current date is the same as the activity date
      return isSameDay(a.start_date, day);
    });

    if (activity) {
      return "blue";
    } else {
      return "gray";
    }
  }

  async transformDaysToActivities(startDate: Date) {
    this.activities = await StravaAdapter.getStravaData(startDate);

    this.activities = this.activities.map((a: any) => {
      return {
        ...a,
        start_date: new Date(a.start_date),
      };
    });
    console.log(this.activities);
  }
}
