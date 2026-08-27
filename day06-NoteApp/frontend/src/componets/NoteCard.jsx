import React from 'react'

const NoteCard = ({ note, deleteNote, updateNote }) => {
  return (
    <div className=" w-[20%] p-2 border flex flex-col gap-3 border-amber-500 rounded-xl">
      <h1>{note.title}</h1>
      <p className="text-xs">{note.description}</p>
      <div className="flex justify-between">
        <button onClick={() => updateNote(note)} className="bg-red-600 text-white p-2 rounded-xl">Update</button>
        <button
          onClick={() => deleteNote(note._id)}
          className="bg-yellow-500 text-white p-2 rounded-xl"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default NoteCard
