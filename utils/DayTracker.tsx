import {
  isToday,
  addDays,
  addMonths,
  subMonths,
  nextMonday,
  differenceInCalendarDays,
} from "date-fns";

export class DayTracker {
  dates: Date[] = [];

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
    // render a special color if today
    if (isToday(day)) {
      return "rgb(255, 162, 0)";
    }
    return "rgb(135, 135, 135)";
  }

  private getClosestMonday(date: Date) {
    const day = date.getDay();
    const diff = date.getDate() - day + (day == 0 ? -6 : 1);
    return new Date(date.setDate(diff));
  }
}
