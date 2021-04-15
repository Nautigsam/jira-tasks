import React, { useState } from "react";

import { Task } from "./models.ts";

import Bar from "./Bar.tsx";
import Editor from "./Editor.tsx";
import TasksList from "./TasksList.tsx";

export default function Main() {
  const [tasks, setTasks] = useState<Task[]>([]);
  function onAdd(t: Task) {
    setTasks([...tasks, t]);
  }

  return (
    <div>
      <Bar />
      <Editor onAdd={onAdd} />
      <TasksList tasks={tasks} />
    </div>
  );
}
