import type { SVGProps } from 'react';

const IconChevronDown = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="0.625em"
    height="0.375em"
    fill="none"
    {...props}
  >
    <path
      stroke="#525252"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 1 5 5 1 1"
    />
  </svg>
);
export default IconChevronDown;
