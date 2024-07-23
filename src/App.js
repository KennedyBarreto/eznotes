// src/App.js
import React, { useState, useEffect } from "react";
import { saveNotes, loadNotes } from "./utils/localStorage";
import NoteList from "./components/NoteList";
import NoteEditor from "./components/NoteEditor";
import "./styles.css";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [selectedNoteId, setSelectedNoteId] = useState(null);

  useEffect(() => {
    setNotes(loadNotes());
  }, []);

  useEffect(() => {
    saveNotes(notes);
  }, [notes]);

  const handleSaveNote = (note) => {
    setNotes((prevNotes) => {
      const noteIndex = prevNotes.findIndex((n) => n.id === note.id);
      if (noteIndex > -1) {
        const newNotes = [...prevNotes];
        newNotes[noteIndex] = note;
        return newNotes;
      }
      return [...prevNotes, { ...note, id: Date.now() }];
    });
    setSelectedNoteId(null);
  };

  const handleSelectNote = (id) => {
    setSelectedNoteId(id);
  };

  const selectedNote = notes.find((note) => note.id === selectedNoteId) || {};

  return (
    <div className="app">
      <NoteList notes={notes} onSelect={handleSelectNote} />
      <NoteEditor note={selectedNote} onSave={handleSaveNote} />
    </div>
  );
};

export default App;
