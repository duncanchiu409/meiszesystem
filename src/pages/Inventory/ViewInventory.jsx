import React, {useState, useEffect} from 'react'
import {db} from "../../firebase";
import{NavLink, useParams} from "react-router-dom"
import "./AddEdit.css";
import {ref, onValue } from 'firebase/database'

const ViewInventory = () => {
    const [inventory, setInventory] = useState([]);
    
    const {id}=useParams();
    
    useEffect(() => {
        const getInventory = () => {
          onValue(ref(db, 'inventory/' + id ) , (snapshot) => {
      
           if(snapshot.val() !==null){
            setInventory({...(snapshot.val())})
             
           }
         });
       }
        getInventory();

          
    },[id]);

  return (
    <div className="main">
        <div className='App' style={{width:"100%", padding:"100px", height:"1000px"}}>
        <div style={{padding: "0px 450px"}} className="container" >
            <div className='card-header'>
                <h1>Inventory Order #{id}</h1>
            </div>
            <div className='view-container'>
                <br/>
                <strong>ID:</strong>
                <br/>
                <span>{id}</span>
                <br/>
                <br/>
                <strong>Sales Status:</strong>
                <br/>
                <span>{inventory.salesstatus}</span>
                <br/>
                <br/>
                <strong>Order No:</strong>
                <br/>
                <span>{inventory.orderno}</span>
                <br/>
                <br/>
                <strong>Date:</strong>
                <br/>
                <span>{inventory.date}</span>
                <br/>
                <br/>
                <strong>Customer:</strong>
                <br/>
                <span>{inventory.customer}</span>
                <br/>
                <br/>
                <strong>Product:</strong>
                <br/>
                <span>{inventory.product}</span>
                <br/>
                <br/>
                <div className='text-center'>
                        
                        <NavLink to="/mainmeun/inventory" className='btn-delete'>Go Back</NavLink>
                </div>
            </div>
            </div>
        </div>
        </div>
  )
}

export default ViewInventory
