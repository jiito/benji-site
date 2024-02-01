import Image from "next/image";
import { Layout } from "../components/Layout";
import styled from "styled-components";
import { useState } from "react";
const ArtPage = () => {
  const [days, setDays] = useState(new Array(52 * 7).fill(0));

  const normalizeIndex = (weekIndex: number, dayIndex: number) => {
    return dayIndex;
  };

  const getColorForDay = (weekIndex: number, dayIndex: number) => {
    const index = normalizeIndex(weekIndex, dayIndex);
    const baseColor = (index * 123456789) % 255;
    const color = `rgb(${baseColor}, ${baseColor % 100}, ${baseColor % 50})`;
    return color;
  };

  const TableRows = () => {
    const rows: JSX.Element[] = [];
    for (let i = 0; i < 7; i++) {
      const row = days.slice(i * 52, i * 52 + 52);
      rows.push(
        <tr>
          {row.map((d, dayIndex) => (
            <td>
              <DayDot color={getColorForDay(i, dayIndex)} />
            </td>
          ))}
        </tr>
      );
    }
    return <>{rows}</>;
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
