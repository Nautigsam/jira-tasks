import React from "react";

type CopyHandler = () => void;
type BarProps = {
  onCopy: CopyHandler;
};

export default function Bar({ onCopy }: BarProps) {
  return (
    <div>
      <button onClick={onCopy}>Copy for Jira</button>
    </div>
  );
}
