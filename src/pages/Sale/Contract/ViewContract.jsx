import React, {useState, useEffect} from 'react'
import {db} from "../../../firebase";
import{NavLink , useParams} from "react-router-dom"
import './AddEdit.css'
import {ref , onValue } from 'firebase/database'

const ViewContract = () => {
    const [Contract, setContract] = useState([]);
    
    const {id}=useParams();
    
    useEffect(() => {
        const getContract = () => {
          onValue(ref(db, 'Contract/' + id ) , (snapshot) => {
      
           if(snapshot.val() !==null){
             setContract({...(snapshot.val())})
             
           }
         });
       }
        getContract();

          
    },[id]);


    return (
        <div className="main">
        <div className="App" style={{width:"100%", padding:"100px", height:"1000px"}}>
      
  
        <div style={{padding: "0px 450px"}} className="container" >
            <div className='card-header'>
                <h1>Contract #{Contract.no}</h1>
            </div>
            <div className='view-container'>
                <br/>
                <strong>Date:</strong>
                <br/>
                <span>{Contract.date}</span>
                <br/>
                <br/>
                <strong>Buyer:</strong>
                <br/>
                <span>{Contract.buyer}</span>
                <br/>
                <br/>
                <strong>Item:</strong>
                <br/>
                <span>{Contract.item}</span>
                <br/>
                <br/>
                <strong>Quantity:</strong>
                <br/>
                <span>{Contract.quantity}</span>
                <br/>
                <br/>
                <strong>Price:</strong>
                <br/>
                <span>{Contract.price}</span>
                <br/>
                <br/>
                <strong>Total:</strong>
                <br/>
                <span>{Contract.total}</span>
                <br/>
                <br/>
                
                <div className='text-center'>
                        
                        <NavLink to="/mainmeun/sale/contract" className='btn-delete'>Go Back</NavLink>
                
                </div>
            </div>
        </div>
        </div>
        </div>
    )
}

export default ViewContract
