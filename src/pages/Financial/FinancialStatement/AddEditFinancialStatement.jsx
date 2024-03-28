import React, { useEffect, useRef, useState } from "react";
import { db } from "../../../firebase";
import { uid } from "uid";
import { NavLink, useNavigate } from "react-router-dom";
import "./AddEdit.css";
import { ref, set } from "firebase/database";
import { Calendar } from "react-date-range";
import format from "date-fns/format";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const AddEditFinancialStatement = () => {
  const [newNo, setNewNo] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newAccount, setNewAccount] = useState("");
  const [newItem, setNewItem] = useState("");
  const [newTotal, setNewTotal] = useState(0);

  // open close
  const [open, setOpen] = useState(false);

  // get the target element to toggle
  const refOne = useRef(null);

  const navigate = useNavigate();

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
    const uuid = uid();

    set(ref(db, "FS/" + uuid), {
      no: newNo,
      date: newDate,
      account: newAccount,
      item: newItem,
      total: newTotal,
    });


    navigate("/mainmeun/financial/FS");
  };

  return (
    <div className="main">
      <div
        className="App"
        style={{ width: "100%", padding: "100px", height: "1000px" }}
      >
        <div style={{ padding: "0px 215px" }} className="container">
          <h1>Add Account</h1>
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
              className="input-add"
              placeholder="Ref No..."
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
            <select
              className="input-add"
              placeholder="Account..."
              onChange={(event) => {
                setNewAccount(event.target.value);
              }}
            >
              <option>{"Expense"}</option>
              <option>{"Income"}</option>
            </select>
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
              className="input-add"
              placeholder="Item..."
              onChange={(event) => {
                setNewItem(event.target.value);
              }}
            />
            <input
              className="input-add"
              type="number"
              placeholder="Total..."
              onChange={(event) => {
                setNewTotal(event.target.value);
              }}
            />
            <div className="text-center">
              <button className="btn-create" onClick={createUser}>
                Create Statement
              </button>
              <NavLink to="/mainmeun/financial/FS" className="btn-delete">
                Cancel
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddEditFinancialStatement
