import { XAxis, YAxis } from 'recharts';

interface ChartAxisProps {
  dataKey?: string;
  orientation?: 'left' | 'right';
}

export function ChartAxis({ dataKey, orientation }: ChartAxisProps) {
  const commonProps = {
    stroke: '#888',
    tick: { fill: '#888' },
    tickLine: { stroke: '#888' },
  };

  if (orientation) {
    return <YAxis {...commonProps} orientation={orientation} />;
  }

  return <XAxis {...commonProps} dataKey={dataKey} />;
}