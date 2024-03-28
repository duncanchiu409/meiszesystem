import React, {useState, useEffect} from 'react'
import {db} from "../../../firebase";
import{NavLink , useParams} from "react-router-dom"
import './AddEdit.css'
import {ref , onValue } from 'firebase/database'

const ViewFinancialStatement = () => {
  const [FS, setFS] = useState([]);
    
    const {id}=useParams();
    
    useEffect(() => {
        const getFS = () => {
          onValue(ref(db, 'FS/' + id ) , (snapshot) => {
      
           if(snapshot.val() !==null){
             setFS({...(snapshot.val())})
             
           }
         });
       }
        getFS();

          
    },[id]);


    return (
        <div className="main">
        <div className="App" style={{width:"100%", padding:"100px", height:"1000px"}}>
      
  
        <div style={{padding: "0px 450px"}} className="container" >
            <div className='card-header'>
                <h1>Account Detail</h1>
            </div>
            <div className='view-container'>
                <br/>
                <strong>Ref no.</strong>
                <br/>
                <span>{FS.no}</span>
                <br/>
                <br/>
                <strong>Date:</strong>
                <br/>
                <span>{FS.date}</span>
                <br/>
                <br/>
                <strong>Account:</strong>
                <br/>
                <span>{FS.account}</span>
                <br/>
                <br/>
                <strong>Item:</strong>
                <br/>
                <span>{FS.item}</span>
                <br/>
                <br/>
                <strong>Total:</strong>
                <br/>
                <span>{FS.total}</span>
                <br/>
                <br/>
                
                <div className='text-center'>
                        
                        <NavLink to="/mainmeun/financial/FS" className='btn-delete'>Go Back</NavLink>
                
                </div>
            </div>
        </div>
        </div>
        </div>
    )
}

export default ViewFinancialStatement
