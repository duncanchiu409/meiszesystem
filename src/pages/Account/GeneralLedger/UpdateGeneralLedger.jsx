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

const UpdateGeneralLedger = () => {
  const [newAmount, setNewAmount] = useState(0);
  const [newDate, setNewDate] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newCOA, setNewCOA] = useState("");
  const [GeneralLedger, setGeneralLedger] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const { t } = useTranslation();
  const [editingContainer, setEditingContainer] = useState(0);

  // open close
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

  const createUser = () => {
    set(ref(db, "GeneralLedger/" + id), {
      amount: newAmount,
      date: newDate,
      description: newDescription,
      coa: newCOA,
    });

    set(ref(db, "BalanceSheet/" + id), {
      amount: newAmount,
      date: newDate,
      description: newDescription,
      coa: newCOA,
    });

    navigate("/mainmeun/account/generalledger");
  };

  useEffect(() => {
    const getGeneralLedger = () => {
      onValue(ref(db, "GeneralLedger/" + id), (snapshot) => {
        if (snapshot.val() !== null) {
          setGeneralLedger({ ...snapshot.val() });
        }
      });
    };
    getGeneralLedger();
    setNewAmount(GeneralLedger.amount);
    setNewDate(GeneralLedger.date);
    setNewDescription(GeneralLedger.description);
    setNewCOA(GeneralLedger.coa);
  }, [
    id,
    GeneralLedger.amount,
    GeneralLedger.date,
    GeneralLedger.description,
    GeneralLedger.coa,
  ]);

  return (
    <div className="main">
      <div className="App">
        <div className="container">
          <h1>
            {t("Table Actions.edit") +
              " " +
              t("sidebar.Account.General Ledger")}
          </h1>

          <form className="input-form">
            <div
              className={
                (editingContainer === 1 ? "editing-input-container" : "") +
                " input-container"
              }
            >
              <label className="">{t("General Ledger List.Date")}</label>
              <input
                value={newDate}
                readOnly
                className="input-add"
                onClick={() => {
                  setOpen((open) => !open);
                  setEditingContainer(() => 1);
                }}
              />
            </div>

            <div
              className={
                (editingContainer === 2 ? "editing-input-container" : "") +
                " input-container"
              }
            >
              <label className="">{t("Account Receivable List.Date")}</label>
              <input
                className="input-add"
                placeholder="Description..."
                value={newDescription || ""}
                onChange={(event) => {
                  setNewDescription(event.target.value);
                }}
                onClick={() => setEditingContainer(() => 2)}
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
                (editingContainer === 3 ? "editing-input-container" : "") +
                " input-container"
              }
            >
              <label className="">
                {t("Account Receivable List.Description")}
              </label>
              <select
                value={newCOA}
                className="input-add"
                placeholder="Category Of Account..."
                onChange={(event) => {
                  setNewCOA(event.target.value);
                }}
                onClick={() => setEditingContainer(() => 3)}
              >
                <option>{"Asset"}</option>
                <option>{"Liability"}</option>
              </select>
            </div>

            <div
              className={
                (editingContainer === 4 ? "editing-input-container" : "") +
                " input-container"
              }
            >
              <label className="">
                {t("Account Receivable List.Description")}
              </label>
              <input
                className="input-add"
                type="number"
                value={newAmount || ""}
                placeholder="Amount..."
                onChange={(event) => {
                  setNewAmount(event.target.value);
                }}
                onClick={() => setEditingContainer(() => 4)}
              />
            </div>

            <div className="text-center" style={{ gridColumn: "1/3" }}>
              <button className="btn-create" onClick={createUser}>
                Edit General Ledger
              </button>
              <NavLink
                to="/mainmeun/account/generalledger"
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

export default UpdateGeneralLedger;
