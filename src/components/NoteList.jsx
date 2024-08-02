import React, { useContext, useState } from "react";
import { GroupContext } from "../contexts/GroupContext";
import { createNote } from "../services/api";
import MainPage from "./MainPage";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const NoteList = () => {
  const { selectedGroup, notes, setNotes } = useContext(GroupContext);
  const [newNote, setNewNote] = useState("");

  const getInitials = (name) => {
    const words = name.split(" ");
    return words
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  const handleAddNote = async () => {
    if (newNote.trim()) {
      try {
        const response = await createNote({
          content: newNote,
          groupId: selectedGroup._id,
        });
        console.log("Note added:", response.data);
        setNotes((prevNotes) => [...prevNotes, response.data]);
        setNewNote("");
      } catch (error) {
        console.error("Error adding note:", error);
      }
    }
  };

  const formatDate = (dateString) => {
    return moment(dateString).format("D MMM YYYY • h:mm A");
  };

  if (!selectedGroup) {
    return <MainPage />;
  }

  return (
    <div className="flex flex-col flex-1 h-screen bg-blue-100">
      <div className="p-4 bg-blue-900 h-[98px] flex justify-start items-center">
        <div
          className="flex items-center justify-center w-16 h-16 mr-6 text-xl font-medium text-white rounded-full"
          style={{ backgroundColor: selectedGroup.color }}
        >
          {getInitials(selectedGroup.name)}
        </div>
        <h2 className="text-2xl font-bold text-white"> {selectedGroup.name}</h2>
      </div>

      <div className="h-[58%] p-4 overflow-y-auto">
        {notes.length === 0 ? (
          <div className="flex items-center justify-center h-full text-xl font-medium text-gray-500">
            No notes added yet
          </div>
        ) : (
          <ul>
            {notes.map((note) => (
              <li
                className="relative h-32 p-4 my-3 bg-white rounded-md shadow-lg"
                key={note._id}
              >
                <p>{note.content}</p>
                <p className="absolute font-semibold bottom-2 right-6">
                  {formatDate(note.createdAt)}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="fixed w-full h-[230px] p-4 bg-blue-900 bottom-0 rounded-xl">
        <textarea
          style={{ resize: "none" }}
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          className="p-2 border rounded-lg w-[73%] h-[80%] ml-3 mt-3 focus:outline-none text-2xl"
          placeholder="Enter your text here..."
        />
        <button
          onClick={handleAddNote}
          disabled={!newNote.trim()}
          className={`absolute z-30 text-black bottom-14 left-[70%] text-2xl ${
            newNote.trim() ? "text-blue-600" : "text-gray-400"
          }`}
        >
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </div>
    </div>
  );
};

export default NoteList;
