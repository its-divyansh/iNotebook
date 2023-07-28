import React, { useContext } from "react";
import noteContext from "../contexts/notes/noteContext";

const NoteItem = (props) => {
  const { note ,updateNote, showAlert} = props;

  const context = useContext(noteContext);
  const {deleteNotes} = context;
  
  const handleDelete = () => {
    // console.log(note._id);
    deleteNotes(note._id);
     showAlert("Note deleted successfully", "success");
  };
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h5 className="card-title">{note.title}</h5>
            <i
              className="fa-solid fa-pen-to-square mx-2"
              onClick={()=>{updateNote(note)}}
            ></i>
            <i
              className="fa-sharp fa-solid fa-trash mx-2"
              onClick={handleDelete}
            ></i>
          </div>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
