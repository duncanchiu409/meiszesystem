import React, {useState, useRef,useEffect} from 'react'
import {db} from "../../../firebase";
import{NavLink, useNavigate, useParams} from "react-router-dom"
import "./AddEdit.css";
import {ref, set, onValue } from 'firebase/database'
import { Calendar } from "react-date-range";
import format from "date-fns/format";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const UpdateAdvanceInvoice = () => {
    const [newNo, setNewNo] = useState("");
    const [newDate, setNewDate] = useState("");
    const [newItem, setNewItem] = useState("");
    const [newTotal, setNewTotal] = useState(0);
    const [newBT, setNewBT] =useState("");
    const [AdvanceInvoice, setAdvanceInvoice] = useState([]);
  
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
  
        set(ref(db,'AdvanceInvoice/' + id),{
          no: newNo,
          date: newDate,
          bt: newBT,
          item: newItem,
          total: newTotal,

        })
      
        navigate("/mainmeun/sale/advanceinvoice");
        
    };
  
  
   useEffect(() => {
    const getAdvanceInvoice = () => {
      onValue(ref(db, 'AdvanceInvoice/' + id ) , (snapshot) => {
  
       if(snapshot.val() !==null){
        setAdvanceInvoice({...(snapshot.val())})
         
       }
     });
   }
    getAdvanceInvoice();
    setNewNo(AdvanceInvoice.no);
    setNewDate(AdvanceInvoice.date);
    setNewItem(AdvanceInvoice.item);
    setNewBT(AdvanceInvoice.bt);
    setNewTotal(AdvanceInvoice.total);
      
   },[id,AdvanceInvoice.no, AdvanceInvoice.bt, AdvanceInvoice.date, AdvanceInvoice.item, AdvanceInvoice.quantity, AdvanceInvoice.price, AdvanceInvoice.total]);
  
  
  
    return (
      <div className="main">
        <div className="App" style={{width:"100%", padding:"100px", height:"1000px"}}>
      
  
        <div style={{padding: "0px 215px"}} className="container" >
                  <h1>Edit AdvanceInvoice #{AdvanceInvoice.no}</h1>
                  
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
                placeholder="Invoice No..."
                onChange={(event) => {
                  setNewNo(event.target.value);
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
                value={newBT}
                className="input-add"
                placeholder="Billed to..."
                onChange={(event) => {
                  setNewBT(event.target.value);
                }}
              />
              <input
                value={newItem}
                className="input-add"
                placeholder="Item..."
                onChange={(event) => {
                  setNewItem(event.target.value);
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
                          <button className='btn-create' onClick={createUser}>Edit</button>
                          <NavLink to="/mainmeun/sale/advanceinvoice" className='btn-delete'>Cancel</NavLink>
                      </div>
                      
  
                  </form>
                  
              </div>
              
          
              
          </div>
        
        
      </div>
    )
}

export default UpdateAdvanceInvoice
