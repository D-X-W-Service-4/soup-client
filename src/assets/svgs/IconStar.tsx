import type { SVGProps } from 'react';
const IconStar = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={22}
    height={22}
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M9.889 2.943c.41-.988 1.81-.988 2.222 0l1.908 4.589 4.954.397c1.067.085 1.5 1.417.686 2.113l-3.774 3.233 1.153 4.834c.249 1.041-.884 1.864-1.797 1.306L11 16.825l-4.241 2.59c-.914.558-2.046-.265-1.798-1.306l1.153-4.834-3.774-3.233c-.813-.696-.38-2.028.687-2.113l4.953-.397L9.89 2.943Z"
      clipRule="evenodd"
    />
  </svg>
);
export default IconStar;
