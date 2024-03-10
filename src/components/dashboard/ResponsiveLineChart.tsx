import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  Legend,
} from "recharts";
import { ChartTooltip } from "../../components/dashboard/ChartTooltip";
import { IChartDatum } from "../../interfaces";

type TResponsiveAreaChartProps = {
  kpi: string;
  line1: IChartDatum[];
  line2: IChartDatum[];
  colors: {
    stroke: string;
    fill: string;
  };
};

export const ResponsiveLineChart = ({
  kpi,
  line1,
  line2,
  colors,
}: TResponsiveAreaChartProps) => {

  return (
    <ResponsiveContainer height={400}>
      <LineChart
        data={line1}
        height={400}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="0 0 0" />
        <XAxis
          dataKey="date"
          tickCount={line1?.length ?? 0}
          tick={{
            stroke: "light-grey",
            strokeWidth: 0.5,
            fontSize: "12px",
          }}
        />
        <YAxis
          tickCount={13}
          tick={{
            stroke: "light-grey",
            strokeWidth: 0.5,
            fontSize: "12px",
          }}
          interval="preserveStartEnd"
          domain={[0, "dataMax + 10"]}
        />
        <Tooltip
          content={<ChartTooltip kpi={kpi} colors={colors} />}
          wrapperStyle={{
            backgroundColor: "rgb(255, 255, 255, 0.9)",
            border: "0px solid white",
            borderRadius: "10px",
          }}
        />
        <Legend verticalAlign="bottom" align="right" height={36} />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#8884d8"
          strokeDasharray="6 1"
          name={`${line1[0].date} - ${line1[line1.length-1].date}`}
        />
        <Line
          type="monotone"
          data={line2}
          dataKey="value"
          stroke="#82ca9d"
          name={`${line2[0].date} - ${line1[line2.length-1].date}`}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
