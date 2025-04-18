declare module '../components/Chart' {
  export interface ChartProps {
    title: string;
  }
  const Chart: React.FC<ChartProps>;
  export default Chart;
}

declare module '../components/Card' {
  export interface CardProps {
    title: string;
    value: string;
  }
  const Card: React.FC<CardProps>;
  export default Card;
}
