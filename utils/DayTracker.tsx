export class DayTracker {
  dates: Date[] = [];

  constructor() {
    this.dates = this.createDateArray();
  }

  createDateArray(): Date[] {
    // create a day array for the current month
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = [];

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  }

  getDayColor(day: Date) {
    // render a special color if today
    const today = new Date();
    if (day.toDateString() === today.toDateString()) {
      return "rgb(0, 255, 0)";
    }
    return "rgb(135, 135, 135)";
  }
}
