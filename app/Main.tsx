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
  function onCopy() {
    console.log(tasks);
  }

  return (
    <div>
      <Editor onAdd={onAdd} />
      <Bar onCopy={onCopy} />
      <TasksList tasks={tasks} />
    </div>
  );
}
