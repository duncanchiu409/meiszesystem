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
import { useTranslation } from "react-i18next";

const AddEditInvoice = () => {
  const [newNo, setNewNo] = useState("");
  const [newBT, setNewBT] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newItem, setNewItem] = useState("");
  const [newQuantity, setNewQuantity] = useState(0);
  const [newPrice, setNewPrice] = useState(0);
  const [newTotal, setNewTotal] = useState(0);
  const { t } = useTranslation();

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

    set(ref(db, "Invoice/" + uuid), {
      no: newNo,
      bt: newBT,
      date: newDate,
      item: newItem,
      quantity: newQuantity,
      price: newPrice,
      total: newTotal,
      status: "Waiting for reply",
    });

    navigate("/mainmeun/financial/invoice");
  };

  return (
    <div className="main">
      <div className="App">
        <div className="container">
          <h1>Add Invoice</h1>
          <form className="input-form">
            <div className="input-container">
              <label>{t("Invoice List.Invoice no")}</label>
              <input
                className="input-add"
                placeholder="Invoice No..."
                onChange={(event) => {
                  setNewNo(event.target.value);
                }}
              />
            </div>

            <div className="input-container">
              <label>{t("Invoice List.Date")}</label>
              <input
                className="input-add"
                placeholder="Billed to..."
                onChange={(event) => {
                  setNewBT(event.target.value);
                }}
              />
            </div>

            <div className="input-container">
              <label>{t("Invoice List.Billed to")}</label>
              <input
                value={newDate}
                readOnly
                className="input-add"
                onClick={() => setOpen((open) => !open)}
              />
            </div>

            <div className="input-calendar" ref={refOne}>
              {open && (
                <Calendar
                  date={new Date()}
                  onChange={handleSelect}
                  className="calendarElement"
                />
              )}
            </div>

            <div className="input-container">
              <label>{t("Invoice List.Item")}</label>
              <input
                className="input-add"
                placeholder="Item..."
                onChange={(event) => {
                  setNewItem(event.target.value);
                }}
              />
            </div>

            <input
              className="input-add"
              type="number"
              placeholder="Quantity..."
              onChange={(event) => {
                setNewQuantity(event.target.value);
              }}
            />
            <input
              className="input-add"
              type="number"
              placeholder="Price..."
              onChange={(event) => {
                setNewPrice(event.target.value);
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
                Create Invoice
              </button>
              <NavLink to="/mainmeun/financial/invoice" className="btn-delete">
                Cancel
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEditInvoice;
