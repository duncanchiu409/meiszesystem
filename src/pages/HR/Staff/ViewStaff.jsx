import React, {useState, useEffect} from 'react'
import {db} from "../../../firebase";
import{NavLink , useParams} from "react-router-dom"
import './AddEdit.css'
import {ref , onValue } from 'firebase/database'

const ViewStaff = () => {
    const [staff, setStaff] = useState([]);
    
    const {id}=useParams();
    
    useEffect(() => {
        const getStaff = () => {
          onValue(ref(db, 'staff/' + id ) , (snapshot) => {
      
           if(snapshot.val() !==null){
             setStaff({...(snapshot.val())})
             
           }
         });
       }
        getStaff();

          
    },[id]);


    return (
        <div className="main">
        <div className="App" style={{width:"100%", padding:"100px", height:"1000px"}}>
      
  
        <div style={{padding: "0px 450px"}} className="container" >
            <div className='card-header'>
                <h1>Staff #{id}</h1>
            </div>
            <div className='view-container'>
                <br/>
                <strong>Staff No:</strong>
                <br/>
                <span>{staff.staffno}</span>
                <br/>
                <br/>
                <strong>Name:</strong>
                <br/>
                <span>{staff.name}</span>
                <br/>
                <br/>
                <strong>Department:</strong>
                <br/>
                <span>{staff.department}</span>
                <br/>
                <br/>
                <strong>Position:</strong>
                <br/>
                <span>{staff.position}</span>
                <br/>
                <br/>
                <strong>Date Of Entry:</strong>
                <br/>
                <span>{staff.doe}</span>
                <br/>
                <br/>
                <strong>Mobile:</strong>
                <br/>
                <span>{staff.mobile}</span>
                <br/>
                <br/>
                <strong>Salary:</strong>
                <br/>
                <span>${staff.salary}</span>
                <br/>
                <br/>
                <div className='text-center'>
                        
                        <NavLink to="/mainmeun/hr/staff" className='btn-delete'>Go Back</NavLink>
                </div>
            </div>
        </div>
        </div>
        </div>
    )
}

export default ViewStaff
