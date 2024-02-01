import Image from "next/image";
import { Layout } from "../components/Layout";
import styled from "styled-components";
import { useState } from "react";
import { DayTracker } from "../utils/DayTracker";

// TODO: move this to a singleton
const dayTracker = new DayTracker();

const ArtPage = () => {
  const CURRENT_YEAR = new Date().getFullYear();
  const dates = dayTracker.dates;

  const normalizeIndex = (weekIndex: number, dayIndex: number) => {
    return weekIndex;
  };

  const getColorForDay = (weekIndex: number, dayIndex: number) => {
    const index = normalizeIndex(weekIndex, dayIndex);
    const baseColor = (index * 123456789) % 255;
    const color = `rgb(${baseColor}, ${baseColor % 100}, ${baseColor % 50})`;
    return color;
  };

  const TableRows = () => {
    const rows: JSX.Element[][] = Array.from({ length: 7 }, () => []);

    for (let i = 0; i < dates.length; i++) {
      const date = dates[i];
      const weekIndex = Math.floor(i / 7);
      const dayIndex = i % 7;
      console.log(weekIndex, dayIndex);
      const color = dayTracker.getDayColor(date);

      rows[dayIndex].push(
        <td key={i}>
          <DayDot color={color} />
        </td>
      );
      console.log("rows", rows);
      console.log("rows.len", rows.length);
    }

    return (
      <>
        {rows.map((r) => (
          <tr>{r}</tr>
        ))}
      </>
    );
  };
  return (
    <Layout>
      <div>
        <div>
          {/* ACTIVITY TRACKER */}
          <tbody>
            <TableRows />
          </tbody>
        </div>
      </div>
    </Layout>
  );
};
export default ArtPage;

const DayDot = styled.div`
  height: 10px;
  width: 10px;
  border-radius: 2px;
  background-color: ${(props) => props.color};
`;
