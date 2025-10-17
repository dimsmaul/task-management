import React from "react";

export interface BadgeProps {
  name: string;
  color: string;
}

const Badge: React.FC<BadgeProps> = (props) => {
  return (
    <div
      style={{
        color: props.color,
        backgroundColor: `${props.color}20`,
      }}
      className="flex rounded-md px-2 py-1 text-sm w-fit"
    >
      {props.name}
    </div>
  );
};

export default Badge;
