
import React from "react";

interface ChartProps {
  data: any[];
  index: string;
  categories: string[];
  valueFormatter?: (value: number) => string;
  colors?: string[];
  className?: string;
}

export const BarChart: React.FC<ChartProps> = ({ 
  data, 
  index, 
  categories, 
  valueFormatter = (value) => `${value}`,
  colors = ["#0066CC"],
  className
}) => {
  // Simple implementation of a bar chart
  const maxValue = Math.max(...data.map(item => Math.max(...categories.map(cat => Number(item[cat]) || 0))));
  
  return (
    <div className={`w-full h-full flex flex-col ${className}`}>
      <div className="flex-1 flex items-end space-x-2 overflow-x-auto pb-2">
        {data.map((item, i) => (
          <div key={i} className="flex flex-col items-center flex-shrink-0" style={{ width: `${100 / data.length}%`, maxWidth: '100px', minWidth: '40px' }}>
            <div className="w-full flex flex-col-reverse space-y-reverse space-y-1">
              {categories.map((category, catIndex) => {
                const value = Number(item[category]) || 0;
                const height = `${(value / maxValue) * 100}%`;
                
                return (
                  <div 
                    key={category}
                    className="w-full rounded-t-sm group relative"
                    style={{ 
                      height, 
                      backgroundColor: colors[catIndex % colors.length],
                      minHeight: value > 0 ? '4px' : '0'
                    }}
                  >
                    <div className="opacity-0 group-hover:opacity-100 absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded px-2 py-1 transition-opacity whitespace-nowrap">
                      {valueFormatter(value)}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="text-xs text-muted-foreground mt-1 truncate max-w-full">
              {item[index]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const LineChart: React.FC<ChartProps> = ({ 
  data, 
  index, 
  categories, 
  valueFormatter = (value) => `${value}`,
  colors = ["#0066CC"],
  className
}) => {
  // Simple implementation of a line chart
  const maxValue = Math.max(...data.map(item => Math.max(...categories.map(cat => Number(item[cat]) || 0))));
  
  return (
    <div className={`w-full h-full flex flex-col ${className}`}>
      <div className="flex-1 relative pt-5">
        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio) => (
          <div 
            key={ratio} 
            className="absolute w-full border-t border-muted" 
            style={{ bottom: `${ratio * 100}%` }}
          />
        ))}
        
        {categories.map((category, catIndex) => {
          const points = data.map((item, i) => {
            const value = Number(item[category]) || 0;
            const x = `${(i / (data.length - 1)) * 100}%`;
            const y = `${100 - (value / maxValue) * 100}%`;
            return { x, y, value, name: item[index] };
          });
          
          return (
            <div key={category} className="absolute inset-0">
              {/* Line */}
              <svg className="w-full h-full">
                <polyline
                  points={points.map(p => `${p.x},${p.y}`).join(' ')}
                  fill="none"
                  stroke={colors[catIndex % colors.length]}
                  strokeWidth="2"
                />
              </svg>
              
              {/* Points */}
              {points.map((point, i) => (
                <div 
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-white border-2 group"
                  style={{ 
                    left: point.x, 
                    top: point.y,
                    transform: 'translate(-50%, -50%)',
                    borderColor: colors[catIndex % colors.length]
                  }}
                >
                  <div className="opacity-0 group-hover:opacity-100 absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded px-2 py-1 transition-opacity whitespace-nowrap">
                    {point.name}: {valueFormatter(point.value)}
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
      
      {/* X-axis labels */}
      <div className="flex justify-between mt-2">
        {data.map((item, i) => (
          <div key={i} className="text-xs text-muted-foreground truncate px-1">
            {item[index]}
          </div>
        ))}
      </div>
    </div>
  );
};

export const PieChart: React.FC<ChartProps> = ({ 
  data, 
  index, 
  categories, 
  valueFormatter = (value) => `${value}`,
  colors = ["#0066CC", "#4E97F3", "#7FB7FF", "#B1D3FF", "#D8ECFF"],
  className
}) => {
  // Only support single category for pie chart
  const category = categories[0];
  const total = data.reduce((sum, item) => sum + (Number(item[category]) || 0), 0);
  
  // Calculate segments
  let startAngle = 0;
  const segments = data.map((item, i) => {
    const value = Number(item[category]) || 0;
    const percentage = total > 0 ? (value / total) * 100 : 0;
    const angle = total > 0 ? (value / total) * 360 : 0;
    
    const segment = {
      name: item[index],
      value,
      percentage,
      startAngle,
      endAngle: startAngle + angle,
      color: colors[i % colors.length]
    };
    
    startAngle += angle;
    return segment;
  });

  return (
    <div className={`w-full h-full flex items-center justify-center ${className}`}>
      <div className="relative" style={{ width: '80%', height: '80%' }}>
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="45" fill="transparent" className="stroke-muted" strokeWidth="1" />
          
          {segments.map((segment, i) => {
            if (segment.percentage === 0) return null;
            
            const startX = 50 + 45 * Math.cos((segment.startAngle - 90) * (Math.PI / 180));
            const startY = 50 + 45 * Math.sin((segment.startAngle - 90) * (Math.PI / 180));
            
            const endX = 50 + 45 * Math.cos((segment.endAngle - 90) * (Math.PI / 180));
            const endY = 50 + 45 * Math.sin((segment.endAngle - 90) * (Math.PI / 180));
            
            // Use svg arc
            const largeArcFlag = segment.endAngle - segment.startAngle > 180 ? 1 : 0;
            
            return (
              <path
                key={i}
                d={`M 50 50 L ${startX} ${startY} A 45 45 0 ${largeArcFlag} 1 ${endX} ${endY} Z`}
                fill={segment.color}
                stroke="white"
                strokeWidth="1"
                className="hover:opacity-80 transition-opacity"
              />
            );
          })}
        </svg>
        
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div>
            <div className="text-2xl font-bold">{total}</div>
            <div className="text-xs text-muted-foreground">Total</div>
          </div>
        </div>
      </div>
      
      {/* Legend */}
      <div className="w-full max-w-xs space-y-1 ml-4">
        {segments.map((segment, i) => (
          <div key={i} className="flex items-center text-sm">
            <div 
              className="w-3 h-3 rounded-sm mr-2" 
              style={{ backgroundColor: segment.color }} 
            />
            <span className="flex-1 truncate">{segment.name}</span>
            <span className="ml-2 font-medium">{valueFormatter(segment.value)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
