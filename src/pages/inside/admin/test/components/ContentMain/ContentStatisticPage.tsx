// @ts-nocheck
import StatisticAPI from "../../../../../../apis/StatisticAPI";
import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
interface StatisticsDataLine {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    fill: boolean;
    borderColor: string;
  }[];
}

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { get } from "jquery";
ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
interface StatisticsDataBar {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
    borderWidth: number;
  }[];
}

interface StatisticsDataDonut {
  labels: string[];
  datasets: {
    data: number[];
    backgroundColor: string[];
    hoverBackgroundColor: string[];
  }[];
}
function ContentStatisticPage() {
  const [chatGoingAdmin, setChatGoingAdmin] = useState(0);
  const [chatGoingOpenAI, setChatGoingOpenAI] = useState(0);
  const [chatGoingTotal, setChatGoingTotal] = useState(0);
  const [chatEnded, setChatEnded] = useState(0);

  const [incidentReportWaiting, setIncidentReportWaiting] = useState(0);
  const [incidentReportProcessing, setIncidentReportProcessing] = useState(0);
  const [incidentReportDone, setIncidentReportDone] = useState(0);
  const options = {
    indexAxis: "y", // Configure the bar chart to be horizontal
    scales: {
      x: {
        beginAtZero: true,
      },
    },
  };
  const [incidentReportOngoingTotal, setIncidentReportOngoingTotal] =
    useState(0);
  const [getIncidentReportFixed, setGetIncidentReportFixed] = useState(0);
  const [incidentReportByCategory, setIncidentReportByCategory] =
    useState(null);
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const [colorZ, setColorZ] = useState<string[]>([
    getRandomColor(),
    getRandomColor(),
    getRandomColor(),
  ]);
  const [statisticsData, setStatisticsData] = useState<StatisticsDataBar>({
    labels: ["Waiting", "Processing", "Done"],
    datasets: [
      {
        label: "Incident Report",
        data: [0, 0, 0],
        backgroundColor: [colorZ[0], colorZ[1], colorZ[2]],
        borderColor: [colorZ[0], colorZ[1], colorZ[2]],
        borderWidth: 1,
      },
    ],
  });

  const [colorA, setColorA] = useState<string>(getRandomColor());
  const [colorB, setColorB] = useState<string>(getRandomColor());

  const [statisticsDataDonut, setStatisticsDataDonut] =
    useState<StatisticsDataDonut>({
      labels: ["On Progress", "Fixed"],
      datasets: [
        {
          data: [0, 0],
          backgroundColor: [colorA, colorB],
          hoverBackgroundColor: [colorA, colorB],
        },
      ],
    });

  const [statisticsDataPie, setStatisticsDataPie] =
    useState<StatisticsDataDonut>({
      labels: [""],
      datasets: [
        {
          data: [0],
          backgroundColor: ["#36A2EB"],
          hoverBackgroundColor: ["#36A2EB"],
        },
      ],
    });

  const [lineChartData, setLineChartData] = useState<StatisticsDataLine>({
    labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"],
    datasets: [
      {
        label: "Some Data",
        data: [0, 0, 0, 0, 0], // Default values or loading state
        fill: false,
        borderColor: getRandomColor(),
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await StatisticAPI.countChatGoingAdmin();
        setChatGoingAdmin(response);
      } catch (error) {
        console.error("Error fetching chat going admin:", error);
      }
    };

    fetchData();

    const fetchData2 = async () => {
      try {
        const response = await StatisticAPI.countChatGoingOpenAi();
        setChatGoingOpenAI(response);
      } catch (error) {
        console.error("Error fetching chat going open ai:", error);
      }
    };

    fetchData2();

    const fetchData3 = async () => {
      try {
        const response = await StatisticAPI.countGetGoingChat();
        setChatGoingTotal(response);
      } catch (error) {
        console.error("Error fetching chat going total:", error);
      }
    };

    fetchData3();

    const fetchData4 = async () => {
      try {
        const response = await StatisticAPI.countChatEnded();
        setChatEnded(response);
      } catch (error) {
        console.error("Error fetching chat ended:", error);
      }
    };

    fetchData4();

    const fetchData5 = async () => {
      try {
        const response = await StatisticAPI.getIncidentReportWaiting();
        setIncidentReportWaiting(response);
      } catch (error) {
        console.error("Error fetching incident report waiting:", error);
      }
    };

    fetchData5();

    const fetchData6 = async () => {
      try {
        const response = await StatisticAPI.getIncidentReportInProgress();
        setIncidentReportProcessing(response);
      } catch (error) {
        console.error("Error fetching incident report processing:", error);
      }
    };

    fetchData6();

    const fetchData7 = async () => {
      try {
        const response = await StatisticAPI.getIncidentReportFixed();
        setIncidentReportDone(response);
      } catch (error) {
        console.error("Error fetching incident report done:", error);
      }
    };

    fetchData7();

    const fetchData8 = async () => {
      try {
        const response = await StatisticAPI.getIncidentReportStatusInProgress();
        setIncidentReportOngoingTotal(response);
      } catch (error) {
        console.error("Error fetching incident report ongoing total:", error);
      }
    };

    fetchData8();

    const fetchData9 = async () => {
      try {
        const response = await StatisticAPI.getIncidentReportStatusFixed();
        setGetIncidentReportFixed(response);
      } catch (error) {
        console.error("Error fetching incident report fixed:", error);
      }
    };

    fetchData9();

    const fetchData10 = async () => {
      try {
        const response = await StatisticAPI.getIncidentReportByCategory();
        setIncidentReportByCategory(response);
        console.log(response);
      } catch (error) {
        console.error("Error fetching incident report by category:", error);
      }
    };

    fetchData10();
  }, []);
  useEffect(() => {
    const fetchDataForLineChart = async () => {
      try {
        const lineChartDataResponse =
          await StatisticAPI.get5daysIncidentReport();

        const dates = lineChartDataResponse.map((item) => item[0]);
        const counts = lineChartDataResponse.map((item) => item[1]);

        setLineChartData({
          labels: dates,
          datasets: [
            {
              label: "Incident Reports",
              data: counts,
              fill: false,
              borderColor: getRandomColor(),
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching line chart data:", error);
      }
    };

    fetchDataForLineChart();
  }, []);

  useEffect(() => {
    setStatisticsData((prevData) => ({
      ...prevData,
      datasets: [
        {
          ...prevData.datasets[0],
          data: [
            incidentReportWaiting,
            incidentReportProcessing,
            incidentReportDone,
          ],
        },
      ],
    }));
  }, [incidentReportWaiting, incidentReportProcessing, incidentReportDone]);

  useEffect(() => {
    if (incidentReportByCategory) {
      // Transform incidentReportByCategory into separate arrays for labels and data
      const labels = incidentReportByCategory.map(([category]) => category);
      const data = incidentReportByCategory.map(([, count]) => count);

      // Generate random colors
      const backgroundColors = Array.from({ length: labels.length }, () =>
        getRandomColor()
      );

      setStatisticsDataPie((prevData) => ({
        ...prevData,
        labels: labels,
        datasets: [
          {
            ...prevData.datasets[0],
            data: data,
            backgroundColor: backgroundColors,
            hoverBackgroundColor: backgroundColors,
          },
        ],
      }));
    }
  }, [incidentReportByCategory]);

  useEffect(() => {
    setStatisticsDataDonut((prevData) => ({
      ...prevData,
      datasets: [
        {
          ...prevData.datasets[0],
          data: [incidentReportOngoingTotal, getIncidentReportFixed],
        },
      ],
    }));
  }, [incidentReportOngoingTotal, getIncidentReportFixed]);
  const [horizontalBar, setHorizontalBar] = useState<StatisticsDataBar>({
    labels: ["Processing", "Done"],
    datasets: [
      {
        label: "Chat Report",
        data: [0, 0],
        backgroundColor: [colorZ[1], colorZ[2]],
        borderColor: [colorZ[1], colorZ[2]],
        borderWidth: 1,
      },
    ],
  });
  useEffect(() => {
    const fetchDataForHorizontalBar = async () => {
      try {
        const goingTotal = await StatisticAPI.countGetGoingChat();
        const endedTotal = await StatisticAPI.countChatEnded();

        const barChartData: StatisticsDataBar = {
          labels: ["Chat Going Total", "Chat Ended"],
          datasets: [
            {
              label: "Chat Report",
              data: [goingTotal, endedTotal],
              backgroundColor: [
                "rgba(255, 99, 132, 0.5)",
                "rgba(75, 192, 192, 0.5)",
              ],
              borderColor: ["rgba(255, 99, 132, 1)", "rgba(75, 192, 192, 1)"],
              borderWidth: 1,
            },
          ],
        };

        setHorizontalBar(barChartData);
      } catch (error) {
        console.error("Error fetching horizontal bar chart data:", error);
      }
    };

    fetchDataForHorizontalBar();
  }, []);
  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-12">
          <h1 className="font-bold">Chat Statistic</h1>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-8">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Chat Report</h5>
              <Bar data={horizontalBar} options={options} />
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="row">
            <div className="col-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Chat Ongoing Admin</h5>
                  <h1 className="card-text text-center font-bold">
                    {chatGoingAdmin}
                  </h1>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Chat Ongoing OpenAI</h5>
                  <h1 className="card-text text-center font-bold">
                    {chatGoingOpenAI}
                  </h1>
                </div>
              </div>
            </div>

            {/* <div className="col-6"></div> */}
          </div>
        </div>
      </div>
      <div className="mt-4 row justify-content-center">
        <div className="col-12">
          <h1 className="font-bold">Incident Report Statistic</h1>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-12 col-xl-8">
          <div className="card mx-auto">
            <p className="mt-1 text-center">Incident Report Status Details</p>
            <Bar data={statisticsData} />
          </div>
        </div>
        <div className="col-12 col-xl-4">
          <div className="card">
            <Doughnut data={statisticsDataDonut} />
            <p className="text-center">Incident Report Status Overall</p>
          </div>
        </div>
      </div>

      <div className="mt-4 row justify-content-center">
        <div className="col-12 col-xl-4">
          <div className="card">
            <Pie data={statisticsDataPie} />
            <p className="text-center">Incident Report per category</p>
          </div>
        </div>
        <div className="col-12 col-xl-8">
          <div className="card">
            <Line
              data={lineChartData}
              options={{
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
            <p className="text-center">Incident Report per day</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContentStatisticPage;
