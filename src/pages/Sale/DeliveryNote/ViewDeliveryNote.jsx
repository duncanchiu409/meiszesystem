import React, {useState, useEffect} from 'react'
import {db} from "../../../firebase";
import{NavLink , useParams} from "react-router-dom"
import './AddEdit.css'
import {ref , onValue } from 'firebase/database'

const ViewDeliveryNote = () => {
    const [DeliveryNote, setDeliveryNote] = useState([]);
    
    const {id}=useParams();
    
    useEffect(() => {
        const getDeliveryNote = () => {
          onValue(ref(db, 'DeliveryNote/' + id ) , (snapshot) => {
      
           if(snapshot.val() !==null){
             setDeliveryNote({...(snapshot.val())})
             
           }
         });
       }
        getDeliveryNote();

          
    },[id]);


    return (
        <div className="main">
        <div className="App" style={{width:"100%", padding:"100px", height:"1000px"}}>
      
  
        <div style={{padding: "0px 450px"}} className="container" >
            <div className='card-header'>
                <h1>Delivery Note</h1>
            </div>
            <div className='view-container'>
                <br/>
                <strong>Delivery Note No:</strong>
                <br/>
                <span>{DeliveryNote.no}</span>
                <br/>
                <br/>
                <strong>Date:</strong>
                <br/>
                <span>{DeliveryNote.date}</span>
                <br/>
                <br/>
                <strong>Buyer:</strong>
                <br/>
                <span>{DeliveryNote.buyer}</span>
                <br/>
                <br/>
                <strong>Item:</strong>
                <br/>
                <span>{DeliveryNote.item}</span>
                <br/>
                <br/>
                <strong>Quantity:</strong>
                <br/>
                <span>{DeliveryNote.quantity}</span>
                <br/>
                <br/>
                <strong>Price:</strong>
                <br/>
                <span>{DeliveryNote.price}</span>
                <br/>
                <br/>
                <strong>Total:</strong>
                <br/>
                <span>{DeliveryNote.total}</span>
                <br/>
                <br/>
                
                <div className='text-center'>
                        
                        <NavLink to="/mainmeun/sale/deliverynote" className='btn-delete'>Go Back</NavLink>
                
                </div>
            </div>
        </div>
        </div>
        </div>
    )
}

export default ViewDeliveryNote
