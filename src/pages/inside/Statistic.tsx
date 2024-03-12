import React, { useEffect, useState } from "react";
import NavbarInside from "../../components/inside/navbar/NavbarInside";
import { Doughnut } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
// import faker from "faker";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
interface StatisticsData {
  labels: string[];
  datasets: {
    data: number[];
    backgroundColor: string[];
    hoverBackgroundColor: string[];
  }[];
}

export const options = {
  indexAxis: "y" as const,
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: "right" as const,
    },
    title: {
      display: true,
      text: "Chart.js Horizontal Bar Chart",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: [65, 59, 80, 81, 56, 55, 40],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: [28, 48, 40, 19, 86, 27, 90],
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};
interface StatisticsData2 {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
    borderWidth: number;
  }[];
}

function Statistic() {
  const [statisticsData, setStatisticsData] = useState<StatisticsData>({
    labels: ["Helped", "Not Helped"],
    datasets: [
      {
        data: [70, 30], // Example data (replace with your actual data)
        backgroundColor: ["#36A2EB", "#FF6384"], // Example colors
        hoverBackgroundColor: ["#36A2EB", "#FF6384"],
      },
    ],
  });

  const [statisticsData2, setStatisticsData2] = useState<StatisticsData2>({
    labels: ["Category 1", "Category 2", "Category 3", "Category 4"],
    datasets: [
      {
        label: "Data Set 1",
        data: [20, 35, 45, 30], // Example data (replace with your actual data)
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
        ],
        borderWidth: 1,
      },
      // Add more datasets if needed
    ],
  });
  return (
    <div>
      <div className="color-background min-h-screen">
        <NavbarInside>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 text-center">
                <h1 className="text-3xl font-bold">Statistic</h1>
                <Doughnut data={statisticsData} />
                <Bar data={statisticsData2} />
                <Bar options={options} data={data} />
              </div>
            </div>
          </div>
        </NavbarInside>
      </div>
    </div>
  );
}

export default Statistic;
