// src/components/NoteEditor.js
import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const NoteEditor = ({ note, onSave }) => {
  const [title, setTitle] = useState(note.title || "");
  const [content, setContent] = useState(note.content || "");

  useEffect(() => {
    setTitle(note.title || "");
    setContent(note.content || "");
  }, [note]);

  const handleSave = () => {
    onSave({ ...note, title, content });
  };

  return (
    <div className="note-editor">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <ReactQuill value={content} onChange={setContent} />
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default NoteEditor;
