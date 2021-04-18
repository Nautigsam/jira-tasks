import React, { CSSProperties, useEffect, useRef, useState } from "react";
import { v4 as uuid } from "uuid";

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
    const newTask: Task = {
      uuid: uuid(),
      title,
      context,
      expectations,
    };
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

  const verticalFlex: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  };
  const titleFont: CSSProperties = {
    fontSize: "2em",
    borderStyle: "none",
    borderBottom: "1px solid grey",
    marginBottom: "0.5em",
  };
  const textareaStyle: CSSProperties = {
    height: "100%",
    display: "flex",
    flexFlow: "row",
    gap: "10px",
  };
  const textareaFont: CSSProperties = {
    fontSize: "0.5em",
    flex: "1 1 auto",
    boxSizing: "border-box",
    maxWidth: "50%",
  };
  const submitStyle: CSSProperties = {
    marginTop: "0.5em",
    marginBottom: "0.5em",
    fontSize: "1.5em",
  };

  return (
    <form
      style={verticalFlex}
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
        style={titleFont}
        onChange={onTitleChange}
        onKeyPress={onKeyPressInput}
        required
        placeholder="Title"
      />
      <div style={textareaStyle}>
        <textarea
          name="context"
          value={context}
          style={textareaFont}
          onChange={onContextChange}
          onKeyPress={onKeyPressTextArea}
          required
          placeholder="Context"
        >
        </textarea>
        <textarea
          name="expectations"
          value={expectations}
          style={textareaFont}
          onChange={onExpectationsChange}
          onKeyPress={onKeyPressTextArea}
          required
          placeholder="Expectactions"
        >
        </textarea>
      </div>
      <input
        type="submit"
        value="Add (Ctrl+Enter)"
        style={submitStyle}
        onKeyPress={onKeyPressInput}
      />
    </form>
  );
}
