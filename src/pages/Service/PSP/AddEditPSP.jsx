import React, { useState,useRef, useEffect } from "react";
import { db } from "../../../firebase";
import { uid } from "uid";
import { NavLink, useNavigate } from "react-router-dom";
import "./AddEdit.css";
import { ref, set, onValue} from "firebase/database";
import { Calendar } from "react-date-range";
import format from "date-fns/format";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const AddEditPSP = () => {
  const [newName, setNewName] = useState("");
  const [newPlan, setNewPlan] = useState("");
  const [newQuantity, setNewQuantity] = useState("");
  const [newSD, setNewSD] = useState("");
  const [newED, setNewED] = useState("");
  const [Service, setService] = useState([]);
  const [Customer, setCustomer] = useState([]);
  const [newPB, setNewPB] = useState([]);


  const navigate = useNavigate();

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
    const uuid = uid();

    set(ref(db, "PSP/" + uuid), {
      name: newName,
      plan: newPlan,
      quantity: newQuantity,
      sd:newSD,
      ed:newED,
      pb:newPB
    });

    navigate("/mainmeun/service/psp");
  };

  useEffect(() => {
    const getService = () => {
      onValue(ref(db, "Service/"), (snapshot) => {
        if (snapshot.val() !== null) {
          setService({ ...snapshot.val() });
        }
      });
    };
    getService();
   
  }, []);

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

  return (
    <div className="main">
      <div
        className="App"
        style={{ width: "100%", padding: "100px", height: "1000px" }}
      >
        <div style={{ padding: "0px 215px" }} className="container">
          <h1>Edit Purchase </h1>

          <form
            style={{
              margin: "auto",
              padding: "15px",
              maxWidth: "400px",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <select
              className="input-add"
              placeholder="Service..."
              onChange={(event) => {
                setNewName(event.target.value);
              }}
            >
              <option>{"Please select service"}</option>
              {Object.keys(Service).map((id) => {
                return <option>{Service[id].name}</option>;
              })}
            </select>
            
            <input
              className="input-add"
              placeholder="Plan..."
              value={newPlan || ""}
              onChange={(event) => {
                setNewPlan(event.target.value);
              }}
            />
            <input
              className="input-add"
              type="number"
              placeholder="Quantity..."
              value={newQuantity || ""}
              onChange={(event) => {
                setNewQuantity(event.target.value);
              }}
            />
            <input
              value={newSD}
              readOnly
              className="input-add"
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
            <input
              value={newED}
              readOnly
              className="input-add"
              onClick={() => setOpenED((openED) => !openED)}
            />

            <div ref={refOne}>
              {openED && (
                <Calendar
                  date={new Date()}
                  onChange={handleSelectED}
                  className="calendarElement"
                />
              )}
            </div>
            <select
              className="input-add"
              placeholder="Client..."
              onChange={(event) => {
                setNewPB(event.target.value);
              }}
            >
              <option>{"Please select client who purchase"}</option>
              {Object.keys(Customer).map((id) => {
                return <option>{Customer[id].name}</option>;
              })}
            </select>
            <div className="text-center">
              <button className="btn-create" onClick={createUser}>
                Edit Purchase
              </button>
              <NavLink to="/mainmeun/service/psp" className="btn-delete">
                Cancel
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddEditPSP
