import { Tooltip } from 'recharts';

export function ChartTooltip() {
  return (
    <Tooltip
      contentStyle={{
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '6px',
      }}
      itemStyle={{ color: '#fff' }}
      labelStyle={{ color: '#888' }}
    />
  );
}