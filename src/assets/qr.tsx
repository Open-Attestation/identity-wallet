import React, { ReactElement } from "react";

interface QRWebIconInterface {
  width: number;
  height: number;
  fill?: string;
}

export const QRWebIcon = ({
  width,
  height,
  fill
}: QRWebIconInterface): ReactElement => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 11 11"
      fill={fill ? fill : "4F4F4F"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="1" height="1" />
      <rect x="2" width="1" height="1" />
      <rect x="1" width="1" height="1" />
      <rect y="2" width="1" height="1" />
      <rect x="2" y="2" width="1" height="1" />
      <rect x="2" y="1" width="1" height="1" />
      <rect y="1" width="1" height="1" />
      <rect x="1" y="2" width="1" height="1" />
      <rect x="8" width="1" height="1" />
      <rect x="10" width="1" height="1" />
      <rect x="9" width="1" height="1" />
      <rect x="8" y="2" width="1" height="1" />
      <rect x="10" y="2" width="1" height="1" />
      <rect x="10" y="10" width="1" height="1" />
      <rect x="7" y="10" width="1" height="1" />
      <rect x="4" y="1" width="1" height="1" />
      <rect x="4" y="2" width="1" height="1" />
      <rect x="5" width="1" height="1" />
      <rect x="4" width="1" height="1" />
      <rect x="6" y="1" width="1" height="1" />
      <rect x="4" y="3" width="1" height="1" />
      <rect x="4" y="5" width="1" height="1" />
      <rect x="2" y="4" width="1" height="1" />
      <rect x="1" y="4" width="1" height="1" />
      <rect y="5" width="1" height="1" />
      <rect x="2" y="6" width="1" height="1" />
      <rect y="6" width="1" height="1" />
      <rect x="6" y="2" width="1" height="1" />
      <rect x="8" y="5" width="1" height="1" />
      <rect x="10" y="5" width="1" height="1" />
      <rect x="7" y="3" width="1" height="1" />
      <rect x="6" y="10" width="1" height="1" />
      <rect x="4" y="10" width="1" height="1" />
      <rect x="9" y="10" width="1" height="1" />
      <rect x="10" y="1" width="1" height="1" />
      <rect x="8" y="1" width="1" height="1" />
      <rect x="9" y="2" width="1" height="1" />
      <rect x="9" y="5" width="1" height="1" />
      <rect x="8" y="7" width="1" height="1" />
      <rect x="8" y="8" width="1" height="1" />
      <rect x="10" y="8" width="1" height="1" />
      <rect x="10" y="7" width="1" height="1" />
      <rect x="10" y="6" width="1" height="1" />
      <rect x="8" y="6" width="1" height="1" />
      <rect x="9" y="7" width="1" height="1" />
      <rect x="6" y="5" width="1" height="1" />
      <rect x="5" y="5" width="1" height="1" />
      <rect x="4" y="7" width="1" height="1" />
      <rect x="4" y="8" width="1" height="1" />
      <rect x="6" y="8" width="1" height="1" />
      <rect x="6" y="7" width="1" height="1" />
      <rect x="6" y="6" width="1" height="1" />
      <rect x="4" y="6" width="1" height="1" />
      <rect x="5" y="8" width="1" height="1" />
      <rect y="8" width="1" height="1" />
      <rect x="2" y="8" width="1" height="1" />
      <rect x="1" y="8" width="1" height="1" />
      <rect y="10" width="1" height="1" />
      <rect x="2" y="10" width="1" height="1" />
      <rect x="2" y="9" width="1" height="1" />
      <rect y="9" width="1" height="1" />
      <rect x="1" y="10" width="1" height="1" />
    </svg>
  );
};
