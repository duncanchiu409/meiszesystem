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

const UpdateQuotation = () => {
  const [newNo, setNewNo] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newItem, setNewItem] = useState("");
  const [newQuantity, setNewQuantity] = useState(0);
  const [newPrice, setNewPrice] = useState(0);
  const [newTotal, setNewTotal] = useState(0);
  const [Quotation, setQuotation] = useState([]);
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
    set(ref(db, "Quotation/" + id), {
      no: newNo,
      date: newDate,
      item: newItem,
      quantity: newQuantity,
      price: newPrice,
      total: newTotal,
    });

    navigate("/mainmeun/sale/quotation");
  };

  useEffect(() => {
    const getQuotation = () => {
      onValue(ref(db, "Quotation/" + id), (snapshot) => {
        if (snapshot.val() !== null) {
          setQuotation({ ...snapshot.val() });
        }
      });
    };
    getQuotation();
    setNewNo(Quotation.no);
    setNewDate(Quotation.date);
    setNewItem(Quotation.item);
    setNewQuantity(Quotation.quantity);
    setNewPrice(Quotation.price);
    setNewTotal(Quotation.total);
  }, [
    id,
    Quotation.no,
    Quotation.date,
    Quotation.item,
    Quotation.quantity,
    Quotation.price,
    Quotation.total,
  ]);

  return (
    <div className="main">
      <div className="App">
        <div className="container">
          <h1>
            {t("Table Actions.edit") + " " + t("sidebar.Sale.Quotation")} #
            {Quotation.no}
          </h1>

          <form className="input-form">
            <div
              className={
                (editingContainer === 1 ? "editing-input-container" : "") +
                " input-container"
              }
            >
              <label className="">{t("Quotation List.Quotation no")}</label>
              <input
                value={newNo}
                className="input-add"
                placeholder="Quotation No..."
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
              <label className="">{t("Quotation List.Date")}</label>
              <input
                value={newDate}
                readOnly
                className="input-add"
                onClick={() => {
                  setOpen((open) => !open);
                  setEditingContainer(() => 2);
                }}
              />
            </div>

            <div
              className={
                (editingContainer === 3 ? "editing-input-container" : "") +
                " input-container"
              }
            >
              <label className="">{t("Quotation List.Item")}</label>
              <input
                value={newItem}
                className="input-add"
                placeholder="Item..."
                onChange={(event) => {
                  setNewItem(event.target.value);
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
              <label className="">{t("Quotation List.Quantity")}</label>
              <input
                value={newQuantity}
                className="input-add"
                type="number"
                placeholder="Quantity..."
                onChange={(event) => {
                  setNewQuantity(event.target.value);
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
              <label className="">{t("Quotation List.Price")}</label>
              <input
                value={newPrice}
                className="input-add"
                type="number"
                placeholder="Price..."
                onChange={(event) => {
                  setNewPrice(event.target.value);
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
              <label className="">{t("Quotation List.Total")}</label>
              <input
                value={newTotal}
                className="input-add"
                type="number"
                placeholder="Total..."
                onChange={(event) => {
                  setNewTotal(event.target.value);
                }}
              />
            </div>

            <div className="text-center" style={{ gridColumn: "1/3" }}>
              <button className="btn-create" onClick={createUser}>
                Edit Quotation
              </button>
              <NavLink to="/mainmeun/sale/quotation" className="btn-delete">
                Cancel
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateQuotation;
