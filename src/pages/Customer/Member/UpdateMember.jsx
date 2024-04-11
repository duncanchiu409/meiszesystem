import React, { useState, useRef, useEffect } from "react";
import { db } from "../../../firebase";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import "./AddEdit.css";
import { ref, set, onValue } from "firebase/database";
import format from "date-fns/format";
import { Calendar } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useTranslation } from "react-i18next";

const UpdateMember = () => {
  const [newName, setNewName] = useState("");
  const [newPlan, setNewPlan] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newMobile, setNewMobile] = useState("");
  const [newSD, setNewSD] = useState("");
  const [newED, setNewED] = useState("");
  const [Customer, setCustomer] = useState([]);
  const [Member, setMember] = useState([]);
  const { t } = useTranslation();
  const [editingContainer, setEditingContainer] = useState(0);

  const navigate = useNavigate();
  const { id } = useParams();

  // open close
  const [open, setOpen] = useState(false);
  const [openED, setOpenED] = useState(false);

  // get the target element to toggle
  const refOne = useRef(null);

  useEffect(() => {
    // set current date on component load
    setNewSD(format(new Date(), "dd/MM/yyyy"));
    // event listeners
    document.addEventListener("keydown", hideOnEscape, true);
    document.addEventListener("click", hideOnClickOutside, true);
  }, []);

  useEffect(() => {
    // set current date on component load
    setNewED(format(new Date(), "dd/MM/yyyy"));
    // event listeners
    document.addEventListener("keydown", hideOnEscapeED, true);
    document.addEventListener("click", hideOnClickOutsideED, true);
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

  const hideOnEscapeED = (e) => {
    // console.log(e.key)
    if (e.key === "Escape") {
      setOpenED(false);
    }
  };

  // Hide on outside click
  const hideOnClickOutsideED = (e) => {
    // console.log(refOne.current)
    // console.log(e.target)
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpenED(false);
    }
  };

  // on date change, store date in state
  const handleSelect = (date) => {
    // console.log(date)
    // console.log(format(date, 'MM/dd/yyyy'))
    setNewSD(format(date, "dd/MM/yyyy"));
  };

  const handleSelectED = (date) => {
    // console.log(date)
    // console.log(format(date, 'MM/dd/yyyy'))
    setNewED(format(date, "dd/MM/yyyy"));
  };

  const createUser = () => {
    set(ref(db, "Member/" + id), {
      name: newName,
      ml: newPlan,
      email: newEmail,
      mobile: newMobile,
      doj: newSD,
      ed: newED,
    });

    navigate("/mainmeun/customer/member");
  };

  useEffect(() => {
    const getCustomer = () => {
      onValue(ref(db, "customers/"), (snapshot) => {
        if (snapshot.val() !== null) {
          setCustomer({ ...snapshot.val() });
        }
      });
    };
    getCustomer();
  }, []);

  useEffect(() => {
    const getMember = () => {
      onValue(ref(db, "Member/" + id), (snapshot) => {
        if (snapshot.val() !== null) {
          setMember({ ...snapshot.val() });
        }
      });
    };
    getMember();
    setNewName(Member.name);
    setNewEmail(Member.email);
    setNewMobile(Member.mobile);
    setNewPlan(Member.ml);
    setNewSD(Member.doj);
    setNewED(Member.ed);
  }, [
    id,
    Member.name,
    Member.email,
    Member.mobile,
    Member.ml,
    Member.doj,
    Member.ed,
  ]);

  return (
    <div className="main">
      <div className="App">
        <div className="container">
          <h1>
            {t("Table Actions.edit") + " " + t("sidebar.Customers.Membership")}
          </h1>

          <form className="input-form">
            <div
              className={
                (editingContainer === 1 ? "editing-input-container" : "") +
                " input-container"
              }
            >
              <label className="">{t("Member List.Name")}</label>
              <select
                className="input-add"
                placeholder="Client..."
                value={newName || ""}
                onChange={(event) => {
                  setNewName(event.target.value);
                }}
                onClick={() => setEditingContainer(() => 1)}
              >
                <option>{"Please select client who join member"}</option>
                {Object.keys(Customer).map((id) => {
                  return <option>{Customer[id].name}</option>;
                })}
              </select>
            </div>

            <div
              className={
                (editingContainer === 2 ? "editing-input-container" : "") +
                " input-container"
              }
            >
              <label className="">{t("Member List.Email")}</label>
              <input
                className="input-add"
                placeholder="Email..."
                value={newEmail || ""}
                onChange={(event) => {
                  setNewEmail(event.target.value);
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
              <label className="">{t("Member List.Mobile")}</label>
              <input
                className="input-add"
                placeholder="Mobile..."
                value={newMobile || ""}
                onChange={(event) => {
                  setNewMobile(event.target.value);
                }}
                onClick={() => setEditingContainer(() => 3)}
              />
            </div>

            <div
              className={
                (editingContainer === 4 ? "editing-input-container" : "") +
                " input-container"
              }
            >
              <label className="">{t("Member List.Membership")}</label>
              <input
                className="input-add"
                placeholder="Membership Level..."
                value={newPlan || ""}
                onChange={(event) => {
                  setNewPlan(event.target.value);
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
              <label className="">{t("Member List.Join Date")}</label>
              <input
                value={newSD}
                readOnly
                className="input-add"
                onClick={() => {
                  setOpen((open) => !open);
                  setEditingContainer(() => 5);
                }}
              />
            </div>

            <div
              className={
                (editingContainer === 6 ? "editing-input-container" : "") +
                " input-container"
              }
            >
              <label className="">{t("Member List.End Date")}</label>
              <input
                value={newED}
                readOnly
                className="input-add"
                onClick={() => {
                  setEditingContainer(() => 6);
                  setOpenED((openED) => !openED);
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

            <div ref={refOne} className="input-calendar">
              {openED && (
                <Calendar
                  date={new Date()}
                  onChange={handleSelectED}
                  className="calendarElement"
                />
              )}
            </div>

            <div className="text-center" style={{ gridColumn: "1/3" }}>
              <button className="btn-create" onClick={createUser}>
                Edit Member
              </button>
              <NavLink to="/mainmeun/customer/member" className="btn-delete">
                Cancel
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateMember;
