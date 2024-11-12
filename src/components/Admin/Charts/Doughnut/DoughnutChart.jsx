import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "./doughnut.css";
import fetchWithAuth from "../../../../utils/authFetch";

ChartJS.register(ArcElement, Tooltip, Legend);

function getYearsArray(startYear) {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let year = startYear; year <= currentYear; year++) {
    years.push(year);
  }
  return years;
}

function getMonthsArray() {
  return Array.from({ length: 12 }, (_, i) => i + 1);
}

function getDaysArray(year, month) {
  if (year && month) {
    const daysInMonth = new Date(year, month, 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => i + 1);
  }
  return [];
}

const shortenName = (name, maxLength = 15) => {
  return name.length > maxLength ? `${name.substring(0, maxLength)}...` : name;
};

const years = getYearsArray(2000);
const months = getMonthsArray();

function DoughnutChart() {
  const [selectedYear, setSelectedYear] = useState(2024);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [noData, setNoData] = useState(false);

  const days = getDaysArray(selectedYear, selectedMonth);

  const fetchData = async () => {
    try {
      let url = `http://localhost:3001/products/top-selling?year=${selectedYear}`;
      if (selectedMonth !== null) url += `&month=${selectedMonth}`;
      if (selectedDay !== null) url += `&day=${selectedDay}`;

      const { data } = await fetchWithAuth(
        "/login",
        url
      );

      if (data.length === 0) {
        setNoData(true);
        setChartData({ labels: [], datasets: [] });
      } else {
        setNoData(false);
        const labels = data.map((item) => shortenName(item.Name));
        const quantities = data.map((item) => item.TotalQuantitySold);

        setChartData({
          labels,
          datasets: [
            {
              label: `Top Products for ${selectedYear}-${selectedMonth || "all"}-${selectedDay || "all"}`,
              data: quantities,
              backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#4BC0C0",
                "#9966FF",
              ],
              hoverBackgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#4BC0C0",
                "#9966FF",
              ],
            },
          ],
        });
      }
    } catch (err) {
      console.error("Failed to fetch data", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedYear, selectedMonth, selectedDay]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (tooltipItem) {
            const index = tooltipItem.dataIndex;
            const label = chartData.labels[index];
            const value = chartData.datasets[0].data[index];
            return `${label}: ${value}`;
          },
        },
      },
    },
  };

  return (
    <div className="doughnut" style={{ width: "400px", height: "400px" }}>
      <select
        value={selectedYear}
        onChange={(e) => setSelectedYear(parseInt(e.target.value))}
      >
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>

      <select
        value={selectedMonth || ""}
        onChange={(e) =>
          setSelectedMonth(e.target.value ? parseInt(e.target.value) : null)
        }
      >
        <option value="">All Months</option>
        {months.map((month) => (
          <option key={month} value={month}>
            {month}
          </option>
        ))}
      </select>

      <select
        value={selectedDay || ""}
        onChange={(e) =>
          setSelectedDay(e.target.value ? parseInt(e.target.value) : null)
        }
        disabled={!selectedMonth}
      >
        <option value="">All Days</option>
        {days.map((day) => (
          <option key={day} value={day}>
            {day}
          </option>
        ))}
      </select>

      {noData ? (
        <p>Không có dữ liệu cho thời gian đã chọn</p>
      ) : (
        <Doughnut data={chartData} options={options} />
      )}
    </div>
  );
}

export default DoughnutChart;
