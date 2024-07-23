// src/utils/localStorage.js
const STORAGE_KEY = "notes-app";

export const saveNotes = (notes) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
};

export const loadNotes = () => {
  const savedNotes = localStorage.getItem(STORAGE_KEY);
  return savedNotes ? JSON.parse(savedNotes) : [];
};
