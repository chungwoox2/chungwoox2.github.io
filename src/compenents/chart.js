import React, { useEffect, useState } from 'react';
import ApexCharts from 'react-apexcharts';

function Chart({ chartData }) {
  const [series, setSeries] = useState([
    {
      name: ' ',
      data: [],
    },
  ]);
  
  const [options, setOptions] = useState({
    chart: {
      zoom: {
        enabled: false,
      },
      events: {
        dataPointMouseEnter: function (event, chartContext, config) {
          const { dataPointIndex, seriesIndex } = config;
          const { categories } = chartContext.config.xaxis;
          const category = categories[dataPointIndex];
          const value = series[seriesIndex].data[dataPointIndex];

          console.log(`Category: ${category}`);
          console.log(`Value: ${value}`);
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    title: {
      text: ' ',
      align: 'left',
    },
    grid: {
      row: {
        colors: ['#f3f3f3f3', 'transparent'],
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: [],
    },
  });

  useEffect(() => {
    updateChartData();
  }, [chartData]);

  const updateChartData = () => {
    if (chartData && chartData.length > 0) {
      const categories = chartData.map((item) => item.date);
      const end = chartData.map((item) => item.close);
      const codeName = chartData[0].code_name;
      /*const start = chartData.map((item) => item.open);
      const low = chartData.map((item) => item.low);
      const high = chartData.map((item) => item.high);
      const volume = chartData.map((item) => item.volume);*/
      const name = chartData[0].code_name;
      setSeries([
        //{ name: '시가', data: start },
        //{ name: '고가', data: high },
        //{ name: '저가', data: low },
        { name: '종가', data: end },
        //{ name: '거래량', data: volume },
      ]);

      setOptions((prevOptions) => ({
        ...prevOptions,
        xaxis: {
          categories: categories,
          tickPlacement: 'on',
          labels: {
            show: false, // 하나의 x축 레이블만 표시하기 위해 레이블 표시를 비활성화합니다.
          },
        },
        title: {
          text: codeName,
          align: 'left',
        },
      }));
    }
  };

  return (
    <div>
      <ApexCharts options={options} series={series} type="line" width={'100%'} height={500} />
    </div>
  );
}

export default Chart;