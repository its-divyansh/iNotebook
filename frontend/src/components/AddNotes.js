import React, { useContext, useState } from 'react'
import noteContext from '../contexts/notes/noteContext'

const AddNotes = (props) => {
  const context= useContext(noteContext);
  const {addNotes}=context;

  const [note,setNote]= useState({title:"", description:"",tags:""});
    const handleClick=(e)=>{
       e.preventDefault();
        addNotes(note);
        props.showAlert("Successfully added the note","success")
        setNote({title:"", description:"",tags:""});
    }

    const onChange= (e)=>{
        setNote({...note,[e.target.name]:e.target.value});
    }
     
    
  return (
    <div className="container my-3  border p-3 rounded my-3 text-light" style={{width:"70%",backgroundColor:"rgb(143 127 108 / 59%)"}}>
        <h2 className="my-2 text-dark text-center">Add a Note</h2>
        <form className="my-3">
          <div className="form-group my-2">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              aria-describedby="emailHelp"
              placeholder="Enter title here"
              onChange={onChange}
              value={note.title}
            />
          </div>
          <div className="form-group my-2">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              placeholder="Enter description here"
              onChange={onChange}
              value={note.description}
            />
          </div>
          <div className="form-group my-2">
            <label htmlFor="tags">Tags </label>
            <input
              type="text"
              className="form-control"
              id="tags"
              name="tags"
              placeholder="Enter tags here"
              onChange={onChange}
              value={note.tags}
            />
          </div>
          <div className="text-center pt-2">
          <button disabled={note.title.length<3 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>
            Add Note
          </button>
          </div>
        </form>
      </div>
  )
}

export default AddNotes
