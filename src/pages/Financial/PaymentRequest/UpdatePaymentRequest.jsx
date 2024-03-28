import React, { useState, useRef, useEffect } from "react";
import { db } from "../../../firebase";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import "./AddEdit.css";
import { ref, set, onValue } from "firebase/database";
import { Calendar } from "react-date-range";
import format from "date-fns/format";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const UpdatePaymentRequest = () => {
  const [newNo, setNewNo] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newPRT, setNewPRT] = useState("");
  const [newItem, setNewItem] = useState("");
  const [newTotal, setNewTotal] = useState(0);
  const [PaymentRequest, setPaymentRequest] = useState([]);
  const [newStatus, setNewStatus] = useState("");
  const [newAIncome, setNewAIncome] = useState([]);
  const [newBalance, setNewBalance] = useState([]);
  const [newASale, setNewASale] = useState([]);
  const [newQuantity, setNewQuantity] = useState(0);

  const { id } = useParams();

  useEffect(() => {
    const getPaymentRequest = () => {
      onValue(ref(db, "paymentRequest/" + id), (snapshot) => {
        if (snapshot.val() !== null) {
          setPaymentRequest({ ...snapshot.val() });
        }
      });
    };
    getPaymentRequest();
    setNewNo(PaymentRequest.no);
    setNewItem(PaymentRequest.item);
    setNewDate(PaymentRequest.date);
    setNewPRT(PaymentRequest.prt);
    setNewTotal(PaymentRequest.total);
    setNewQuantity(PaymentRequest.quantity);
    setNewStatus(PaymentRequest.status);
  }, [
    id,
    PaymentRequest.no,
    PaymentRequest.date,
    PaymentRequest.item,
    PaymentRequest.prt,
    PaymentRequest.total,
    PaymentRequest.quantity,
    PaymentRequest.status,
  ]);

  // open close
  const [open, setOpen] = useState(false);

  // get the target element to toggle
  const refOne = useRef(null);

  const navigate = useNavigate();

  var dateParts = newDate.split("/");
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

  useEffect(() => {
    
    var monthString = convertMonth(month);

      onValue(
        ref(db, `annualincome/${year}/${monthString}/`),
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
        ref(db, `annualsale/${year}/${monthString}/`),
        (snapshot) => {
          if (snapshot.val() !== null) {
            setNewASale({ ...snapshot.val() });
          } else {
            setNewASale({name:`${monthString}` , value: 0 });
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

  
  const createUser = () => {
    set(ref(db, "paymentRequest/" + id), {
      no: newNo,
      date: newDate,
      prt: newPRT,
      item: newItem,
      total: newTotal,
      status: newStatus,
      quantity: newQuantity,
    });

    navigate("/mainmeun/financial/paymentrequest");
  };

  const createAI = () =>{

    var monthString = convertMonth(month);

    set(ref(db, "paymentRequest/" + id), {
      no: newNo,
      date: newDate,
      prt: newPRT,
      item: newItem,
      total: newTotal,
      status: newStatus,
      quantity: newQuantity,
    });

    set(ref(db, "AdvanceInvoice/" + id), {
      no: newNo,
      date: newDate,
      bt: newPRT,
      item: newItem,
      total: newTotal,
    });

    set(ref(db, "FS/" + id), {
      no: newNo,
      date: newDate,
      account: "Income",
      item: newItem,
      total: newTotal,
    });

    set(
      ref(db, `annualincome/${year}/${monthString}/`),
      {
        name: `${monthString}`,
        value: parseInt(newAIncome.value) + parseInt(newTotal),
      }
    );

    set(
      ref(db, `annualbalance/${year}/${monthString}/`),
      {
        name: `${monthString}`,
        value: parseInt(newBalance.value) + parseInt(newTotal),
      }
    );

    set(
      ref(db, `annualsale/${year}/${monthString}/`),
      {
        name: `${monthString}`,
        value: parseInt(newASale.value) + parseInt(newQuantity),
      }
    );

    set(ref(db, "inventory/" + id), {
      status: "Stock Out",
      refno: newNo,
      date: newDate,
      product: newItem,
      quantity: newQuantity,
      cost:  newTotal,
      remark: "",
    });

    

    navigate("/mainmeun/financial/paymentrequest");
  }

  

  return (
    <div className="main">
      <div
        className="App"
        style={{ width: "100%", padding: "100px", height: "1000px" }}
      >
        <div style={{ padding: "0px 215px" }} className="container">
          <h1>Edit Payment Request</h1>

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
              value={newNo}
              className="input-add"
              placeholder="Payment Request No..."
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
              value={newPRT}
              className="input-add"
              placeholder="Payment Request to..."
              onChange={(event) => {
                setNewPRT(event.target.value);
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
                Edit Payment Request
              </button>
              <NavLink
                to="/mainmeun/financial/paymentrequest"
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
};

export default UpdatePaymentRequest;
