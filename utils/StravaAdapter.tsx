export class StravaAdapter {
  static getStravaData(startDate: Date) {
    return fetch(
      "https://www.strava.com/api/v3/athlete/activities?after=" +
        startDate.getTime() / 1000 +
        "&per_page=100",
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAVA_API_KEY}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return data;
      });
  }
}
