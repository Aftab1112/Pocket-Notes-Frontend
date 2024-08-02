import React, { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { createGroup as createGroupAPI } from "../services/api";

const CreateGroupModal = ({ isOpen, closeModal, createGroup }) => {
  const [groupName, setGroupName] = useState("");
  const [groupColor, setGroupColor] = useState("");

  const handleCreateGroup = async () => {
    if (groupName.trim()) {
      try {
        const response = await createGroupAPI({
          name: groupName,
          color: groupColor,
        });
        createGroup(response.data);
        closeModal();
      } catch (error) {
        console.error("Error creating group:", error);
      }
    }
  };

  return (
    <>
      <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/60 duration-100 ease-out data-[closed]:opacity-0"
        />
        <div className="fixed inset-0 flex items-center justify-center w-screen p-4 ml-10">
          <DialogPanel className="p-12 space-y-4 bg-white border rounded-lg w-[740px] h-[317px] flex flex-col">
            <DialogTitle className="text-xl font-bold">
              Create New Group
            </DialogTitle>
            <div className="flex flex-col">
              <div className="flex items-center gap-10">
                <p className="text-xl font-bold">Group Name</p>
                <input
                  required
                  type="text"
                  className="w-[50%] p-2 pl-5 mt-2 border rounded-2xl"
                  placeholder="Enter group name"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                />
              </div>
              <div className="flex items-center mt-8">
                <h4 className="mb-2 text-xl font-bold">Choose color</h4>
                <div className="flex ml-10 space-x-2">
                  {[
                    "#B38BFA",
                    "#FF79F2",
                    "#43E6FC",
                    "#F19576",
                    "#0047FF",
                    "#6691FF",
                  ].map((color) => (
                    <div
                      key={color}
                      className={`w-8 h-8 rounded-full cursor-pointer ${
                        groupColor === color
                          ? "ring-2 ring-offset-2 ring-blue-500"
                          : ""
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => setGroupColor(color)}
                    />
                  ))}
                </div>
              </div>
              <div className="relative flex w-full gap-4 mt-4">
                <button
                  className="absolute right-0 px-4 py-1 w-[155px] font-medium text-white bg-blue-900 rounded-md mt-10"
                  onClick={handleCreateGroup}
                >
                  Create
                </button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};

export default CreateGroupModal;
