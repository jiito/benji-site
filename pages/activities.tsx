import Image from "next/image";
import { Layout } from "../components/Layout";
import styled from "styled-components";
import { useState } from "react";
import { DayTracker } from "../utils/DayTracker";

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
const dayTracker = new DayTracker(3, 3);

const ArtPage = () => {
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
    const rows: JSX.Element[][] = Array.from({ length: 7 }, (_, i) => [
      <RowTagContainer key={`day-${i}`}>
        <RowTag>{INDEX_TO_DAY[i]}</RowTag>
      </RowTagContainer>,
    ]);

    for (let i = 0; i < dates.length; i++) {
      const date = dates[i];
      const weekIndex = Math.floor(i / 7);
      const dayIndex = i % 7;
      const color = dayTracker.getDayColor(date);

      rows[dayIndex].push(
        <td key={i}>
          <DayDot color={color} />
        </td>
      );
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
          <h4>Activity Tracker</h4>
          <p>I bike a lot</p>
          <table>
            <tbody>
              <TableRows />
            </tbody>
          </table>
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
