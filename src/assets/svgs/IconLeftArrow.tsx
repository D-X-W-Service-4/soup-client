import type { SVGProps } from 'react';
const IconLeftArrow = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8.333 15.834 2.5 10m0 0 5.833-5.833M2.5 10h15"
      clipRule="evenodd"
    />
  </svg>
);
export default IconLeftArrow;
