import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
  loading: () => <div className="h-full w-full flex items-center justify-center">Loading chart...</div>
});

export interface DynamicApexChartProps {
  options: ApexOptions;
  series: any[];
  type: 'line' | 'area' | 'bar' | 'pie' | 'donut' | 'radialBar' | 'scatter' | 'bubble' | 'heatmap' | 'candlestick' | 'boxPlot' | 'radar' | 'polarArea' | 'rangeBar' | 'rangeArea';
  height: string | number;
  width?: string | number;
}

const DynamicApexChart = ({ options, series, type, height, width }: DynamicApexChartProps) => {
  return (
    <ReactApexChart
      options={options}
      series={series}
      type={type}
      height={height}
      width={width}
    />
  );
};

export default DynamicApexChart; 