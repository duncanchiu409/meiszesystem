import React, {useState, useEffect} from 'react'
import {db} from "../../../firebase";
import{NavLink, useNavigate, useParams} from "react-router-dom"
import './AddEdit.css'
import {ref, set, onValue } from 'firebase/database'

const UpdateSR = () => {
    const [newName, setNewName] = useState("");
    const [newStaffNo, setStaffNo] = useState(0);
    const [newPosition, setNewPosition] = useState("");
    const [newMobile, setNewMobile] = useState(0);
    const [newSalary, setNewSalary] = useState(0);
    const [newMonth, setNewMonth] = useState("");
    const [newCommission, setNewCommission] = useState(0);
    const [salaryReport, setSalaryReport] = useState([]);

    const navigate = useNavigate()
    const {id}=useParams();

    const createUser = () => {
      
  
        set(ref(db,'salaryreport/' + id),{
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

    useEffect(() => {
        const getSalaryReport = () => {
          onValue(ref(db, 'salaryreport/' + id ) , (snapshot) => {
      
           if(snapshot.val() !==null){
             setSalaryReport({...(snapshot.val())})
             
           }
         });
       }
        getSalaryReport();
        setNewName(salaryReport.name);
        setStaffNo(salaryReport.staffno);
        setNewPosition(salaryReport.position);
        setNewMobile(salaryReport.mobile);
        setNewSalary(salaryReport.salary);
        setNewCommission(salaryReport.commission);
        setNewMonth(salaryReport.month);

          
       },[id, salaryReport.name,salaryReport.staffno, salaryReport.position, salaryReport.mobile,salaryReport.commission, salaryReport.salary, salaryReport.month]);
      

  return (
    <div className="main">
        <div className="App" style={{width:"100%", padding:"100px", height:"1000px"}}>
      
  
        <div style={{padding: "0px 215px"}} className="container" >
                  <h1>Edit Salary And MPF Report</h1>

                  
                  <form 
                      style ={{
                          margin: "auto",
                          padding: "15px",
                          maxWidth: "400px",
                          justifyContent: "center",
                          alignContent: "center",
                      }}
                  >
                    
                      <input className='input-add' value={newName || ""} placeholder="Name..." onChange={(event) => {setNewName(event.target.value)}}/>      
                      <input className='input-add' value={newStaffNo || ""} placeholder="Staff No..." onChange={(event) => {setStaffNo(event.target.value)}}/>
                      <input className='input-add' placeholder="Position..." value={newPosition || ""} onChange={(event) => {setNewPosition(event.target.value)}}/>
                      <select className='input-add' value={newMonth || ""} placeholder="Month..." onChange={(event) => {setNewMonth(event.target.value)}}>
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
                      <div className='text-center'>
                      <button className='btn-create' onClick={createUser}>Edit Report</button>
                          <NavLink to="/mainmeun/hr/salaryapproval" className='btn-delete'>Cancel</NavLink>
                      </div>
                       
                  </form>
                   
              </div>
              
          
              
          </div>
        
      </div>
  )
}

export default UpdateSR
