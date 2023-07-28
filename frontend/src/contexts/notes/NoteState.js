import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000/";
  const initialNotes = [];
  const [notes, setNotes] = useState(initialNotes);

  // fetching All Notes

  const fetchAllNotes = async () => {
    const url = `${host}api/notes/fetchallnotes`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
    });
    const json = await response.json();
    // console.log(json);
    setNotes(json);
  };

  //Adding a note

  const addNotes = async ({ title, description, tags }) => {
    const url = `${host}api/notes/addnotes`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tags }),
    });
    const json = await response.json();
    setNotes(notes.concat(json));
  };

  //Updating a Note

  const updateNotes = async ( _id, title, description, tags) => {
    const url = `${host}api/notes/updatenotes/${_id}`;
    await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tags }),
    });
    // const json = response.json();
    let newNotes=JSON.parse(JSON.stringify(notes));
    for (let i = 0; i < notes.length; i++) {
      if (newNotes[i]._id === _id) {
        newNotes[i].title = title;
        newNotes[i].description = description;
        newNotes[i].tags = tags;
        break;
      }
    }
    setNotes(newNotes);
  };

  //Deleting a Note
  const deleteNotes = async (id) => {
    const url = `${host}api/notes/deletenotes/${id}`;
    await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
    });
    // const json = await response.json();
    // console.log(json);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  return (
    // ye ek object hai jisme state ki value state hai aur update ki value update hai
    // <NoteContext.Provider value={{state, update}}>
    <NoteContext.Provider
      value={{ notes, addNotes, deleteNotes, updateNotes, fetchAllNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
