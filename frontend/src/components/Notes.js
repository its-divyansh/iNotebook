import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../contexts/notes/noteContext";
import NoteItem from "./NoteItem";
import AddNotes from "./AddNotes";
import { useNavigate } from "react-router-dom";

const Notes = (props) => {
  const navigate=useNavigate();
  const { notes, fetchAllNotes, updateNotes } = useContext(noteContext);
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etags: "",
  });
  useEffect(() => {
    // console.log(localStorage.getItem('token'));
    // navigate('/login');
    if(localStorage.getItem('token')===null){navigate('/login');}
    else {fetchAllNotes();}
    //eslint-disable-next-line
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);

  const updateNote = (note) => {
    ref.current.click();

    setNote({
      id: note._id,
      etitle: note.title,
      edescription: note.description,
      etags: note.tags,
    });
  };

  const handleClick = () => {
    updateNotes(note.id, note.etitle, note.edescription, note.etags);
    // console.log("note updated");
    refClose.current.click();
    props.showAlert("Note updated successfully", "success");
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <>
      <AddNotes showAlert={props.showAlert}/>
      <button
        type="button"
        ref={ref}
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="form-group my-2">
                  <label htmlFor="etitle">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    aria-describedby="emailHelp"
                    placeholder="Enter title here"
                    value={note.etitle}
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="form-group my-2">
                  <label htmlFor="edescription">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    placeholder="Enter description here"
                    value={note.edescription}
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="form-group my-2">
                  <label htmlFor="etags">Tags </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etags"
                    name="etags"
                    placeholder="Enter tags here"
                    value={note.etags}
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                ref={refClose}
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                disabled={
                  note.etitle.length < 3 || note.edescription.length < 5
                }
                type="button"
                className="btn btn-primary"
                onClick={handleClick}
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h1 className="my-2 text-dark text-center">Your Notes</h1>
        <div className="container mx-2">
          {notes.length === 0 && "No notes to display"}
        </div>
        {notes.map((note) => {
          return (
            <NoteItem note={note} updateNote={updateNote} key={note._id} showAlert={props.showAlert} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
