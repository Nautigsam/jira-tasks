import React, { useState } from "react";

import { Task } from "./models.ts";

import Editor from "./Editor.tsx";
import TasksList from "./TasksList.tsx";

// const initTask: Task = {
//   title: "Title",
//   context: "Context",
//   expectations: "Expectations",
// };
const initTask: Task = {
  title: "",
  context: "",
  expectations: "",
};

function convertNewLines(value: string) {
  return value.replaceAll("\n", "{n}");
}
function toJira(tasks: Task[]) {
  return tasks.map((t) =>
    `- ${t.title} / description:"h3. Contexte{n}${
      convertNewLines(t.context)
    }{n}h3. Attendu{n}${convertNewLines(t.expectations)}"`
  ).join("\n");
}

export default function Main() {
  const [tasks, setTasks] = useState<Task[]>([]);
  function onAdd(t: Task) {
    setTasks([...tasks, t]);
  }
  function onCopy() {
    navigator.clipboard.writeText(toJira(tasks));
  }

  return (
    <div>
      <h1>Create Jira tasks</h1>
      <div>
        <Editor
          task={initTask}
          onAdd={onAdd}
        />
        <button onClick={onCopy}>
          Copy to clipboard
        </button>
      </div>
      <TasksList tasks={tasks} />
    </div>
  );
}
