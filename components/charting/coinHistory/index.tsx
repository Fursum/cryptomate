import { CandleChartResult } from "binance-api-node";
import { FunctionComponent, useEffect, useState } from "react";
import useSWR from "swr";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  ChartData,
  ScatterDataPoint,
} from "chart.js";
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, [Tooltip]);

import styles from "./coinHistory.module.css";
import IntervalButtons from "./intervalButtons";

interface Props {
  baseSymbol: string;
  convertedSymbol: string;
}

const fetcher = (...args: [RequestInfo, RequestInit]) =>
  fetch(...args).then((res) => {
    if (res.status == 200) return res.json();
    throw new Error("This exchange does not exist.");
  });

const ChartDisplay: FunctionComponent<Props> = ({ baseSymbol, convertedSymbol }) => {
  const [interval, setInterval] = useState("5m");
  const queryURL = `/api/chart/${baseSymbol}/${convertedSymbol}/${interval}`;
  const { data, error } = useSWR<CandleChartResult[], Error>(queryURL, fetcher);

  //Update data
  const chartData = {
    labels: data?.map((e) => {
      const date = new Date(e.closeTime);
      return `${interval != "5m" && interval != "15m" ? `${date.toLocaleDateString()} ` : ""}${
        interval != "1w" && interval != "1M" ? date.toLocaleTimeString() : ""
      }`;
    }),
    datasets: [
      {
        label: "Closed at",
        data: data?.map((e) => Number(e.close)),
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
      {
        label: "Highest",
        data: data?.map((e) => Number(e.high)),
        fill: true,
        backgroundColor: "rgba(31, 207, 84, 0.2)",
        borderColor: "rgba(31, 207, 84, 1)",
      },
      {
        label: "Lowest",
        data: data?.map((e) => Number(e.low)),
        fill: true,
        backgroundColor: "rgba(248, 40, 44, 0.2)",
        borderColor: "rgba(248, 40, 44, 1)",
      },
    ],
  };

  const ChartComponent = (
    <Line
      data={chartData}
      options={{
        scales: {
          xAxis: {
            display: false,
            grid: { display: false },
          },
          yAxis: {
            grid: { display: false },
          },
        },
        elements: {
          line: { tension: 0.05 },
          point: {
            radius: 0,
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            position: "nearest",
            axis: "x",
            mode: "nearest",
            intersect: false,
          },
        },
      }}
    />
  );

  const ErrorContent = (
    <div className="error">Error: {error?.message || "Error message does not exist."}</div>
  );
  const Content = (
    <div className={styles.chartWrapper}>
      <h3>Price History</h3>
      {ChartComponent}
      <IntervalButtons active={interval} setState={setInterval} />
    </div>
  );

  return error ? ErrorContent : Content;
};

export default ChartDisplay;
