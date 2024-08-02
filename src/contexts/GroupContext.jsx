import React, { createContext, useState, useEffect } from "react";
import { fetchGroups, fetchNotes } from "../services/api";

export const GroupContext = createContext();

export const GroupProvider = ({ children }) => {
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const getGroups = async () => {
      try {
        const response = await fetchGroups();
        setGroups(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getGroups();
  }, []);

  useEffect(() => {
    const getNotes = async () => {
      if (selectedGroup) {
        try {
          const response = await fetchNotes(selectedGroup._id);
          setNotes(response.data);
        } catch (error) {
          console.error(error);
        }
      }
    };
    getNotes();
  }, [selectedGroup]);

  return (
    <GroupContext.Provider
      value={{
        groups,
        setGroups,
        selectedGroup,
        setSelectedGroup,
        notes,
        setNotes,
      }}
    >
      {children}
    </GroupContext.Provider>
  );
};
