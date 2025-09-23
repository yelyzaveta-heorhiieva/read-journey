import React from 'react';

const cleanPercentage = (percentage: number): number => {
  const tooLow = !Number.isFinite(+percentage) || percentage < 0;
  const tooHigh = percentage > 100;
  return tooLow ? 0 : tooHigh ? 100 : +percentage;
};

type CircleProps = {
  colour: string;
  pct?: number;
};

const Circle: React.FC<CircleProps> = ({ colour, pct = 0 }) => {
  const r = 53;
  const circ = 2 * Math.PI * r;
  const strokePct = ((100 - pct) * circ) / 100;
  return (
    <circle
      r={r}
      cx={58}
      cy={58}
      fill='transparent'
      stroke={strokePct !== circ ? colour : ''} // remove colour as 0% sets full circumference
      strokeWidth='10px'
      strokeDasharray={circ}
      strokeDashoffset={pct ? strokePct : 0}
      strokeLinecap='round'
    />
  );
};


const Text = () => {
  return (
    <text
      x='50%'
      y='50%'
      dominantBaseline='central'
      textAnchor='middle'
      fontSize='1.5em'
      className='
      font-bold text-lg leading-[111%] tracking-[-0.02em] fill-[#f9f9f9]'
    >
      100%
    </text>
  );
};

type PieProps = {
  percentage: number;
  colour: string;
};

const ProgressCircle: React.FC<PieProps> = ({ percentage, colour }) => {
  const pct = cleanPercentage(percentage);
  return (
    <svg width={116} height={116} className='flex items-center justify-center mb-[21px] mx-auto'>
      <g transform={`rotate(-90 58 58)`}>
        <Circle colour='#1f1f1f' pct={100} />
        <Circle colour={colour} pct={pct} />
      </g>
      <Text />
    </svg>
  );
};

export default ProgressCircle;
