import React, {useState, useEffect} from 'react'
import {db} from "../../../firebase";
import{NavLink , useParams} from "react-router-dom"
import './AddEdit.css'
import {ref , onValue } from 'firebase/database'

const ViewQuotation = () => {
    const [Quotation, setQuotation] = useState([]);
    
    const {id}=useParams();
    
    useEffect(() => {
        const getQuotation = () => {
          onValue(ref(db, 'Quotation/' + id ) , (snapshot) => {
      
           if(snapshot.val() !==null){
             setQuotation({...(snapshot.val())})
             
           }
         });
       }
        getQuotation();

          
    },[id]);


    return (
        <div className="main">
        <div className="App" style={{width:"100%", padding:"100px", height:"1000px"}}>
      
  
        <div style={{padding: "0px 450px"}} className="container" >
            <div className='card-header'>
                <h1>Quotation #{Quotation.no}</h1>
            </div>
            <div className='view-container'>
                <br/>
                <strong>Date:</strong>
                <br/>
                <span>{Quotation.date}</span>
                <br/>
                <br/>
                <strong>Item:</strong>
                <br/>
                <span>{Quotation.item}</span>
                <br/>
                <br/>
                <strong>Quantity:</strong>
                <br/>
                <span>{Quotation.quantity}</span>
                <br/>
                <br/>
                <strong>Price:</strong>
                <br/>
                <span>{Quotation.price}</span>
                <br/>
                <br/>
                <strong>Total:</strong>
                <br/>
                <span>{Quotation.total}</span>
                <br/>
                <br/>
                
                <div className='text-center'>
                        
                        <NavLink to="/mainmeun/sale/quotation" className='btn-delete'>Go Back</NavLink>
                
                </div>
            </div>
        </div>
        </div>
        </div>
    )
}

export default ViewQuotation
