import type { SVGProps } from 'react';
const IconChevronLeft = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={21}
    height={20}
    fill="none"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 15.834 7.165 10l5.833-5.833"
    />
  </svg>
);
export default IconChevronLeft;
