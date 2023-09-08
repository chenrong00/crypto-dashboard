import { React, useState, useEffect } from "react";
import Card from "./Card";
import ReactApexChart from "react-apexcharts";
import {
  convertUnixTimestampToDate,
  convertDateToUnixTimestamp,
  createDate,
} from "../helpers/date-helpers";
import { chartConfig } from "../constants/config";
import ChartFilter from "./ChartFilter";

const CandlestickChart = ({ product_id }) => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("1H");

  useEffect(() => {
    const getDateRange = () => {
      const { hours, days, weeks, months, years } = chartConfig[filter];

      const endDate = new Date();
      const startDate = createDate(
        endDate,
        -hours,
        -days,
        -weeks,
        -months,
        -years
      );

      const startTimestamp = convertDateToUnixTimestamp(startDate);
      const endTimestamp = convertDateToUnixTimestamp(endDate);
      return { startTimestamp, endTimestamp };
    };

    const updateChartData = async () => {
      try {
        const { startTimestamp, endTimestamp } = getDateRange();
        const granularity = chartConfig[filter].granularity;
        const url = `http://127.0.0.1:5000/trade_pairs/candles?product_id=${product_id}&granularity=${granularity}&start=${startTimestamp}&end=${endTimestamp}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        setData([]);
        console.log(error);
      }
    };
    updateChartData();
  }, [product_id, filter]);

  const options = {
    chart: {
      type: "candlestick",
      // height: 350,
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
    plotOptions: {
      candlestick: {
        wick: {
          useFillColor: true,
        },
        body: {
          strokeWidth: 2,
          useFillColor: true,
        },
      },
    },
  };

  const series = [
    {
      data: data.map((item) => ({
        x: convertUnixTimestampToDate(item[0]),
        y: [item[3], item[2], item[1], item[4]],
      })),
    },
  ];

  return (
    <div id="chart">
      <Card>
        <ul className="flex absolute top-2 left-2 z-40">
          {Object.keys(chartConfig).map((item) => {
            return (
              <li key={item}>
                <ChartFilter
                  text={item}
                  active={filter === item}
                  onClick={() => setFilter(item)}
                />
              </li>
            );
          })}
        </ul>
        <ReactApexChart
          options={options}
          series={series}
          type="candlestick"
          height={350}
        />
      </Card>
    </div>
  );
};

export default CandlestickChart;
