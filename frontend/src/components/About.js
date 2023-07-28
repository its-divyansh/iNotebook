import React, {useContext} from 'react'
import noteContext from '../contexts/notes/noteContext';
import { useEffect } from 'react';

const About = () => {
//  const a=useContext(noteContext);

//   useEffect(
//     ()=>{
//       a.update();
//       // eslint-disable-next-line
//   },[])

  return (
      <div className='container'>
      This is about page
      {/* This is about {a.state.name}; */}
    </div>
  )
}

export default About
