import React, {useState, useEffect} from 'react'
import {db} from "../../../firebase";
import{NavLink, useParams} from "react-router-dom"
import "./AddEdit.css";
import {ref, onValue } from 'firebase/database'

const ViewSupplier = () => {
    const [Supplier, setSupplier] = useState([]);
    
    const {id}=useParams();

    useEffect(() => {
        const getSupplier = () => {
          onValue(ref(db, 'Supplier/' + id ) , (snapshot) => {
      
           if(snapshot.val() !==null){
             setSupplier({...(snapshot.val())})
             
           }
         });
       }
        getSupplier();

          
    },[id]);
  return (
    <div className="main">
    <div className="App" style={{width:"100%", padding:"100px", height:"1000px"}}>
      
  
    <div style={{padding: "0px 400px"}} className="container" >
            <div className='card-header'>
                <h1>Supplier #{id}</h1>
            </div>
            <div className='view-container'>
                <br/>
                <br/>
                <strong>Supplier:</strong>
                <br/>
                <span>{Supplier.name}</span>
                <br/>
                <br/>
                <strong>Office Telephone:</strong>
                <br/>
                <span>{Supplier.ot}</span>
                <br/>
                <br/>
                <strong>Contact person:</strong>
                <br/>
                <span>{Supplier.cp}</span>
                <br/>
                <br/>
                <strong>Mobile:</strong>
                <br/>
                <span>{Supplier.mobile}</span>
                <br/>
                <br/>
                <strong>Address:</strong>
                <br/>
                <span>{Supplier.address}</span>
                <br/>
                <br/>
                <strong>Email:</strong>
                <br/>
                <span>{Supplier.email}</span>
                <br/>
                <br/>

                <div className='text-center'>
                        
                        <NavLink to="/mainmeun/customer/supplier/" className='btn-delete'>Go Back</NavLink>
                </div>
            </div>
        </div>
        </div>
        </div>
  )
}

export default ViewSupplier
