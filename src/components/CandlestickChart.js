import { React, useState, useEffect, useContext } from "react";
import { mockProductCandle } from "../constants/mock";
import Card from "./Card";
import ReactApexChart from "react-apexcharts";
import {
  convertUnixTimestampToDate,
  convertDateToUnixTimestamp,
  createDate,
} from "../helpers/date-helpers";
import { chartConfig } from "../constants/config";
import ChartFilter from "./ChartFilter";
import { getProductCandles } from "../api/stock-api";
import StockContext from "../context/StockContext";

const CandlestickChart = () => {
  const [data, setData] = useState(mockProductCandle);
  const [filter, setFilter] = useState("1H");

  // time low high open close volume

  // const formatData = () => {
  //   return data.c;
  // };

  // const { stockSymbol } = useContext(StockContext);

  // useEffect(() => {
  //   const getDateRange = () => {
  //     const { hours, days, weeks, months, years } = chartConfig[filter];

  //     const endDate = new Date();
  //     const startDate = createDate(
  //       endDate,
  //       -hours,
  //       -days,
  //       -weeks,
  //       -months,
  //       -years
  //     );

  //     const startTimestamp = convertDateToUnixTimestamp(startDate);
  //     const endTimestamp = convertDateToUnixTimestamp(endDate);
  //     return { startTimestamp, endTimestamp };
  //   };

  //   const updateChartData = async () => {
  //     try {
  //       const { startTimestamp, endTimestamp } = getDateRange();
  //       const granularity = chartConfig[filter].granularity;
  //       const result = await getProductCandles(
  //         stockSymbol,
  //         granularity,
  //         startTimestamp,
  //         endTimestamp
  //       );
  //       setData(result);
  //     } catch (error) {
  //       setData([]);
  //       console.log(error);
  //     }
  //   };
  //   updateChartData();
  // }, [stockSymbol, filter]);

  const options = {
    chart: {
      type: "candlestick",
      // height: 350,
    },
    title: {
      // text: "CandleStick Chart",
      align: "left",
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
