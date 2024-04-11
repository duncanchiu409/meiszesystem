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

const UpdatePurchasePlanning = () => {
  const [newNo, setNewNo] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newPRT, setNewPRT] = useState("");
  const [newItem, setNewItem] = useState("");
  const [newTotal, setNewTotal] = useState(0);
  const [PurchasePlanning, setPurchasePlanning] = useState([]);
  const [newStatus, setNewStatus] = useState("");
  const [newQuantity, setNewQuantity] = useState(0);
  const { t } = useTranslation();
  const [editingContainer, setEditingContainer] = useState(0);

  const { id } = useParams();

  useEffect(() => {
    const getPurchasePlanning = () => {
      onValue(ref(db, "PurchasePlanning/" + id), (snapshot) => {
        if (snapshot.val() !== null) {
          setPurchasePlanning({ ...snapshot.val() });
        }
      });
    };
    getPurchasePlanning();
    setNewNo(PurchasePlanning.no);
    setNewItem(PurchasePlanning.item);
    setNewDate(PurchasePlanning.date);
    setNewPRT(PurchasePlanning.supplier);
    setNewTotal(PurchasePlanning.total);
    setNewQuantity(PurchasePlanning.quantity);
    setNewStatus(PurchasePlanning.status);
  }, [
    id,
    PurchasePlanning.no,
    PurchasePlanning.date,
    PurchasePlanning.item,
    PurchasePlanning.supplier,
    PurchasePlanning.total,
    PurchasePlanning.quantity,
    PurchasePlanning.status,
  ]);

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

    navigate("/mainmeun/purchase/pp");
  };

  return (
    <div className="main">
      <div className="App">
        <div className="container">
          <h1>
            {t("Table Actions.edit") +
              " " +
              t("sidebar.Purchase.Purchase Planning")}
          </h1>

          <form className="input-form">
            <div
              className={
                (editingContainer === 1 ? "editing-input-container" : "") +
                " input-container"
              }
            >
              <label className="">
                {t("Purchase Planning List.Purchase Planning no")}
              </label>
              <input
                value={newNo}
                className="input-add"
                placeholder="Purchase Planning No..."
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
              <label className="">{t("Purchase Planning List.Date")}</label>
              <input
                value={newDate}
                readOnly
                className="input-add"
                onClick={() => {
                  setEditingContainer(() => 2);
                  setOpen((open) => !open);
                }}
              />
            </div>

            <div
              className={
                (editingContainer === 3 ? "editing-input-container" : "") +
                " input-container"
              }
            >
              <label className="">{t("Purchase Planning List.Supplier")}</label>
              <input
                value={newPRT}
                className="input-add"
                placeholder="Supplier..."
                onChange={(event) => {
                  setNewPRT(event.target.value);
                }}
                onClick={() => setEditingContainer(() => 3)}
              />
            </div>

            <div ref={refOne} className="input-calendar">
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
                (editingContainer === 4 ? "editing-input-container" : "") +
                " input-container"
              }
            >
              <label className="">{t("Purchase Planning List.Item")}</label>
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

            <div
              className={
                (editingContainer === 5 ? "editing-input-container" : "") +
                " input-container"
              }
            >
              <label className="">{t("Purchase Planning List.Total Amount")}</label>
              <input
                value={newTotal}
                className="input-add"
                type="number"
                placeholder="Total..."
                onChange={(event) => {
                  setNewTotal(event.target.value);
                }}
                onClick={() => setEditingContainer(() => 5)}
              />
            </div>

            <div className="text-center" style={{ gridColumn: "1/3" }}>
              <button className="btn-create" onClick={createUser}>
                Edit Payment Request
              </button>
              <NavLink to="/mainmeun/purchase/pp" className="btn-delete">
                Cancel
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdatePurchasePlanning;
