import React, {useState, useEffect} from 'react'
import {db} from "../../../firebase";
import{NavLink, useNavigate, useParams} from "react-router-dom"
import "./AddEdit.css";
import {ref, set, onValue } from 'firebase/database'

const UpdateSupplier = () => {
    const [newName, setNewName] = useState("");
    const [newMobile, setNewMobile] = useState(0);
    const [newOT, setNewOT] = useState(0);
    const [newEmail, setNewEmail] = useState(0);
    const [newAddress, setNewAddress] = useState("");
    const [newContactPerson, setNewContactPerson] = useState("");
    const [Supplier, setSupplier] = useState([]);
    const navigate = useNavigate()
    const {id}=useParams();

    const createUser = () => {
  
        set(ref(db,'Supplier/' + id),{
          name: newName,
          mobile: newMobile,
          email: newEmail,
          address: newAddress,
          cp: newContactPerson,
          ot: newOT,
        })
      
  
        navigate('/mainmeun/customer/supplier/')
        
    };

    useEffect(() => {
        const getSupplier = () => {
          onValue(ref(db, 'Supplier/' + id ) , (snapshot) => {
      
           if(snapshot.val() !==null){
             setSupplier({...(snapshot.val())})
             
           }
         });
       }
        getSupplier();
        setNewName(Supplier.name);
        setNewMobile(Supplier.mobile);
        setNewEmail(Supplier.email);
        setNewAddress(Supplier.address);
        setNewContactPerson(Supplier.cp);
        setNewOT(Supplier.ot)
          
       },[id,Supplier.name,Supplier.mobile, Supplier.email, Supplier.address, Supplier.cp,Supplier.ot]);
  return (
    <div className="main">
      <div className="App" style={{width:"100%", padding:"100px", height:"1000px"}}>
    

      <div style={{padding: "0px 215px"}} className="container" >
                <h1>Edit Supplier</h1>
                
                <form 
                    style ={{
                        margin: "auto",
                        padding: "15px",
                        maxWidth: "400px",
                        justifyContent: "center",
                        alignContent: "center",
                    }}
                >
                    <input className='input-add' placeholder="Name..." value={newName || ""} onChange={(event) => {setNewName(event.target.value)}}/>
                    <input className='input-add' placeholder="Office Telephone..." value={newOT || ""} onChange={(event) => {setNewOT(event.target.value)}}/>
                    <input className='input-add' placeholder="Mobile..." value={newMobile || ""} onChange={(event) => {setNewMobile(event.target.value)}}/>
                    <input className='input-add' placeholder="Contact Person..." value={newContactPerson || ""} onChange={(event) => {setNewContactPerson(event.target.value)}}/>
                    <input className='input-add' placeholder='Address...' value={newAddress || ""} onChange={(event) => {setNewAddress(event.target.value)}}/>
                    <input className='input-add' placeholder="Email..." value={newEmail || ""}  onChange={(event) => {setNewEmail(event.target.value)}}/>
                    <div className='text-center'>
                        <button className='btn-create' onClick={createUser}>Edit Supplier</button>
                        <NavLink to="/mainmeun/customer/supplier/" className='btn-delete'>Cancel</NavLink>
                    </div>
                    

                </form>
                
            </div>
            
        
            
        </div>
      
    </div>
  )
}

export default UpdateSupplier
