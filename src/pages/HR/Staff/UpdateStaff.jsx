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

const UpdateStaff = () => {
  const [newName, setNewName] = useState("");
  const [newStaffNo, setStaffNo] = useState(0);
  const [newPosition, setNewPosition] = useState("");
  const [newPermission, setNewPermission] = useState("");
  const [newDOE, setNewDOE] = useState("");
  const [newMobile, setNewMobile] = useState(0);
  const [newSalary, setNewSalary] = useState(0);
  const [newCommission, setNewCommission] = useState(0);
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
    set(ref(db, "staff/" + id), {
      name: newName,
      staffno: newStaffNo,
      position: newPosition,
      permission: newPermission,
      doe: newDOE,
      mobile: newMobile,
      salary: newSalary,
      commission: newCommission,
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
      onValue(ref(db, "staff/" + id), (snapshot) => {
        if (snapshot.val() !== null) {
          setStaff({ ...snapshot.val() });
        }
      });
    };
    getStaff();
    setNewName(staff.name);
    setStaffNo(staff.staffno);
    setNewPermission(staff.permission);
    setNewPosition(staff.position);
    setNewDOE(staff.doe);
    setNewMobile(staff.mobile);
    setNewSalary(staff.salary);
    setNewCommission(staff.commission);
  }, [
    id,
    staff.name,
    staff.staffno,
    staff.permission,
    staff.position,
    staff.doe,
    staff.mobile,
    staff.salary,
    staff.commission,
  ]);

  return (
    <div className="main">
      <div className="App">
        <div className="container">
          <h1>
            {t("Table Actions.edit") + " " + t("sidebar.HR.Staff")} #{id}
          </h1>

          <form className="input-form">
            <div
              className={
                (editingContainer === 1 ? "editing-input-container" : "") +
                " input-container"
              }
            >
              <label className="">{t("Staff List.Staff no")}</label>
              <input
                className="input-add"
                value={newStaffNo || ""}
                placeholder="Staff No..."
                onChange={(event) => {
                  setStaffNo(event.target.value);
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
              <label className="">{t("Staff List.Staff no")}</label>
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
              <label className="">{t("Staff List.Position")}</label>
              <select
                className="input-add"
                placeholder="Position..."
                value={newPosition || ""}
                onChange={(event) => {
                  setNewPosition(event.target.value);
                }}
                onClick={() => setEditingContainer(() => 3)}
              >
                <option>{"Please select position"}</option>
                <option>{"Assistant"}</option>
                <option>{"Senior Assistant"}</option>
                <option>{"Manager"}</option>
              </select>
            </div>

            <div
              className={
                (editingContainer === 4 ? "editing-input-container" : "") +
                " input-container"
              }
            >
              <label className="">{t("Staff List.Permission")}</label>
              <select
                className="input-add"
                placeholder="Permission..."
                value={newPermission || ""}
                onChange={(event) => {
                  setNewPermission(event.target.value);
                }}
                onClick={() => setEditingContainer(() => 4)}
              >
                <option>{"Please select permission"}</option>
                <option>{"Clients"}</option>
                <option>{"Staff"}</option>
                <option>{"Admin"}</option>
              </select>
            </div>

            <div
              className={
                (editingContainer === 5 ? "editing-input-container" : "") +
                " input-container"
              }
            >
              <label className="">{t("Staff List.Date of entry")}</label>
              <input
                value={newDOE}
                readOnly
                className="input-add"
                onClick={() => {
                  setEditingContainer(() => 5);
                  setOpen((open) => !open);
                }}
              />
            </div>

            <div
              className={
                (editingContainer === 6 ? "editing-input-container" : "") +
                " input-container"
              }
            >
              <label className="">{t("Staff List.Mobile")}</label>
              <input
                className="input-add"
                type="number"
                placeholder="Mobile..."
                value={newMobile}
                onChange={(event) => {
                  setNewMobile(event.target.value);
                }}
                onClick={() => setEditingContainer(() => 6)}
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
                (editingContainer === 7 ? "editing-input-container" : "") +
                " input-container"
              }
            >
              <label className="">{t("Staff List.Salary")}</label>
              <input
                className="input-add"
                type="number"
                placeholder="Salary..."
                value={newSalary}
                onChange={(event) => {
                  setNewSalary(event.target.value);
                }}
                onClick={() => setEditingContainer(() => 7)}
              />
            </div>

            <div className="text-center" style={{ gridColumn: "1/3" }}>
              <button className="btn-create" onClick={createUser}>
                Edit Staff
              </button>
              <NavLink to="/mainmeun/hr/staff" className="btn-delete">
                Cancel
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateStaff;
