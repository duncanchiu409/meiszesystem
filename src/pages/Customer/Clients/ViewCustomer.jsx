import React, {useState, useEffect} from 'react'
import {db} from "../../../firebase";
import{NavLink, useParams} from "react-router-dom"
import "./AddEdit.css";
import {ref, onValue } from 'firebase/database'

const ViewCustomer = () => {
    const [customers, setCustomers] = useState([]);
    
    const {id}=useParams();

    useEffect(() => {
        const getCustomers = () => {
          onValue(ref(db, 'customers/' + id ) , (snapshot) => {
      
           if(snapshot.val() !==null){
             setCustomers({...(snapshot.val())})
             
           }
         });
       }
        getCustomers();

          
    },[id]);
  return (
    <div className="main">
    <div className="App" style={{width:"100%", padding:"100px", height:"1000px"}}>
      
  
    <div style={{padding: "0px 400px"}} className="container" >
            <div className='card-header'>
                <h1>Customer #{id}</h1>
            </div>
            <div className='view-container'>
                <br/>
                <br/>
                <strong>Name:</strong>
                <br/>
                <span>{customers.name}</span>
                <br/>
                <br/>
                <strong>Mobile:</strong>
                <br/>
                <span>{customers.mobile}</span>
                <br/>
                <br/>
                <strong>Address:</strong>
                <br/>
                <span>{customers.address}</span>
                <br/>
                <br/>
                <strong>Email:</strong>
                <br/>
                <span>{customers.email}</span>
                <br/>
                <br/>
                
                <strong>Date of Join:</strong>
                <br/>
                <span>{customers.doj}</span>
                <br/>
                <br/>
                <div className='text-center'>
                        
                        <NavLink to="/mainmeun/customer/clients/" className='btn-delete'>Go Back</NavLink>
                </div>
            </div>
        </div>
        </div>
        </div>
  )
}

export default ViewCustomer
