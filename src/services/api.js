import axios from "axios";

const API_BASE_URL = "https://pocket-notes-backend-lc8e.onrender.com";

export const fetchGroups = () => axios.get(`${API_BASE_URL}/groups`);
export const createGroup = (group) =>
  axios.post(`${API_BASE_URL}/group`, group);
export const fetchNotes = (groupId) =>
  axios.get(`${API_BASE_URL}/notes/${groupId}`);
export const createNote = (note) => axios.post(`${API_BASE_URL}/note`, note);
