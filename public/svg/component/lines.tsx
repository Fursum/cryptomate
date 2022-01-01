import { FunctionComponent } from "react";

interface Props {
  color1?: string;
  color2?: string;
}

export const Lines_Test: FunctionComponent<Props> = ({
  color1 = "#00FF29",
  color2 = "#FF0000",
}) => {
  return (
    <svg
      width="262"
      height="124"
      viewBox="0 0 262 124"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.89783 95.331L54.5 103.5L89 42.5L147 29L207 76L259.5 2.5"
        stroke={color1}
        strokeWidth="6"
      />
      <path
        d="M2.99988 56.5001L52.4999 9.50012L92.5 80.5001L148.5 44.5001L206.5 48.5L253 121.5"
        stroke={color2}
        strokeWidth="6"
      />
    </svg>
  );
};

export const Lines_Deploy: FunctionComponent<Props> = ({
  color1 = "#534B4B",
  color2 = "#00FF29",
}) => {
  return (
    <svg
      width="262"
      height="124"
      viewBox="0 0 262 124"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.99988 56.5002L52.4999 9.50024L92.5 80.5002L148.5 44.5002L206.5 48.5002L253 121.5"
        stroke={color1}
        strokeWidth="6"
      />
      <path
        d="M2.89783 95.331L54.5 103.5L89 42.5L147 29L207 76L259.5 2.5"
        stroke={color2}
        strokeWidth="6"
      />
    </svg>
  );
};
