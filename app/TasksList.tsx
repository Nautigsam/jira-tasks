import React, { CSSProperties, useState } from "react";

import { Task } from "./models.ts";

type TaskItemProps = {
  task: Task;
};
type TasksListProps = {
  tasks: Task[];
};

function convertNewLines(value: string) {
  return value.replaceAll("\n", "\u000A");
}

function TaskItem({ task }: TaskItemProps) {
  const t = task;
  const [isCollapsed, setCollapsed] = useState(true);

  function toggleCollapsed() {
    setCollapsed(!isCollapsed);
  }

  const a = (...args: CSSProperties[]) => Object.assign({}, ...args);
  const containerStyle: CSSProperties = {
    borderRadius: "5px",
    border: "1px solid black",
    overflow: "hidden",
  };
  const noMargin: CSSProperties = {
    margin: 0,
  };
  const titleStyle: CSSProperties = a({
    backgroundColor: "gray",
    padding: "0.5em",
    fontSize: "1em",
    fontWeight: "normal",
    cursor: "pointer",
    display: "flex",
  }, noMargin);
  const signStyle: CSSProperties = {
    flex: "0 0 1em",
  };
  const contentStyle: CSSProperties = {
    padding: "1em",
  };
  const sectionMargin: CSSProperties = a(noMargin, {
    marginTop: "1.5em",
  });
  const paragraphStyle: CSSProperties = a({
    whiteSpace: "break-spaces",
  }, noMargin);

  return (
    <li>
      {isCollapsed
        ? <h2
          style={a(containerStyle, titleStyle)}
          onClick={toggleCollapsed}
        >
          <span style={signStyle}>+</span>
          {t.title}
        </h2>
        : <div style={containerStyle}>
          <h2 style={titleStyle} onClick={toggleCollapsed}>
            <span style={signStyle}>&ndash;</span>
            {t.title}
          </h2>
          <div style={contentStyle}>
            <div>
              <h3 style={noMargin}>Contexte</h3>
              <p style={paragraphStyle}>
                {convertNewLines(t.context)}
              </p>
            </div>
            <div>
              <h3 style={sectionMargin}>Attendu</h3>
              <p style={paragraphStyle}>
                {convertNewLines(t.expectations)}
              </p>
            </div>
          </div>
        </div>}
    </li>
  );
}

export default function TasksList({ tasks }: TasksListProps) {
  const listStyle: CSSProperties = {
    listStyleType: "none",
    padding: 0,
  };
  const emptyStyle: CSSProperties = {
    textAlign: "center",
  };
  return (
    <div>
      {tasks?.length === 0
        ? <p style={emptyStyle}>No task created</p>
        : <ul style={listStyle}>
          {tasks.map((t) => <TaskItem key={t.uuid} task={t} />)}
        </ul>}
    </div>
  );
}
