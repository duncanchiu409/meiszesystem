import React, {useState, useEffect} from 'react'
import {db} from "../../../firebase";
import{NavLink, useParams} from "react-router-dom"
import './AddEdit.css'
import {ref, onValue } from 'firebase/database'

const ViewAccountPayable = () => {
    const [accountpayable, setAccountPayable] = useState([]);
    
    const {id}=useParams();
    
    useEffect(() => {
        const getAccountPayable = () => {
          onValue(ref(db, 'accountpayable/' + id ) , (snapshot) => {
      
           if(snapshot.val() !==null){
             setAccountPayable({...(snapshot.val())})
             
           }
         });
       }
        getAccountPayable();

          
    },[id]);


    return (
        <div className="main">
        <div className="App" style={{width:"100%", padding:"100px", height:"1000px"}}>
      
  
        <div style={{padding: "0px 450px"}} className="container" >
            <div className='card-header'>
                <h1>Account Payable #{id}</h1>
            </div>
            <div className='view-container'>
                <br/>
                <strong>Date:</strong>
                <br/>
                <span>{accountpayable.date}</span>
                <br/>
                <br/>
                <strong>Description:</strong>
                <br/>
                <span>{accountpayable.description}</span>
                <br/>
                <br/>
                <strong>Amount:$</strong>
                <br/>
                <span>{accountpayable.amount}</span>
                <br/>
                <br/>
                <div className='text-center'>
                        
                        <NavLink to="/mainmeun/account/accountpayable" className='btn-delete'>Go Back</NavLink>
                </div>
            </div>
        </div>
        </div>
        </div>
    )
}

export default ViewAccountPayable
