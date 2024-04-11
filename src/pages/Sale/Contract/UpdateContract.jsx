import React, { useState, useRef, useEffect } from "react";
import { db } from "../../../firebase";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import "./AddEdit.css";
import { ref, set, onValue } from "firebase/database";
import { Calendar } from "react-date-range";
import format from "date-fns/format";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useTranslation } from "react-i18next";

const UpdateContract = () => {
  const [newNo, setNewNo] = useState("");
  const [newBuyer, setNewBuyer] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newItem, setNewItem] = useState("");
  const [newQuantity, setNewQuantity] = useState(0);
  const [newPrice, setNewPrice] = useState(0);
  const [newTotal, setNewTotal] = useState(0);
  const [Contract, setContract] = useState([]);
  const { t } = useTranslation();
  const [editingContainer, setEditingContainer] = useState(0);

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

  const { id } = useParams();
  const createUser = () => {
    set(ref(db, "Contract/" + id), {
      no: newNo,
      buyer: newBuyer,
      date: newDate,
      item: newItem,
      quantity: newQuantity,
      price: newPrice,
      total: newTotal,
    });

    navigate("/mainmeun/sale/contract");
  };

  useEffect(() => {
    const getContract = () => {
      onValue(ref(db, "Contract/" + id), (snapshot) => {
        if (snapshot.val() !== null) {
          setContract({ ...snapshot.val() });
        }
      });
    };
    getContract();
    setNewNo(Contract.no);
    setNewBuyer(Contract.buyer);
    setNewDate(Contract.date);
    setNewItem(Contract.item);
    setNewQuantity(Contract.quantity);
    setNewPrice(Contract.price);
    setNewTotal(Contract.total);
  }, [
    id,
    Contract.no,
    Contract.buyer,
    Contract.date,
    Contract.item,
    Contract.quantity,
    Contract.price,
    Contract.total,
  ]);

  return (
    <div className="main">
      <div className="App">
        <div className="container">
          <h1>
            {t("Table Actions.edit") + " " + t("sidebar.Sale.Contract")} #
            {Contract.no}
          </h1>

          <form className="input-form">
            <div
              className={
                (editingContainer === 1 ? "editing-input-container" : "") +
                " input-container"
              }
            >
              <label className="">{t("Contract List.Contract no")}</label>
              <input
                value={newNo}
                className="input-add"
                placeholder="Contract No..."
                onChange={(event) => {
                  setNewNo(event.target.value);
                }}
                onClick={() => setEditingContainer(() => 1)}
              />
            </div>

            <div
              className={
                (editingContainer === 2 ? "editing-input-container" : "") +
                " input-container"
              }
            >
              <label className="">{t("Contract List.Buyer")}</label>
              <input
                value={newBuyer}
                className="input-add"
                placeholder="Buyer..."
                onChange={(event) => {
                  setNewBuyer(event.target.value);
                }}
                onClick={() => setEditingContainer(() => 2)}
              />
            </div>

            <div
              className={
                (editingContainer === 3 ? "editing-input-container" : "") +
                " input-container"
              }
            >
              <label className="">{t("Contract List.Date")}</label>
              <input
                value={newDate}
                readOnly
                className="input-add"
                onClick={() => {
                  setOpen((open) => !open);
                  setEditingContainer(() => 3);
                }}
              />
            </div>

            <div
              className={
                (editingContainer === 4 ? "editing-input-container" : "") +
                " input-container"
              }
            >
              <label className="">{t("Contract List.Item")}</label>
              <input
                value={newItem}
                className="input-add"
                placeholder="Item..."
                onChange={(event) => {
                  setNewItem(event.target.value);
                }}
                onClick={() => setEditingContainer(() => 4)}
              />
            </div>

            <div ref={refOne}>
              {open && (
                <Calendar
                  date={new Date()}
                  onChange={handleSelect}
                  className="calendarElement"
                />
              )}
            </div>

            <div
              className={
                (editingContainer === 5 ? "editing-input-container" : "") +
                " input-container"
              }
            >
              <label className="">{t("Contract List.Quantity")}</label>
              <input
                value={newQuantity}
                className="input-add"
                type="number"
                placeholder="Quantity..."
                onChange={(event) => {
                  setNewQuantity(event.target.value);
                }}
                onClick={() => setEditingContainer(() => 5)}
              />
            </div>

            <div
              className={
                (editingContainer === 6 ? "editing-input-container" : "") +
                " input-container"
              }
            >
              <label className="">{t("Contract List.Price")}</label>
              <input
                value={newPrice}
                className="input-add"
                type="number"
                placeholder="Price..."
                onChange={(event) => {
                  setNewPrice(event.target.value);
                }}
                onClick={() => setEditingContainer(() => 6)}
              />
            </div>

            <div
              className={
                (editingContainer === 7 ? "editing-input-container" : "") +
                " input-container"
              }
            >
              <label className="">{t("Contract List.Total")}</label>
              <input
                value={newTotal}
                className="input-add"
                type="number"
                placeholder="Total..."
                onChange={(event) => {
                  setNewTotal(event.target.value);
                }}
                onClick={() => setEditingContainer(() => 7)}
              />
            </div>

            <div className="text-center" style={{ gridColumn: "1/3" }}>
              <button className="btn-create" onClick={createUser}>
                Edit Invoice
              </button>
              <NavLink to="/mainmeun/sale/contract" className="btn-delete">
                Cancel
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateContract;
