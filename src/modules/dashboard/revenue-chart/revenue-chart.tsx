import { CalendarIcon } from '@heroicons/react/24/outline';
import { generateYAxis } from '@/lib/utils';
import './styles/revenue-chart.scss';

export type RevenueType = {
  month: string;
  revenue: number;
};

export default function RevenueChart({
  revenues,
}: {
  revenues: RevenueType[];
}) {
  const chartHeight = 350;
  const { yAxisLabels, topLabel } = generateYAxis(revenues);
  return (
    <div className="revenue-chart">
      <h2 className="revenue-chart__title">Recent Revenue</h2>
      <div className="revenue-chart__inner-wrapper">
        <div className="revenue-chart__body">
          <div
            className="revenue-chart__y-axis-label"
            style={{ height: `${chartHeight}px` }}
          >
            {yAxisLabels.map((label) => (
              <p key={label}>{label}</p>
            ))}
          </div>
          {revenues.map((revenue) => (
            <div key={revenue.month} className="revenue-chart__stick-container">
              <div
                className="revenue-chart__stick"
                style={{
                  height: `${(chartHeight / topLabel) * revenue.revenue}px`,
                }}
              ></div>
              <p>{revenue.month}</p>
            </div>
          ))}
        </div>
        <div className="revenue-chart__footer">
          <CalendarIcon className="calender-icon" />
          <h3>Last 12 months</h3>
        </div>
      </div>
    </div>
  );
}
