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

const UpdateUser = () => {
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState(0);
  const [newPermission, setNewPermission] = useState("");
  const [newDOE, setNewDOE] = useState("");
  const [newMobile, setNewMobile] = useState(0);
  const [staff, setStaff] = useState([]);
  const { t } = useTranslation();
  const [editingContainer, setEditingContainer] = useState(0);

  // open close
  const [open, setOpen] = useState(false);

  // get the target element to toggle
  const refOne = useRef(null);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    // set current date on component load
    setNewDOE(format(new Date(), "dd/MM/yyyy"));
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
    setNewDOE(format(date, "dd/MM/yyyy"));
  };

  const createUser = () => {
    set(ref(db, "User/" + id), {
      name: newName,
      email: newEmail,
      permission: newPermission,
      doj: newDOE,
      mobile: newMobile,
    });

    navigate("/mainmeun/hr/staff");
  };

  //   const getProducts = () => {
  //     onValue(ref(db, 'products/' + id) , (snapshot) => {

  //      if(snapshot.val() !==null){
  //        setProducts({...(snapshot.val())})

  //      }
  //    });
  //  }

  useEffect(() => {
    const getStaff = () => {
      onValue(ref(db, "User/" + id), (snapshot) => {
        if (snapshot.val() !== null) {
          setStaff({ ...snapshot.val() });
        }
      });
    };
    getStaff();
    setNewName(staff.name);
    setNewEmail(staff.email);
    setNewPermission(staff.permission);

    setNewDOE(staff.doj);
    setNewMobile(staff.mobile);
  }, [id, staff.name, staff.email, staff.permission, staff.doj, staff.mobile]);

  return (
    <div className="main">
      <div className="App">
        <div className="container">
          <h1>
            {t("Table Actions.edit") + " " + t("sidebar.Setting.User Setting")}
          </h1>

          <form className="input-form">
            <div
              className={
                (editingContainer === 1 ? "editing-input-container" : "") +
                " input-container"
              }
            >
              <label className="">{t("User List.User Name")}</label>
              <input
                className="input-add"
                placeholder="Name..."
                value={newName || ""}
                onChange={(event) => {
                  setNewName(event.target.value);
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
              <label className="">{t("User List.Permission")}</label>
              <select
                className="input-add"
                placeholder="Permission..."
                value={newPermission || ""}
                onChange={(event) => {
                  setNewPermission(event.target.value);
                }}
                onClick={() => setEditingContainer(() => 2)}
              >
                <option>{"Please select permission"}</option>
                <option>{"Clients"}</option>
                <option>{"Staff"}</option>
                <option>{"Admin"}</option>
              </select>
            </div>

            <div
              className={
                (editingContainer === 3 ? "editing-input-container" : "") +
                " input-container"
              }
            >
              <label className="">{t("User List.Date of Join")}</label>
              <input
                value={newDOE}
                readOnly
                className="input-add"
                onClick={() => {
                  setEditingContainer(() => 3);
                  setOpen((open) => !open);
                }}
              />
            </div>

            <div
              className={
                (editingContainer === 4 ? "editing-input-container" : "") +
                " input-container"
              }
            >
              <label className="">{t("User List.Mobile")}</label>
              <input
                className="input-add"
                type="number"
                placeholder="Mobile..."
                value={newMobile || ""}
                onChange={(event) => {
                  setNewMobile(event.target.value);
                }}
                onClick={() => setEditingContainer(() => 4)}
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
                (editingContainer === 5 ? "editing-input-container" : "") +
                " input-container"
              }
            >
              <label className="">{t("User List.Email")}</label>
              <input
                className="input-add"
                placeholder="Email..."
                value={newEmail || ""}
                onChange={(event) => {
                  setNewEmail(event.target.value);
                }}
                onClick={() => setEditingContainer(() => 5)}
              />
            </div>

            <div className="text-center" style={{ gridColumn: "1/3" }}>
              <button className="btn-create" onClick={createUser}>
                Edit User
              </button>
              <NavLink to="/mainmeun/setting/us" className="btn-delete">
                Cancel
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
