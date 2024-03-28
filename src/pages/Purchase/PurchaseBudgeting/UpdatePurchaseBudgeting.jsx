import React, { useState, useRef,useEffect } from "react";
import { db } from "../../../firebase";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import "./AddEdit.css";
import { ref, set, onValue } from "firebase/database";
import { Calendar } from "react-date-range";
import format from "date-fns/format";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const UpdatePurchaseBudgeting = () => {
    const [newNo, setNewNo] = useState("");
    const [newDate, setNewDate] = useState("");
    const [newPRT, setNewPRT] = useState("");
    const [newItem, setNewItem] = useState("");
    const [newTotal, setNewTotal] = useState(0);
    const [PurchaseBudgeting, setPurchaseBudgeting] = useState([]);
    const [newStatus, setNewStatus] = useState("");
    const [newAIncome, setNewAIncome] = useState([]);
    const [newBalance, setNewBalance] = useState([]);
    const [newQuantity, setNewQuantity] = useState(0);
  
    const { id } = useParams();
  
    useEffect(() => {
      const getPurchaseBudgeting = () => {
        onValue(ref(db, "PurchaseBudgeting/" + id), (snapshot) => {
          if (snapshot.val() !== null) {
            setPurchaseBudgeting({ ...snapshot.val() });
          }
        });
      };
      getPurchaseBudgeting();
      setNewNo(PurchaseBudgeting.no);
      setNewItem(PurchaseBudgeting.item);
      setNewDate(PurchaseBudgeting.date);
      setNewPRT(PurchaseBudgeting.supplier);
      setNewTotal(PurchaseBudgeting.total);
      setNewQuantity(PurchaseBudgeting.quantity);
      setNewStatus(PurchaseBudgeting.status);
    }, [
      id,
      PurchaseBudgeting.no,
      PurchaseBudgeting.date,
      PurchaseBudgeting.item,
      PurchaseBudgeting.supplier,
      PurchaseBudgeting.total,
      PurchaseBudgeting.quantity,
      PurchaseBudgeting.status,
    ]);
    const [open, setOpen] = useState(false);

    // get the target element to toggle
    const refOne = useRef(null);

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

  
    const navigate = useNavigate();
  
    var dateParts = (newDate).split("/");
    var year = dateParts[2];
    var month = dateParts[1];
  
  
    const convertMonth = (month) =>{
  
      if(month === '01'){
        return 'Jan'
      }else if(month === '02'){
        return 'Feb'
      }else if(month === '03'){
        return 'Mar'
      }else if(month === '04'){
        return 'Apr'
      }else if(month === '05'){
        return 'May'
      }else if(month === '06'){
        return 'Jun'
      }else if(month === '07'){
        return 'Jul'
      }else if(month === '08'){
        return 'Aug'
      }else if(month === '09'){
        return 'Sep'
      }else if(month === '10'){
        return 'Oct'
      }else if(month === '11'){
        return 'Nov'
      }else if(month === '12'){
        return 'Dec'
      }
  
    }

    var monthString = convertMonth(month);
  
    useEffect(() => {
      
      var monthString = convertMonth(month);
  
        onValue(
          ref(db, `annualexpense/${year}/${monthString}/`),
          (snapshot) => {
            if (snapshot.val() !== null) {
              setNewAIncome({ ...snapshot.val() });
            } else {
              setNewAIncome({name:`${monthString}` , value: 0 });
            }
          }
        );
      
    }, [year, month]);
  
    useEffect(() => {
      
      var monthString = convertMonth(month);
  
        onValue(
          ref(db, `annualbalance/${year}/${monthString}/`),
          (snapshot) => {
            if (snapshot.val() !== null) {
              setNewBalance({ ...snapshot.val() });
            } else {
              setNewBalance({name:`${monthString}` , value: 0 });
            }
          }
        );
      
    }, [year, month]);
  
    
    const createUser = () => {
      set(ref(db, "PurchasePlanning/" + id), {
        no: newNo,
        date: newDate,
        supplier: newPRT,
        item: newItem,
        total: newTotal,
        status: newStatus,
        quantity: newQuantity,
      });

      set(ref(db, "PurchaseBudgeting/" + id), {
        no: newNo,
        date: newDate,
        supplier: newPRT,
        item: newItem,
        total: newTotal,
        status: newStatus,
        quantity: newQuantity,
      });
  
      navigate("/mainmeun/purchase/pb");
    };
  

    const createAI = () => {
        set(ref(db, "PurchasePlanning/" + id), {
          no: newNo,
          date: newDate,
          supplier: newPRT,
          item: newItem,
          total: newTotal,
          status: newStatus,
          quantity: newQuantity,
        });
  
        set(ref(db, "PurchaseBudgeting/" + id), {
          no: newNo,
          date: newDate,
          supplier: newPRT,
          item: newItem,
          total: newTotal,
          status: newStatus,
          quantity: newQuantity,
        });

        set(ref(db, "PurchaseOrder/" + id), {
          no: newNo,
          date: newDate,
          supplier: newPRT,
          item: newItem,
          total: newTotal,
          status: newStatus,
          quantity: newQuantity,
        });

        set(ref(db, "FS/" + id), {
            no: newNo,
            date: newDate,
            account: "Expense",
            item: newItem,
            total: newTotal,
          });

          set(ref(db, "inventory/" + id), {
            status: "Stock In",
            refno: newNo,
            date: newDate,
            product: newItem,
            quantity: newQuantity,
            cost:  newTotal,
            remark: "",
          });

          set(
            ref(db, `annualexpense/${year}/${monthString}/`),
            {
              name: `${monthString}`,
              value: parseInt(newAIncome.value) + parseInt(newTotal),
            }
          );
      
          set(
            ref(db, `annualbalance/${year}/${monthString}/`),
            {
              name: `${monthString}`,
              value: parseInt(newBalance.value) - parseInt(newTotal),
            }
          );
    
        navigate("/mainmeun/purchase/pb");
      };
    
  
    return (
      <div className="main">
        <div
          className="App"
          style={{ width: "100%", padding: "100px", height: "1000px" }}
        >
          <div style={{ padding: "0px 215px" }} className="container">
            <h1>Edit Purchase Budgeting</h1>
  
            <form
              style={{
                margin: "auto",
                padding: "15px",
                maxWidth: "400px",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
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

              <select
              value={newStatus}
              className="input-add"
              placeholder="Status..."
              onChange={(event) => {
                setNewStatus(event.target.value);
              }}
            >
              <option>{"Pending"}</option>
              <option>{"Paid"}</option>
            </select>
            <div className="text-center">
              <button className="btn-create" onClick={newStatus ==="Paid" ? createAI : createUser}>
                Edit Purchase Budgeting
              </button>
              <NavLink
                to="/mainmeun/purchase/pb"
                className="btn-delete"
              >
                Cancel
              </NavLink>
            </div>
            </form>
          </div>
        </div>
      </div>
    );
}

export default UpdatePurchaseBudgeting
