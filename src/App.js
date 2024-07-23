// src/App.js
import React, { useState, useEffect } from "react";
import { saveNotes, loadNotes } from "./utils/localStorage";
import NoteList from "./components/NoteList";
import NoteEditor from "./components/NoteEditor";
import "./styles.css";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    setNotes(loadNotes());
    const savedDarkMode = JSON.parse(localStorage.getItem("dark-mode"));
    setDarkMode(savedDarkMode);
    document.body.className = savedDarkMode ? "dark-mode" : "light-mode";
  }, []);

  useEffect(() => {
    saveNotes(notes);
  }, [notes]);

  useEffect(() => {
    localStorage.setItem("dark-mode", JSON.stringify(darkMode));
    document.body.className = darkMode ? "dark-mode" : "light-mode";
  }, [darkMode]);

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

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const selectedNote = notes.find((note) => note.id === selectedNoteId) || {};

  return (
    <div className="app">
      <button onClick={toggleDarkMode}>
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
      <NoteList notes={notes} onSelect={handleSelectNote} />
      <NoteEditor note={selectedNote} onSave={handleSaveNote} />
    </div>
  );
};

export default App;
