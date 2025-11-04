import type { SVGProps } from 'react';
const IconArrowRight = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11.667 4.167 17.5 10m0 0-5.833 5.834M17.5 10h-15"
    />
  </svg>
);
export default IconArrowRight;
