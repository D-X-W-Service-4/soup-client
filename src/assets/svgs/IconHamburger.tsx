import type { SVGProps } from 'react';
const IconHamburger = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={22}
    height={22}
    fill="none"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M3.438 6.188h15.124M3.438 11h15.126M3.438 15.813h15.124"
    />
  </svg>
);
export default IconHamburger;
