import React, { CSSProperties, useState } from "react";

import { Task } from "./models.ts";

import Editor from "./Editor.tsx";
import TasksList from "./TasksList.tsx";

// const initTasks: Task[] = [
//   {
//     title: "This is a title",
//     context: "This is a context",
//     expectations: "These are expectations",
//   },
// ];
const initTasks: Task[] = [];

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
  const [tasks, setTasks] = useState<Task[]>(initTasks);
  function onAdd(t: Task) {
    setTasks([...tasks, t]);
  }
  function onCopy() {
    navigator.clipboard.writeText(toJira(tasks));
  }

  const basicValues: CSSProperties = {
    fontSize: "32px",
    width: "50vw",
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    marginTop: "1em",
  };
  const editorFlex: CSSProperties = {
    flex: "1 1 50vh",
    height: "100%",
  };
  const copyFont: CSSProperties = {
    fontSize: "1em",
  };
  const listStyle: CSSProperties = {
    fontSize: "16px",
    height: "100%",
  };

  return (
    <div style={basicValues}>
      <div style={editorFlex}>
        <Editor
          onAdd={onAdd}
        />
      </div>
      <button style={copyFont} onClick={onCopy}>
        Copy to clipboard
      </button>
      <div style={listStyle}>
        <TasksList tasks={tasks} />
      </div>
    </div>
  );
}
