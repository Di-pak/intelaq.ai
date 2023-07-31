import React from "react";

interface BookmarkIconProps {
  selected: boolean;
}

const BookmarkIcon: React.FC<BookmarkIconProps> = ({ selected }) => {
  if (selected) {
    // SVG for when the icon is selected
    return (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="16.0013" cy="13.3333" rx="9.33333" ry="9.33333" fill="#24B1BE" stroke="#24B1BE" stroke-linejoin="round" />
        <path d="M16.0013 8L17.1987 11.6852L21.0736 11.6852L17.9387 13.9628L19.1362 17.6481L16.0013 15.3705L12.8664 17.6481L14.0639 13.9628L10.929 11.6852L14.8039 11.6852L16.0013 8Z" fill="white" />
        <path d="M10.668 21.334V29.334L16.0013 26.6673L21.3346 29.334V21.334" stroke="#24B1BE" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M21 29V21H11V29L16 26.3333L21 29Z" fill="#24B1BE" />
      </svg>
    );
  } else {
    // SVG for when the icon is not selected
    return (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="16.0013" cy="13.3333" rx="9.33333" ry="9.33333" stroke="#5C5C5C" stroke-linejoin="round" />
        <path d="M16.0013 8L17.1987 11.6852L21.0736 11.6852L17.9387 13.9628L19.1362 17.6481L16.0013 15.3705L12.8664 17.6481L14.0639 13.9628L10.929 11.6852L14.8039 11.6852L16.0013 8Z" stroke="#5C5C5C" stroke-linejoin="round" />
        <path d="M10.668 21.334V29.334L16.0013 26.6673L21.3346 29.334V21.334" stroke="#5C5C5C" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    );
  }
};

export default BookmarkIcon;
