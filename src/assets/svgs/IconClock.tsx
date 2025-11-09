import type { SVGProps } from 'react';
const IconClock = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={29}
    height={29}
    fill="none"
    {...props}
  >
    <path
      stroke="#E7000B"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3}
      d="M14.5 8.722V14.5l4.333 4.333M27.5 14.5a13 13 0 1 1-26 0 13 13 0 0 1 26 0Z"
    />
  </svg>
);
export default IconClock;
