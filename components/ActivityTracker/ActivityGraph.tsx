import React, { useEffect, useState } from "react";
import styled from "styled-components";

interface Activity {
  id: number;
  start_date: string;
  distance: number;
}

interface StyledDivProps extends React.HTMLAttributes<HTMLDivElement> {
  $active?: boolean;
  $width?: string;
}

const Cell = styled.td<StyledDivProps>`
  /* padding: 2px; */
  &:hover {
    transform: scale(1.1);
    transition: transform 0.2s ease-in-out;
  }
`;

const CellBlock = styled.div<StyledDivProps>`
  width: 10px;
  height: 10px;
  background-color: ${(props) => (props.$active ? "#22c55e" : "#e5e7eb")};
  border-radius: 2px;
`;

const TableBody = styled.tbody<StyledDivProps>`
  width: 100%;
  border-spacing: 3px;
`;

const Row = styled.tr<StyledDivProps>`
  height: 10px;
`;

const DayLabel = styled.div<React.HTMLAttributes<HTMLDivElement>>`
  color: #9ca3af;
  font-size: 12px;
  width: 30px;
  text-align: right;
  margin-right: 4px;
  height: 10px;
`;

const MonthsContainer = styled.div<React.HTMLAttributes<HTMLDivElement>>`
  display: flex;
  margin-left: 34px;
  margin-bottom: 8px;
`;

const MonthLabel = styled.div<StyledDivProps>`
  color: #9ca3af;
  font-size: 12px;
  width: ${(props) => props.$width};
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 24px;
`;

const GraphContainer = styled.div<React.HTMLAttributes<HTMLDivElement>>`
  padding: 16px;
`;

const ActivityGraph: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch("/api/activities", {
          headers: { access_token: "123" },
        });
        const data = await response.json();
        setActivities(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch activities:", error);
        setActivities([]);
      }
    };

    fetchActivities();
  }, []);

  // Get start date (last Sunday)
  const endDate = new Date();
  const startDate = new Date(endDate);
  startDate.setDate(endDate.getDate() - 365);
  // Adjust to previous Sunday
  startDate.setDate(startDate.getDate() - startDate.getDay());

  // Create array of dates
  const dates: Date[] = [];
  const currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  // Group into weeks
  const weeks: Date[][] = [];
  for (let i = 0; i < dates.length; i += 7) {
    weeks.push(dates.slice(i, i + 7));
  }

  // Get month labels with their week counts
  const monthsData = weeks.reduce(
    (acc: { month: string; weekCount: number }[], week, index) => {
      const month = week[0].toLocaleString("default", { month: "short" });
      if (
        index === 0 ||
        weeks[index - 1][0].getMonth() !== week[0].getMonth()
      ) {
        acc.push({ month, weekCount: 1 });
      } else {
        acc[acc.length - 1].weekCount++;
      }
      return acc;
    },
    []
  );

  const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const cellWidth = 10; // Width of each cell
  const gapWidth = 2; // Gap between cells

  return (
    <GraphContainer>
      <MonthsContainer>
        {monthsData.map(({ month, weekCount }, index) => {
          const width = weekCount * (cellWidth + gapWidth) - gapWidth;
          return (
            <MonthLabel key={`${month}-${index}`} $width={`${width}px`}>
              {month}
            </MonthLabel>
          );
        })}
      </MonthsContainer>
      <TableBody>
        {[0, 1, 2, 3, 4, 5, 6].map((dayIndex) => (
          <Row key={dayIndex}>
            <DayLabel>{dayLabels[dayIndex]}</DayLabel>
            {weeks.map((week, weekIndex) => {
              const date = week[dayIndex];
              if (!date) return null;

              const hasActivity = activities.some(
                (activity) =>
                  new Date(activity.start_date).toDateString() ===
                  date.toDateString()
              );

              return (
                <Cell
                  key={`${weekIndex}-${dayIndex}`}
                  $active={hasActivity}
                  title={date.toLocaleDateString()}
                >
                  <CellBlock $active={hasActivity} />
                </Cell>
              );
            })}
          </Row>
        ))}
      </TableBody>
    </GraphContainer>
  );
};

export default ActivityGraph;
