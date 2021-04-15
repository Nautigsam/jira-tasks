import React from "react";

import { Task } from "./models.ts";

type TasksListProps = {
  tasks: Task[];
};

function convertNewLines(value: string) {
  return value.replaceAll("\n", "\u000A");
}

export default function TasksList({ tasks }: TasksListProps) {
  return tasks?.length === 0 ? <p>No task created</p> : (
    <ul>
      {tasks.map((t) => (<li key={t.title}>
        <h2>{t.title}</h2>
        <div>
          <h3>Context</h3>
          <p style={{ whiteSpace: "pre-wrap" }}>
            {convertNewLines(t.context)}
          </p>
        </div>
        <div>
          <h3>Expected</h3>
          <p style={{ whiteSpace: "pre-wrap" }}>
            {convertNewLines(t.expectations)}
          </p>
        </div>
      </li>))}
    </ul>
  );
}
