"use client";

import { Layout } from "../../components/Layout";
import ActivityGraph from "../../components/ActivityTracker/ActivityGraph";

export default function ActivitiesPage() {
  return (
    <Layout>
      <div>
        <div>
          {/* ACTIVITY TRACKER */}
          <ActivityGraph />
        </div>
      </div>
    </Layout>
  );
}
