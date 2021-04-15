import React from "react";

import { Task } from "./models.ts";

type TasksListProps = {
  tasks: Task[];
};

export default function TasksList({ tasks }: TasksListProps) {
  return (
    <ul>
      {tasks.map((t) => (<li key={t.title}>
        <span>{t.title}</span>
        <p>
          <span>Context:</span>
          {t.context}
        </p>
        <p>
          <span>Expected:</span>
          {t.expected}
        </p>
      </li>))}
    </ul>
  );
}
