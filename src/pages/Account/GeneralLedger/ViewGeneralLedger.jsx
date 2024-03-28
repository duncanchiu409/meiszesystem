import React, {useState, useEffect} from 'react'
import {db} from "../../../firebase";
import{NavLink, useParams} from "react-router-dom"
import './AddEdit.css'
import {ref, onValue } from 'firebase/database'

const ViewGeneralLedger = () => {
    const [GeneralLedger, setGeneralLedger] = useState([]);
    
    const {id}=useParams();
    
    useEffect(() => {
        const getGeneralLedger = () => {
          onValue(ref(db, 'GeneralLedger/' + id ) , (snapshot) => {
      
           if(snapshot.val() !==null){
             setGeneralLedger({...(snapshot.val())})
             
           }
         });
       }
        getGeneralLedger();

          
    },[id]);


    return (
        <div className="main">
        <div className="App" style={{width:"100%", padding:"100px", height:"1000px"}}>
      
  
        <div style={{padding: "0px 450px"}} className="container" >
            <div className='card-header'>
                <h1>General Ledger #{id}</h1>
            </div>
            <div className='view-container'>
                <br/>
                <strong>Date:</strong>
                <br/>
                <span>{GeneralLedger.date}</span>
                <br/>
                <br/>
                <strong>Category Of Account:</strong>
                <br/>
                <span>{GeneralLedger.coa}</span>
                <br/>
                <br/>
                <strong>Description:</strong>
                <br/>
                <span>{GeneralLedger.description}</span>
                <br/>
                <br/>
                <strong>Amount:$</strong>
                <br/>
                <span>{GeneralLedger.amount}</span>
                <br/>
                <br/>
                <div className='text-center'>
                        
                        <NavLink to="/mainmeun/account/generalledger" className='btn-delete'>Go Back</NavLink>
                </div>
            </div>
        </div>
        </div>
        </div>
    )
}

export default ViewGeneralLedger
