import React, { useState, useRef, useEffect, useTransition } from "react";
import { db } from "../../../firebase";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import "./AddEdit.css";
import { ref, set, onValue } from "firebase/database";
import format from "date-fns/format";
import { Calendar } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useTranslation } from "react-i18next";

const UpdateCustomer = () => {
  const [newGroup, setNewGroup] = useState("");
  const [newName, setNewName] = useState("");
  const [newGender, setNewGender] = useState("");
  const [newMobile, setNewMobile] = useState(0);
  const [newEmail, setNewEmail] = useState(0);
  const [newAddress, setNewAddress] = useState("");
  const [newDOJ, setNewDOJ] = useState("");
  const [newFollow, setNewFollow] = useState("");
  const [newSource, setNewSource] = useState("");
  const [customers, setCustomers] = useState([]);
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
    setNewDOJ(format(new Date(), "dd/MM/yyyy"));
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
    setNewDOJ(format(date, "dd/MM/yyyy"));
  };

  const createUser = () => {
    set(ref(db, "customers/" + id), {
      group: newGroup,
      name: newName,
      gender: newGender,
      mobile: newMobile,
      email: newEmail,
      address: newAddress,
      doj: newDOJ,
      follow: newFollow,
      source: newSource,
    });

    navigate("/mainmeun/customer/clients/");
  };

  useEffect(() => {
    const getCustomers = () => {
      onValue(ref(db, "customers/" + id), (snapshot) => {
        if (snapshot.val() !== null) {
          setCustomers({ ...snapshot.val() });
        }
      });
    };
    getCustomers();
    setNewGroup(customers.group);
    setNewName(customers.name);
    setNewGender(customers.gender);
    setNewMobile(customers.mobile);
    setNewEmail(customers.email);
    setNewAddress(customers.address);
    setNewDOJ(customers.doj);
    setNewFollow(customers.follow);
    setNewSource(customers.soucre);
  }, [
    id,
    customers.group,
    customers.name,
    customers.gender,
    customers.mobile,
    customers.email,
    customers.address,
    customers.doj,
    customers.follow,
    customers.soucre,
  ]);
  return (
    <div className="main">
      <div className="App">
        <div className="container">
          <h1>
            {t("Table Actions.edit") + " " + t("sidebar.Customers.Clients")}
          </h1>

          <form className="input-form">
            <div
              className={
                (editingContainer === 1 ? "editing-input-container" : "") +
                " input-container"
              }
            >
              <label className="">{t("Customers List.Group")}</label>
              <input
                className="input-add"
                placeholder="Group..."
                value={newGroup || ""}
                onChange={(event) => {
                  setNewGroup(event.target.value);
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
              <label className="">{t("Customers List.Name")}</label>
              <input
                className="input-add"
                placeholder="Name..."
                value={newName || ""}
                onChange={(event) => {
                  setNewName(event.target.value);
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
              <label className="">{t("Customers List.Gender")}</label>
              <select
                className="input-add"
                placeholder="Gender..."
                value={newGender || ""}
                onChange={(event) => {
                  setNewGender(event.target.value);
                }}
                onClick={() => setEditingContainer(() => 3)}
              >
                <option>{"Male"}</option>
                <option>{"Female"}</option>
              </select>
            </div>

            <div
              className={
                (editingContainer === 4 ? "editing-input-container" : "") +
                " input-container"
              }
            >
              <label className="">{t("Customers List.Mobile")}</label>
              <input
                className="input-add"
                placeholder="Mobile..."
                value={newMobile || ""}
                onChange={(event) => {
                  setNewMobile(event.target.value);
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
              <label className="">{t("Customers List.Address")}</label>
              <input
                className="input-add"
                placeholder="Address..."
                value={newAddress || ""}
                onChange={(event) => {
                  setNewAddress(event.target.value);
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
              <label className="">{t("Customers List.Email")}</label>
              <input
                className="input-add"
                placeholder="Email..."
                value={newEmail || ""}
                onChange={(event) => {
                  setNewEmail(event.target.value);
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
              <label className="">{t("Customers List.Join Date")}</label>
              <input
                value={newDOJ}
                readOnly
                className="input-add"
                placeholder="Date..."
                onClick={() => {
                  setOpen((open) => !open);
                  setEditingContainer(() => 7);
                }}
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
                (editingContainer === 8 ? "editing-input-container" : "") +
                " input-container"
              }
            >
              <label className="">{t("Customers List.Follow-Up")}</label>
              <input
                className="input-add"
                placeholder="Follow-Up..."
                value={newFollow || ""}
                onChange={(event) => {
                  setNewFollow(event.target.value);
                }}
                onClick={() => setEditingContainer(() => 8)}
              />
            </div>

            <div
              className={
                (editingContainer === 9 ? "editing-input-container" : "") +
                " input-container"
              }
            >
              <label className="">{t("Customers List.Source")}</label>
            <input
              className="input-add"
              placeholder="Source..."
              value={newSource || ""}
              onChange={(event) => {
                setNewSource(event.target.value);
              }}
              onClick={() => setEditingContainer(() => 9)}
            />
            </div>

            <div className="text-center" style={{ gridColumn: "1/3" }}>
              <button className="btn-create" onClick={createUser}>
                Edit Customer
              </button>
              <NavLink to="/mainmeun/customer/clients/" className="btn-delete">
                Cancel
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateCustomer;
