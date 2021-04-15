import React, { useState } from "react";

import { Task } from "./models.ts";

type TaskAddHandler = (t: Task) => void;
type EditorProps = {
  onAdd: TaskAddHandler;
};

export default function Editor({ onAdd }: EditorProps) {
  const [title, setTitle] = useState("Some title");
  const [description, setDescription] = useState("Some description");

  function onTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value);
  }

  function onDescriptionChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setDescription(e.target.value);
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onAdd({ title, description });
    setTitle("");
    setDescription("");
  }

  return (
    <form
      onSubmit={onSubmit}
    >
      <input type="text" name="title" value={title} onChange={onTitleChange} />
      <textarea
        name="description"
        value={description}
        onChange={onDescriptionChange}
      >
      </textarea>
      <button type="submit">Add</button>
    </form>
  );
}
