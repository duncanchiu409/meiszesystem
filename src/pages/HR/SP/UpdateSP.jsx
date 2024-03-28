import React, {useState, useEffect} from 'react'
import {db} from "../../../firebase";
import{NavLink, useNavigate, useParams} from "react-router-dom"
import "./AddEdit.css";
import {ref, set, onValue } from 'firebase/database'

const UpdateSP = () => {
  const [newPosition, setNewPosition] = useState("");
    const [newShiftPattern, setNewShiftPattern] = useState("");
    const [shift, setShift] = useState([]);
    const navigate = useNavigate()
    const {id}=useParams();

    const createUser = () => {

        set(ref(db,'shiftpattern/' + id),{
          position: newPosition,
          shiftpattern: newShiftPattern,
        })
      
        navigate('/mainmeun/hr/sp')
        
    };

    useEffect(() => {
        const getShift = () => {
          onValue(ref(db, 'shiftpattern/' + id ) , (snapshot) => {
      
           if(snapshot.val() !==null){
             setShift({...(snapshot.val())})
             
           }
         });
       }
        getShift();
        setNewPosition(shift.position);
        setNewShiftPattern(shift.shiftpattern);
          
       },[id,shift.position, shift.shiftpattern]);

  return (
    <div className="main_layout">
        <div className='app' style={{padding: "100px 250px"}}>
            <div className='container'>
                <h1>Edit Shift Pattern #{id}</h1>
                
                <form 
                    style ={{
                        margin: "auto",
                        padding: "15px",
                        maxWidth: "400px",
                        justifyContent: "center",
                        alignContent: "center",
                    }}
                >
                    <input className='input-add' placeholder="Position..." value={newPosition || ""} onChange={(event) => {setNewPosition(event.target.value)}}/>
                    <input className='input-add' placeholder="Shift Pattern..." value={newShiftPattern || ""} onChange={(event) => {setNewShiftPattern(event.target.value)}}/>
                    <div className='text-center'>
                        <button className='btn-create' onClick={createUser}>Edit Shift Pattern</button>
                        <NavLink to="/mainmeun/hr/sp" className='btn-delete'>Cancel</NavLink>
                    </div>
                    

                </form>
                
            </div>
            
        
            
        </div>
      
    </div>
  )
}

export default UpdateSP
