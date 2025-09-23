import React from 'react';
import { useMediaQuery } from 'react-responsive';

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
  const isMob = useMediaQuery({ maxWidth: 767 });
  const isDesk = useMediaQuery({ minWidth: 1280 });
  const r = isMob ? 53 : isDesk ? 77 : 62;
  const circ = 2 * Math.PI * r;
  const strokePct = ((100 - pct) * circ) / 100;
  return (
    <circle
      r={r}
      cx={isMob ? 58 : isDesk ? 84 : 69}
      cy={isMob ? 58 : isDesk ? 84 : 69}
      fill='transparent'
      stroke={strokePct !== circ ? colour : ''}
      strokeWidth={isMob ? '10px' : '14px'}
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
      font-bold text-lg leading-[111%] tracking-[-0.02em] fill-[#f9f9f9] md:text-xl md:leading-[100%]'
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
  const isMob = useMediaQuery({ maxWidth: 767 })
  const isDesk = useMediaQuery({ minWidth: 1280 });
  const pct = cleanPercentage(percentage);
  return (
    <svg
      width={isMob ? 116 : isDesk ? 168 : 138}
      height={isMob ? 116 : isDesk ? 168 : 138}
      className='flex items-center justify-center'
    >
      <g
        transform={
          isMob
            ? 'rotate(-90 58 58)'
            : isDesk
            ? 'rotate(-90 84 84)'
            : 'rotate(-90 69 69)'
        }
      >
        <Circle colour='#1f1f1f' pct={100} />
        <Circle colour={colour} pct={pct} />
      </g>
      <Text />
    </svg>
  );
};

export default ProgressCircle;
