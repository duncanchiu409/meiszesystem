import React, {useState, useEffect} from 'react'
import {db} from "../../../firebase";
import{NavLink, useParams} from "react-router-dom"
import './AddEdit.css'
import {ref, onValue } from 'firebase/database'

const ViewAccountReceivable = () => {
    const [accountReceivable, setAccountReceivable] = useState([]);
    
    const {id}=useParams();
    
    useEffect(() => {
        const getAccountReceivable = () => {
          onValue(ref(db, 'accountreceivable/' + id ) , (snapshot) => {
      
           if(snapshot.val() !==null){
             setAccountReceivable({...(snapshot.val())})
             
           }
         });
       }
        getAccountReceivable();

          
    },[id]);


    return (
        <div className="main">
        <div className="App" style={{width:"100%", padding:"100px", height:"1000px"}}>
      
  
        <div style={{padding: "0px 450px"}} className="container" >
            <div className='card-header'>
                <h1>Account Receivable #{id}</h1>
            </div>
            <div className='view-container'>
                <br/>
                <strong>Date:</strong>
                <br/>
                <span>{accountReceivable.date}</span>
                <br/>
                <br/>
                <strong>Description:</strong>
                <br/>
                <span>{accountReceivable.description}</span>
                <br/>
                <br/>
                <strong>Amount:$</strong>
                <br/>
                <span>{accountReceivable.amount}</span>
                <br/>
                <br/>
                <div className='text-center'>
                        
                        <NavLink to="/mainmeun/account/bank/accountreceivable" className='btn-delete'>Go Back</NavLink>
                </div>
            </div>
        </div>
        </div>
        </div>
    )
}

export default ViewAccountReceivable
