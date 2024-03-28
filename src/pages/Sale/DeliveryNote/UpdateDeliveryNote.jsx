import React, {useState, useRef,useEffect} from 'react'
import {db} from "../../../firebase";
import{NavLink, useNavigate, useParams} from "react-router-dom"
import "./AddEdit.css";
import {ref, set, onValue } from 'firebase/database'
import { Calendar } from "react-date-range";
import format from "date-fns/format";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const UpdateDeliveryNote = () => {
    const [newNo, setNewNo] = useState("");
    const [newTo, setNewTo] = useState("");
    const [newDate, setNewDate] = useState("");
    const [newItem, setNewItem] = useState("");
    const [newQuantity, setNewQuantity] = useState(0);
    const [newPrice, setNewPrice] = useState(0);
    const [newTotal, setNewTotal] = useState(0);
    const [DeliveryNote, setDeliveryNote] = useState([]);
  
      // open close
      const [open, setOpen] = useState(false);
  
      // get the target element to toggle
      const refOne = useRef(null);
  
    const navigate = useNavigate()
  
    useEffect(() => {
      // set current date on component load
      setNewDate(format(new Date(), "dd/MM/yyyy"));
      // event listeners
      document.addEventListener("keydown", hideOnEscape, true);
      document.addEventListener("click", hideOnClickOutside, true);
    }, []);
  
    // hide dropdown on ESC press
    const hideOnEscape = (e) => {
      // console.log(e.key)
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
  
    // Hide on outside click
    const hideOnClickOutside = (e) => {
      // console.log(refOne.current)
      // console.log(e.target)
      if (refOne.current && !refOne.current.contains(e.target)) {
        setOpen(false);
      }
    };
  
    // on date change, store date in state
    const handleSelect = (date) => {
      // console.log(date)
      // console.log(format(date, 'MM/dd/yyyy'))
      setNewDate(format(date, "dd/MM/yyyy"));
    };
  
    const {id}=useParams();
      const createUser = () => {
  
        set(ref(db,'DeliveryNote/' + id),{
          no: newNo,
        to: newTo,
        date: newDate,
        item: newItem,
        quantity: newQuantity,
        price: newPrice,
        total: newTotal,
        })
      
        navigate("/mainmeun/sale/deliverynote");
        
    };
  
  
   useEffect(() => {
    const getDeliveryNote = () => {
      onValue(ref(db, 'DeliveryNote/' + id ) , (snapshot) => {
  
       if(snapshot.val() !==null){
        setDeliveryNote({...(snapshot.val())})
         
       }
     });
   }
    getDeliveryNote();
    setNewNo(DeliveryNote.no);
    setNewTo(DeliveryNote.to)
    setNewDate(DeliveryNote.date);
    setNewItem(DeliveryNote.item);
    setNewQuantity(DeliveryNote.quantity);
    setNewPrice(DeliveryNote.price);
    setNewTotal(DeliveryNote.total);
      
   },[id,DeliveryNote.no, DeliveryNote.to, DeliveryNote.date, DeliveryNote.item, DeliveryNote.quantity, DeliveryNote.price, DeliveryNote.total]);
  
  
  
    return (
      <div className="main">
        <div className="App" style={{width:"100%", padding:"100px", height:"1000px"}}>
      
  
        <div style={{padding: "0px 215px"}} className="container" >
                  <h1>Edit Delivery Note</h1>
                  
                  <form 
                      style ={{
                          margin: "auto",
                          padding: "15px",
                          maxWidth: "400px",
                          justifyContent: "center",
                          alignContent: "center",
                      }}
                  >
                      <input
                      value={newNo}
                className="input-add"
                placeholder="Delivery Note No..."
                onChange={(event) => {
                  setNewNo(event.target.value);
                }}
              />
              <input
                      value={newTo}
                className="input-add"
                placeholder="Delivery To..."
                onChange={(event) => {
                  setNewTo(event.target.value);
                }}
              />
              <input
                value={newDate}
                readOnly
                className="input-add"
                onClick={() => setOpen((open) => !open)}
              />
  
              <div ref={refOne}>
                {open && (
                  <Calendar
                    date={new Date()}
                    onChange={handleSelect}
                    className="calendarElement"
                  />
                )}
              </div>
              <input
                value={newItem}
                className="input-add"
                placeholder="Item..."
                onChange={(event) => {
                  setNewItem(event.target.value);
                }}
              />
              <input
                value={newQuantity}
                className="input-add"
                type="number"
                placeholder="Quantity..."
                onChange={(event) => {
                  setNewQuantity(event.target.value);
                }}
              />
              <input
                value={newPrice}
                className="input-add"
                type="number"
                placeholder="Price..."
                onChange={(event) => {
                  setNewPrice(event.target.value);
                }}
              />
              <input
                value={newTotal}
                className="input-add"
                type="number"
                placeholder="Total..."
                onChange={(event) => {
                  setNewTotal(event.target.value);
                }}
              />
                      <div className='text-center'>
                          <button className='btn-create' onClick={createUser}>Edit Invoice</button>
                          <NavLink to="/mainmeun/sale/deliverynote" className='btn-delete'>Cancel</NavLink>
                      </div>
                      
  
                  </form>
                  
              </div>
              
          
              
          </div>
        
        
      </div>
    )
}

export default UpdateDeliveryNote
