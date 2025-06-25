import { SVGAttributes } from 'react';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
  return (
    <svg
      {...props}
      version="1.2"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 128 128"
      width="256"
      height="256"
    >
      <g
        strokeMiterlimit={10}
        stroke="currentColor"
        strokeWidth={6}
      >
        <path
          id="Shape 3"
          fillRule="evenodd"
          d="M53 98.3L80 30Z"
        />
        <path
          id="Shape 4"
          fillRule="evenodd"
          d="M77 98L103.8 30Z"
        />
        <path
          id="Shape 1"
          fillRule="evenodd"
          d="M31.3 57.7c-4 0-7.3-3.3-7.3-7.4 0-4 3.3-7.3 7.3-7.3 4.1 0 7.4 3.3 7.4 7.3 0 4.1-3.3 7.4-7.4 7.4Z"
        />
        <path
          id="Shape 2"
          fillRule="evenodd"
          d="M31.8 85.6c-4.1 0-7.3-3.3-7.3-7.3 0-4.1 3.2-7.4 7.3-7.4 4 0 7.3 3.3 7.3 7.4 0 4-3.3 7.3-7.3 7.3Z"
        />
      </g>
    </svg>
  );
}
