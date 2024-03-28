import React, { useState, useRef, useEffect } from "react";
import { db } from "../../../firebase";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import "./AddEdit.css";
import { ref, set, onValue } from "firebase/database";
import format from "date-fns/format";
import { Calendar } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

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
    setNewGroup(customers.group)
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
      <div
        className="App"
        style={{ width: "100%", padding: "100px", height: "1000px" }}
      >
        <div style={{ padding: "0px 215px" }} className="container">
          <h1>Edit Customer</h1>

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
                placeholder="Group..."
                value={newGroup || ""}
                onChange={(event) => {
                  setNewGroup(event.target.value);
                }}
              />
            <input
              className="input-add"
              placeholder="Name..."
              value={newName || ""}
              onChange={(event) => {
                setNewName(event.target.value);
              }}
            />
            <select
              className="input-add"
              placeholder="Gender..."
              value={newGender || ""}
              onChange={(event) => {
                setNewGender(event.target.value);
              }}
            >
              
              <option>{"Male"}</option>
              <option>{"Female"}</option>

            </select>
            <input
              className="input-add"
              placeholder="Mobile..."
              value={newMobile || ""}
              onChange={(event) => {
                setNewMobile(event.target.value);
              }}
            />
            <input
              className="input-add"
              placeholder="Address..."
              value={newAddress || ""}
              onChange={(event) => {
                setNewAddress(event.target.value);
              }}
            />
            <input
              className="input-add"
              placeholder="Email..."
              value={newEmail || ""}
              onChange={(event) => {
                setNewEmail(event.target.value);
              }}
            />
            <>
              <input
                value={newDOJ}
                readOnly
                className="input-add"
                placeholder="Date..."
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
            </>

            <input
                className="input-add"
                placeholder="Follow-Up..."
                value={newFollow || ""}
                onChange={(event) => {
                  setNewFollow(event.target.value);
                }}
              />

              <input
                className="input-add"
                placeholder="Source..."
                value={newSource || ""}
                onChange={(event) => {
                  setNewSource(event.target.value);
                }}
              /> 

            <div className="text-center">
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
