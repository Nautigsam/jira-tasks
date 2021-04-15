import React, { useEffect, useRef, useState } from "react";

import { Task } from "./models.ts";

type TaskAddHandler = (t: Task) => void;
type EditorProps = {
  onAdd: TaskAddHandler;
};

export default function Editor({ onAdd }: EditorProps) {
  const titleInput = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState("");
  const [context, setContext] = useState("");
  const [expectations, setExpectations] = useState("");

  useEffect(() => {
    titleInput?.current?.focus();
  }, []);

  function submit() {
    const newTask: Task = { title, context, expectations };
    if (Object.entries(newTask).some(([_, v]) => !v)) {
      return;
    }
    onAdd(newTask);
    setTitle("");
    setContext("");
    setExpectations("");
    titleInput?.current?.focus();
  }

  function onTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value);
  }
  function onContextChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setContext(e.target.value);
  }
  function onExpectationsChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setExpectations(e.target.value);
  }
  function onKeyPressInput(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      if (e.ctrlKey) {
        submit();
      }
    }
  }
  function onKeyPressTextArea(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.ctrlKey && e.key === "Enter") {
      e.preventDefault();
      submit();
    }
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
    >
      <input
        ref={titleInput}
        type="text"
        name="title"
        value={title}
        onChange={onTitleChange}
        onKeyPress={onKeyPressInput}
        required
        placeholder="Title"
      />
      <textarea
        name="context"
        value={context}
        onChange={onContextChange}
        onKeyPress={onKeyPressTextArea}
        required
        placeholder="Context"
      >
      </textarea>
      <textarea
        name="expectations"
        value={expectations}
        onChange={onExpectationsChange}
        onKeyPress={onKeyPressTextArea}
        required
        placeholder="Expectactions"
      >
      </textarea>
      <input
        type="submit"
        value="Add (Ctrl+Enter)"
        onKeyPress={onKeyPressInput}
      />
    </form>
  );
}
