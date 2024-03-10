import React from "react";
import { formatMonthYear } from "../../utills/helpers";
export const ChartTooltip = ({
  active,
  payload,
  label,
  coordinate,
  colors,
}: // kpi,
any) => {
  if (active && payload && payload.length) {
    const dataPoint1 = payload[0].payload;
    const dataPoint2 = payload[1].payload;
    const date1 = formatMonthYear(new Date(dataPoint1.date));
    const date2 = formatMonthYear(new Date(dataPoint2.date));

    const tooltipStyle = {
      left: coordinate.x, // Adjust positioning
      top: coordinate.y, // Adjust positioning
    };

    return (
      <div
        className="p-2 flex flex-col justify-center items-start border shadow-md border-white rounded-lg"
        style={tooltipStyle}
      >
        <div
          style={{
            position: "absolute",
            width: "0",
            height: "0",
            borderTop: "10px solid transparent",
            borderBottom: "10px solid transparent",
            borderRight: "10px solid rgba(0, 0, 0, 0.7)",
            left: "-10px",
          }}
        />
        <p className="text-xs py-2 px-3">
          {/* <span
            className="mr-1"
            style={{
              width: "0.5px",
              height: "0.5px",
              border: `1px solid ${colors?.stroke}`,
              backgroundColor: colors?.fill,
            }}
          >
            &nbsp;&nbsp;&nbsp;&nbsp;
          </span> */}
          {`${date1} : ${dataPoint1.value}`}
        </p>
        <p className="text-xs py-2 px-3">{`${date2} : ${dataPoint2.value}`}</p>
      </div>
    );
  }

  return null;
};
