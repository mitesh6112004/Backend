import React, { useEffect, useState } from "react";
import axios from "axios";
import NoteCard from "./componets/NoteCard";

const App = () => {
  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
  });

  const [allNotes, setAllNotes] = useState([]);

  const [updateNoteId, setUpdateNoteId] = useState(null) ; 


  const handleChange = (e) => {
    setFormValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (updateNoteId) {
      try {
         await axios.put(
          `http://localhost:3000/notes/${updateNoteId}`,
          formValues,
        );

        
        setFormValues({
          title: "",
          description: "",
        });

        setUpdateNoteId(null);
      
      } catch (error) {
        console.log("Create Note error:", error);
      }

    } else {
        try {
          await axios.post(
            "http://localhost:3000/notes/create",
            formValues,
          );

          
          setFormValues({
            title: "",
            description: "",
          });

          
        } catch (error) {
          console.log("Create Note error:", error);
        }
    }
      
      getAllnotes();
  };

  
  const getAllnotes = async () => {
    try {
      const res = await axios.get("http://localhost:3000/notes/allnotes");

      setAllNotes(res.data.data);
    } catch (error) {
      console.log("All Notes error:", error);
    }
  };

  
  const deleteNote = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/notes/${id}`);

      getAllnotes();
    } catch (error) {
      console.log("Delete Note error:", error);
    }
  };

  const updateNote = (note) => {
      
      setFormValues({
        title: note.title,
        description : note.description
      });
      setUpdateNoteId(note._id); 

  }
 
  useEffect(() => {
    getAllnotes();
  }, []);

  return (
    <div className="min-h-screen p-5 flex flex-col gap-5">
      <h1 className="text-3xl font-semibold">Notes App</h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-70 border border-amber-500 p-5 rounded-2xl gap-4"
      >
        <input
          onChange={handleChange}
          name="title"
          value={formValues.title}
          className="border border-amber-300 p-3 rounded-xl outline-0"
          type="text"
          placeholder="Title"
        />

        <input
          onChange={handleChange}
          name="description"
          value={formValues.description}
          className="border border-amber-300 p-3 rounded-xl outline-0"
          type="text"
          placeholder="Description"
        />

        <button type="submit" className="bg-blue-600 p-3 rounded-xl text-white">
          {updateNoteId ? "Update Note" : "Add Note"}
        </button>
      </form>

      <div className="flex gap-2 flex-wrap">
        {allNotes.map((val) => (
          <NoteCard
            key={val._id}
            note={val}
            deleteNote={deleteNote}
            updateNote={updateNote}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
