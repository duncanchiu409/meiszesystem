import React, { useState } from "react";
import { db } from "../../../firebase";
import { uid } from "uid";
import { NavLink, useNavigate } from "react-router-dom";
import "./AddEdit.css";
import { ref, set } from "firebase/database";

const AddEditSP = () => {
  const [newPosition, setNewPosition] = useState("");
  const [newShiftPattern, setNewShiftPattern] = useState("");
  const navigate = useNavigate()

  const createUser = () => {
  
    
  
      const uuid = uid();

      set(ref(db,'shiftpattern/' + uuid),{
          position: newPosition,
          shiftpattern: newShiftPattern,
      })
    
      navigate('/mainmeun/hr/sp')
      
  };

return (
  <div className="main">
    <div className="App" style={{width:"100%", padding:"100px", height:"1000px"}}>
  

    <div style={{padding: "0px 215px"}} className="container" >
              <h1>Add Shift Pattern</h1>
              <form 
                  style ={{
                      margin: "auto",
                      padding: "15px",
                      maxWidth: "400px",
                      justifyContent: "center",
                      alignContent: "center",
                  }}
              >
                  <input className='input-add' placeholder="Shift..." onChange={(event) => {setNewPosition(event.target.value)}}/>
                  <input className='input-add' placeholder="Shift Pattern..." onChange={(event) => {setNewShiftPattern(event.target.value)}}/>
                  <div className='text-center'>
                      <button className='btn-create' onClick={createUser}>Create Shift Pattern</button>
                      <NavLink to="/mainmeun/hr/sp" className='btn-delete'>Cancel</NavLink>
                  </div>
                  

              </form>
          </div>
          
      
          
      </div>
    
  </div>
)
}

export default AddEditSP
