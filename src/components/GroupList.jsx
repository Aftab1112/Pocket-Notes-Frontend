import React, { useContext, useState } from "react";
import { GroupContext } from "../contexts/GroupContext";
import CreateGroupModal from "./CreateGroupModal";

const GroupList = () => {
  const { groups, setSelectedGroup, setGroups } = useContext(GroupContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleCreateGroup = (newGroup) => {
    setGroups((prevGroups) => [...prevGroups, newGroup]);
  };

  const getInitials = (name) => {
    if (!name) return "";
    const words = name.split(" ");
    return words
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="relative flex flex-col w-1/4 h-screen p-4 bg-white">
      <h2 className="pb-6 text-3xl font-semibold text-center">Pocket Notes</h2>
      <ul className="flex-1 mt-4 ml-4 overflow-y-auto">
        {groups.length === 0 ? (
          <li className="flex items-center justify-center h-full text-xl font-medium text-gray-500">
            No groups added yet
          </li>
        ) : (
          groups.map((group) => (
            <li
              key={group._id}
              className="flex items-center my-6 cursor-pointer"
              onClick={() => setSelectedGroup(group)}
            >
              <div
                className="flex items-center justify-center w-16 h-16 mr-6 text-xl font-medium text-white rounded-full"
                style={{ backgroundColor: group.color }}
              >
                {getInitials(group.name)}
              </div>
              <span className="text-lg font-medium">{group.name}</span>
            </li>
          ))
        )}
      </ul>

      <button
        className="absolute w-20 h-20 text-white bg-blue-900 rounded-full bottom-10 right-5"
        onClick={openModal}
      >
        <div className="pb-3 text-6xl">+</div>
      </button>

      <CreateGroupModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        createGroup={handleCreateGroup}
      />
    </div>
  );
};

export default GroupList;
