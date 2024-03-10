import React, { useMemo } from "react";
import { CrudFilter, useList } from "@refinedev/core";
import dayjs from "dayjs";
import Stats from "../../components/dashboard/Stats";
import { ResponsiveAreaChart } from "../../components/dashboard/ResponsiveAreaChart";
import { ResponsiveBarChart } from "../../components/dashboard/ResponsiveBarChart";
import { ResponsiveLineChart } from "../../components/dashboard/ResponsiveLineChart";
import { TabView } from "../../components/dashboard/TabView";
import { AccordionView } from "../../components/dashboard/AccordionView";
import { RecentSales } from "../../components/dashboard/RecentSales";
import { IChartDatum, TTab, AAccordion } from "../../interfaces";

const filters: CrudFilter[] = [
  {
    field: "start",
    operator: "eq",
    value: dayjs()?.subtract(60, "days")?.startOf("day"),
  },
  {
    field: "end",
    operator: "eq",
    value: dayjs().startOf("day"),
  },
];

export const Dashboard: React.FC = () => {
  const { data: dailyRevenue } = useList<IChartDatum>({
    resource: "dailyRevenue",
    filters,
  });

  const { data: dailyOrders } = useList<IChartDatum>({
    resource: "dailyOrders",
    filters,
  });

  const { data: newCustomers } = useList<IChartDatum>({
    resource: "newCustomers",
    filters,
  });

  const useMemoizedChartData = (d: any) => {
    return useMemo(() => {
      return d?.data?.data?.map((item: IChartDatum) => ({
        date: new Intl.DateTimeFormat("en-US", {
          month: "short",
          year: "numeric",
          day: "numeric",
        }).format(new Date(item.date)),
        value: item?.value,
      }));
    }, [d]);
  };

  const memoizedRevenueData = useMemoizedChartData(dailyRevenue);
  const memoizedOrdersData = useMemoizedChartData(dailyOrders);
  const memoizedNewCustomersData = useMemoizedChartData(newCustomers);

  const currentYear ={data:{data: [
    { date: '2023-03-01T00:00:00.000Z', value: 1200 },
    { date: '2023-04-01T00:00:00.000Z', value: 1400 },
    { date: '2023-05-01T00:00:00.000Z', value: 1600 },
    { date: '2023-06-01T00:00:00.000Z', value: 1800 },
    { date: '2023-07-01T00:00:00.000Z', value: 1700 },
    { date: '2023-08-01T00:00:00.000Z', value: 2200 },
    { date: '2023-09-01T00:00:00.000Z', value: 1900 },
    { date: '2023-10-01T00:00:00.000Z', value: 2300 },
    { date: '2023-11-01T00:00:00.000Z', value: 2200 },
    { date: '2023-12-01T00:00:00.000Z', value: 2100 }
  ]}}

  const previousYear ={data:{data:  [
    { date: '2022-03-01T00:00:00.000Z', value: 1100 },
    { date: '2022-04-01T00:00:00.000Z', value: 1200 },
    { date: '2022-05-01T00:00:00.000Z', value: 1400 },
    { date: '2022-06-01T00:00:00.000Z', value: 1600 },
    { date: '2022-07-01T00:00:00.000Z', value: 1800 },
    { date: '2022-08-01T00:00:00.000Z', value: 2000 },
    { date: '2022-09-01T00:00:00.000Z', value: 1800 },
    { date: '2022-10-01T00:00:00.000Z', value: 1900 },
    { date: '2022-11-01T00:00:00.000Z', value: 2000 },
    { date: '2022-12-01T00:00:00.000Z', value: 2400 }
  ]}}

  const memoizedCurrentYear = useMemoizedChartData(currentYear)
  const memoizedPreviousYear = useMemoizedChartData(previousYear)

  const tabs: TTab[] = [
    {
      id: 1,
      label: "Daily Revenue",
      content: (
        <ResponsiveAreaChart
          kpi="Daily revenue"
          data={memoizedRevenueData}
          colors={{
            stroke: "rgb(54, 162, 235)",
            fill: "rgba(54, 162, 235, 0.2)",
          }}
        />
      ),
    },
    {
      id: 2,
      label: "Daily Orders",
      content: (
        <ResponsiveBarChart
          kpi="Daily orders"
          data={memoizedOrdersData}
          colors={{
            stroke: "rgb(255, 159, 64)",
            fill: "rgba(255, 159, 64, 0.7)",
          }}
        />
      ),
    },
    {
      id: 3,
      label: "New Customers",
      content: (
        <ResponsiveAreaChart
          kpi="New customers"
          data={memoizedNewCustomersData}
          colors={{
            stroke: "rgb(76, 175, 80)",
            fill: "rgba(54, 162, 235, 0.2)",
          }}
        />
      ),
    },
  ];

  const accordions: AAccordion[] = [
    {
      id: 1,
      content: (
        <ResponsiveLineChart
          kpi="Daily revenue"
          line1={memoizedCurrentYear}
          line2={memoizedPreviousYear}
          colors={{
            stroke: "rgb(54, 162, 235)",
            fill: "rgba(54, 162, 235, 0.2)",
          }}
        />
      ),
      isOpen: false,
    },
  ]

  return (
    <>
      <Stats
        dailyRevenue={dailyRevenue}
        dailyOrders={dailyOrders}
        newCustomers={newCustomers}
      />
      {/* <TabView tabs={tabs} /> */}
      <AccordionView accordions={accordions} />
      {/* <RecentSales /> */}
    </>
  );
};
