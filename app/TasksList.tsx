import React from "react";

import { Task } from "./models.ts";

type TasksListProps = {
  tasks: Task[];
};

export default function TasksList({ tasks }: TasksListProps) {
  return (
    <ul>
      {tasks.map((t) => <li>{t.title} / description="{t.description}"</li>)}
    </ul>
  );
}
