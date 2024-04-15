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

const UpdateAccountPayable = () => {
  const [newAmount, setNewAmount] = useState(0);
  const [newDate, setNewDate] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [accountpayable, setAccountPayable] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const [editingContainer, setEditingContainer] = useState(0);
  const { t } = useTranslation();

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
    set(ref(db, "accountpayable/" + id), {
      amount: newAmount,
      date: newDate,
      description: newDescription,
      coa: "AccountPayable",
    });

    set(ref(db, "GeneralLedger/" + id), {
      amount: newAmount,
      date: newDate,
      description: newDescription,
      coa: "AccountPayable",
    });

    set(ref(db, "BalanceSheet/" + id), {
      amount: newAmount,
      date: newDate,
      description: newDescription,
      coa: "AccountPayable",
    });

    navigate("/mainmeun/account/accountpayable");
  };

  useEffect(() => {
    const getAccountPayable = () => {
      onValue(ref(db, "accountpayable/" + id), (snapshot) => {
        if (snapshot.val() !== null) {
          setAccountPayable({ ...snapshot.val() });
        }
      });
    };
    getAccountPayable();
    setNewAmount(accountpayable.amount);
    setNewDate(accountpayable.date);
    setNewDescription(accountpayable.description);
  }, [
    id,
    accountpayable.amount,
    accountpayable.date,
    accountpayable.description,
  ]);

  return (
    <div className="main">
      <div className="App">
        <div className="container">
          <h1>
            {t("Table Actions.edit") +
              " " +
              t("sidebar.Account.Account Payable")}
          </h1>

          <form className="input-form">
            <div
              className={
                (editingContainer === 1 ? "editing-input-container" : "") +
                " input-container"
              }
            >
              <label className="">{t("Account Payable List.Date")}</label>
              <input
                value={newDate}
                readOnly
                className="input-add"
                onClick={() => {
                  setEditingContainer(() => 1);
                  setOpen((open) => !open);
                }}
              />
            </div>

            <div
              className={
                (editingContainer === 2 ? "editing-input-container" : "") +
                " input-container"
              }
            >
              <label className="">
                {t("Account Payable List.Description")}
              </label>
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
              <label className="">{t("Account Payable List.Amount")}</label>
              <input
                className="input-add"
                type="number"
                value={newAmount || ""}
                placeholder="Amount..."
                onChange={(event) => {
                  setNewAmount(event.target.value);
                }}
                onClick={() => setEditingContainer(() => 3)}
              />
            </div>

            <div className="text-center" style={{ gridColumn: "1/3" }}>
              <button className="btn-create" onClick={createUser}>
                Edit Account Payable
              </button>
              <NavLink
                to="/mainmeun/account/accountpayable"
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

export default UpdateAccountPayable;
