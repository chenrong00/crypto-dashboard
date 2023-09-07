import React from "react";

const Card = ({ children }) => {
  return (
    // Full width and height of parent, give border radius, relative positioning, 8px padding, border width 2, background gray(bg-gray-300)
    <div className="w-full h-full rounded-md relative p-8 border-2 bg-white border-neutral-200">
      {children}
    </div>
  );
};

export default Card;
