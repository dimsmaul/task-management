import React from "react";

export interface PreviewProps {
  /**
   * Title of the preview component.
   * @default ""
   */
  title: string;

  /**
   * Children elements to be displayed inside the preview component.
   * @default null
   */
  children: React.ReactNode;
}

const Preview: React.FC<PreviewProps> = (props) => {
  return (
    <div>
      <div className="text-sm font-medium text-support-100/50">
        {props.title}
      </div>
      <div className="text-base text-support-100">{props.children}</div>
    </div>
  );
};

export default Preview;
