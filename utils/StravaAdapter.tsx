import testData from "../testData.json";

let instance: StravaAdapter | null;
class StravaAdapter {
  access_token: string;

  constructor() {
    this.access_token = process.env.NEXT_PUBLIC_STRAVA_API_KEY || "";
  }

  refeshAccessToken() {
    return;
  }

  getActivitiesPage(page?: number) {
    return fetch(
      `https://www.strava.com/api/v3/athlete/activities?per_page=100${
        page ? `&page=${page}` : ""
      }`,
      {
        headers: {
          Authorization: `Bearer ${this.access_token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch(() => {
        console.log(testData);
        return testData;
      });
  }
}

export function getStravaAdapter() {
  if (instance) return instance;
  else {
    instance = new StravaAdapter();
    return instance;
  }
}
