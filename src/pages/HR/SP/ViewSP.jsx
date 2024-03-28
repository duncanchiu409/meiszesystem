import React, {useState, useEffect} from 'react'
import {db} from "../../../firebase";
import{NavLink , useParams} from "react-router-dom"
import './AddEdit.css'
import {ref , onValue } from 'firebase/database'


const ViewSP = () => {
  const [shift, setShift] = useState([]);
    
    const {id}=useParams();

    useEffect(() => {
        const getShift = () => {
          onValue(ref(db, 'shiftpattern/' + id ) , (snapshot) => {
      
           if(snapshot.val() !==null){
             setShift({...(snapshot.val())})
             
           }
         });
       }
        getShift();

          
    },[id]);

  return (
    <div className="main">
        <div className="App" style={{width:"100%", padding:"100px", height:"1000px"}}>
      
  
        <div style={{padding: "0px 450px"}} className="container" >
                <h1>Shift Pattern #{id}</h1>
            </div>
            <div className='view-container'>
                <br/>
                <strong>Shift:</strong>
                <br/>
                <span>{shift.position}</span>
                <br/>
                <br/>
                <strong>Shift:</strong>
                <br/>
                <span>{shift.shiftpattern}</span>
                <br/>
                <br/>
                
                <div className='text-center'>
                        
                        <NavLink to="/mainmeun/hr/sp" className='btn-delete'>Go Back</NavLink>
                </div>
            </div>
        </div>
        </div>
  )
}

export default ViewSP
