// src/components/NoteItem.js
import React from "react";

const NoteItem = ({ note, onSelect }) => {
  return (
    <div onClick={() => onSelect(note.id)} className="note-item">
      <h2>{note.title}</h2>
      <p>{note.content}</p>
    </div>
  );
};

export default NoteItem;
