import type { SVGProps } from 'react';

const IconXMark = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={15}
    height={16}
    fill="none"
    {...props}
  >
    <path
      fill="#D1D5DC"
      d="M1.5 15.5 0 14l6-6-6-6L1.5.5l6 6 6-6L15 2 9 8l6 6-1.5 1.5-6-6-6 6Z"
    />
  </svg>
);

export default IconXMark;
