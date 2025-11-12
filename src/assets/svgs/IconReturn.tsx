import type { SVGProps } from 'react';

const IconReturn = (props: SVGProps<SVGSVGElement>) => (
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
      d="M4.5 1 1 4l3.5 3.5"
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M1 4h11.497c3.441 0 6.364 2.81 6.498 6.25.142 3.635-2.861 6.75-6.498 6.75H3.999"
    />
  </svg>
);

export default IconReturn;
