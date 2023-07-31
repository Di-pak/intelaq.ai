import React from "react";
interface PresentationIconProps {
  selected: boolean;
}

const PresentationIcon: React.FC<PresentationIconProps> = ({ selected }) => {
  if (selected) {
    // SVG for when the icon is selected
    return (
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="2.66797"
          y="2.66602"
          width="26.6667"
          height="4"
          rx="2"
          fill="#24B1BE"
        />
        <rect x="4" y="6.66602" width="24" height="13.3333" fill="#24B1BE" />
        <rect
          x="2.66797"
          y="20"
          width="26.6667"
          height="4"
          rx="2"
          fill="#24B1BE"
        />
        <path d="M16 24V29.3333" stroke="#24B1BE" stroke-linejoin="round" />
        <path
          d="M13.3359 29.332H18.6693"
          stroke="#24B1BE"
          stroke-linejoin="round"
        />
        <path
          d="M8 15.9993L12.6262 11.3731C13.0168 10.9826 13.6499 10.9826 14.0404 11.3731L17.9596 15.2922C18.3501 15.6828 18.9832 15.6828 19.3738 15.2922L24 10.666"
          stroke="white"
          stroke-linejoin="round"
        />
      </svg>
    );
  } else {
    // SVG for when the icon is not selected
    return (
      <svg
        width="32"
        height="30"
        viewBox="0 0 32 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="2.66797"
          y="2.47266"
          width="26.6667"
          height="3.71014"
          rx="1.85507"
          stroke="#5C5C5C"
          stroke-linejoin="round"
        />
        <rect
          x="4"
          y="6.18359"
          width="24"
          height="12.3671"
          stroke="#5C5C5C"
          stroke-linejoin="round"
        />
        <rect
          x="2.66797"
          y="18.5508"
          width="26.6667"
          height="3.71014"
          rx="1.85507"
          stroke="#5C5C5C"
          stroke-linejoin="round"
        />
        <path
          d="M16 22.2598V27.2066"
          stroke="#5C5C5C"
          stroke-linejoin="round"
        />
        <path
          d="M13.3359 27.207H18.6693"
          stroke="#5C5C5C"
          stroke-linejoin="round"
        />
        <path
          d="M8 14.8394L12.6533 10.5233C13.0369 10.1676 13.6298 10.1676 14.0134 10.5233L17.9866 14.2087C18.3702 14.5644 18.9631 14.5644 19.3467 14.2087L24 9.89258"
          stroke="#5C5C5C"
          stroke-linejoin="round"
        />
      </svg>
    );
  }
};
export default PresentationIcon;
