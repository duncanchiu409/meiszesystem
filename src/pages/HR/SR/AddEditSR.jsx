import React, {useState} from 'react'
import {db} from "../../../firebase";
import {uid} from "uid";
import{NavLink, useNavigate} from "react-router-dom"
import './AddEdit.css'
import {ref, set } from 'firebase/database'

const AddEditSR = () => {
    const [newName, setNewName] = useState("");
    const [newStaffNo, setStaffNo] = useState(0);
    const [newPosition, setNewPosition] = useState("");
    const [newMobile, setNewMobile] = useState(0);
    const [newSalary, setNewSalary] = useState(0);
    const [newCommission, setNewCommission] = useState(0);
    const [newMonth, setNewMonth] = useState("");

    const navigate = useNavigate()
      const createUser = () => {
      
        
      
        const uuid = uid();
  
        set(ref(db,'salaryreport/' + uuid),{
          name:newName, 
          staffno:newStaffNo,
          position:newPosition,
          mobile: newMobile,
          salary: newSalary,
          commission: newCommission,
          month: newMonth,
        })
      
        navigate('/mainmeun/hr/sr')
        
    };

  return (
    <div className="main">
        <div className="App" style={{width:"100%", padding:"100px", height:"1000px"}}>
      
  
        <div style={{padding: "0px 215px"}} className="container" >
                  <h1>Add Salary And MPF Report</h1>

                  
                  <form 
                      style ={{
                          margin: "auto",
                          padding: "15px",
                          maxWidth: "400px",
                          justifyContent: "center",
                          alignContent: "center",
                      }}
                  >
                    
                      <input className='input-add' placeholder="Name..." onChange={(event) => {setNewName(event.target.value)}}/>      
                      <input className='input-add' value={newStaffNo || ""} placeholder="Staff No..." onChange={(event) => {setStaffNo(event.target.value)}}/>
                      <input className='input-add' placeholder="Position..." value={newPosition || ""} onChange={(event) => {setNewPosition(event.target.value)}}/>
                      <select className='input-add' placeholder="Month..." onChange={(event) => {setNewMonth(event.target.value)}}>
                        <option>Jan</option>
                        <option>Feb</option>
                        <option>Mar</option>
                        <option>Apr</option>
                        <option>May</option>
                        <option>Jun</option>
                        <option>Jul</option>
                        <option>Aug</option>
                        <option>Sep</option>
                        <option>Oct</option>
                        <option>Nov</option>
                        <option>Dec</option>
                      </select>
                      <input className='input-add' type='number' value={newMobile || ""} placeholder='Mobile...' onChange={(event) => {setNewMobile(event.target.value)}}/>
                      <input className='input-add' type='number' value={newSalary || ""} placeholder='Salary...' onChange={(event) => {setNewSalary(event.target.value)}}/>
                      <input className='input-add' type='number' value={newCommission || ""} placeholder='Commission...' onChange={(event) => {setNewCommission(event.target.value)}}/>
                      <div className='text-center'>
                          <button className='btn-create' onClick={createUser}>Create Staff</button>
                          <NavLink to="/mainmeun/hr/sr" className='btn-delete'>Cancel</NavLink>
                      </div>
                       
                  </form>
                   
              </div>
              
          
              
          </div>
        
      </div>
  )
}

export default AddEditSR
