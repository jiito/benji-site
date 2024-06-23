import Image from "next/image";
import { Layout } from "../components/Layout";
import styled from "styled-components";
import { useEffect, useLayoutEffect, useState } from "react";
import { DayTracker } from "../utils/DayTracker";
import { subDays } from "date-fns";
import ActivityGraph from "../components/ActivityTracker/ActivityGraph";
import activitiesData from "../data/mockActivites.json";
import { getStravaAdapter } from "../utils/StravaAdapter";

const INDEX_TO_DAY: Record<number, string> = {
  0: "Mon",
  1: "",
  2: "Wed",
  3: "",
  4: "Fri",
  5: "",
  6: "",
};

// TODO: move this to a singleton

const ActivitiesPage = () => {
  return (
    <Layout>
      <div>
        <div>
          {/* ACTIVITY TRACKER */}
          <h4>Biking Tracker</h4>
          <ActivityGraph />
        </div>
      </div>
    </Layout>
  );
};
export default ActivitiesPage;

const DayDot = styled.div`
  height: 12px;
  width: 12px;
  border-radius: 2px;
  background-color: ${(props) => props.color};
`;

const RowTag = styled.span`
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  transform: translateY(-50%);
  margin: 0;
  line-height: 1; // Ensure line-height is not adding extra height
  font-size: 0.5rem;
  white-space: nowrap;
`;

const RowTagContainer = styled.td`
  position: relative;
  height: 10px; // Ensure this matches the height of other cells in the row
  width: 20px;
  padding: 0; // Remove padding that could affect the height
  // Add any additional styles to ensure consistent cell height
`;
