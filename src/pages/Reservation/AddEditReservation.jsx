import React, { useState, useEffect, useRef } from "react";
import { db } from "../../firebase";
import { uid } from "uid";
import { onValue, ref, set } from "firebase/database";
import { NavLink,useNavigate } from "react-router-dom";
import "../../App.css";
import { addDays } from "date-fns";
import { TimePicker } from "@hilla/react-components/TimePicker";
import { Calendar } from "react-date-range";
import format from "date-fns/format";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
// import { DatePicker } from "@hilla/react-components/DatePicker";
// import { formatISO, addDays, isBefore, isAfter, parse } from "date-fns";

const AddEditReservation = () => {
  //   const [valid, setvalid] = useState(true);
  //   const [hide, sethide] = useState(true);
  //   const minDate = new Date();
  //   const maxDate = addDays(new Date(), 60);
  //   const [errorMessage, setErrorMessage] = useState("");
  const [Service, setService] = useState("");
  const [SelectedService, setSelectedService] = useState("");
  const [newCustomer, setNewCustomer] = useState("");
  const [newStaff, setNewStaff] = useState("");
  const [newRoom, setNewRoom] = useState("");
  const [newSite, setNewSite] = useState("");
  const [newDate, setNewDate] = useState("");

  const navigate = useNavigate();
  

  const startDate = addDays(new Date(), 1);
  const endDate = addDays(new Date(), 31);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const uuid = uid();
    const book_time = document.getElementById("book-time");

    if (!newDate || !book_time.value || !SelectedService) {
      alert("Please fill all the fields");
    } else {
      writeUserData();
      function writeUserData() {
        set(ref(db, `Reservation/${uuid}`), {
          customer: newCustomer,
          service: SelectedService,
          date: newDate,
          time: book_time.value,
          staff: newStaff,
          room: newRoom,
          site: newSite,
        });
      }
      alert("Your booking has been made");
      navigate("/mainmeun/reservation");
    }
  };

  useEffect(() => {
    onValue(ref(db, "Service/"), (snapshot) => {
      if (snapshot.val() !== null) {
        setService({ ...snapshot.val() });
      }
    });
  }, []);

  return (
    <div className="main">
      <div
        className="App"
        style={{ width: "200%", padding: "100px", height: "1000%" }}
      >
        <div style={{ padding: "0px 215px" }} className="container">
          <div className="container">
            <div className="content">
              <div className="text">Book Now</div>
              <div className="form2">
                <div className="txt">Date & Time you would like to Book</div>
                <form action="" onSubmit={handleSubmit}>
                  <div className="inputData">
                    <input
                      value={newDate}
                      onClick={() => setOpen((open) => !open)}
                    />

                    <div ref={refOne}>
                      {open && (
                        <Calendar
                          date={new Date()}
                          minDate={startDate}
                          maxDate={endDate}
                          onChange={handleSelect}
                          className="calendarElement"
                        />
                      )}
                    </div>
                  </div>
                  <div className="inputData">
                    <TimePicker
                      step={60 * 30}
                      id="book-time"
                      min="11:00"
                      max="19:30"
                      required
                    />
                  </div>
                  <div className="inputData">
                    <input
                      className="input-add"
                      placeholder="Client..."
                      onChange={(event) => {
                        setNewCustomer(event.target.value);
                      }}
                    />
                  </div>
                  <div className="txt">Service you would like to have</div>
                  <div className="inputData">
                    <select
                      value={SelectedService}
                      onChange={(event) => {
                        setSelectedService(event.target.value);
                      }}
                    >
                      <option>{"Service"}</option>

                      {Object.keys(Service).map((id) => {
                        return <option>{Service[id].name}</option>;
                      })}
                    </select>
                  </div>
                  <div className="inputData">
                    <input
                      className="input-add"
                      placeholder="Staff..."
                      onChange={(event) => {
                        setNewStaff(event.target.value);
                      }}
                    />
                  </div>
                  <div className="inputData">
                    <select
                      value={newRoom}
                      onChange={(event) => {
                        setNewRoom(event.target.value);
                      }}
                    >
                      <option>{"Room01"}</option>
                      <option>{"Room02"}</option>
                      <option>{"Room03"}</option>
                      <option>{"Room04"}</option>
                      <option>{"Room05"}</option>
                      <option>{"Room06"}</option>
                    </select>
                  </div>
                  <div className="inputData">
                    <select
                      value={newSite}
                      onChange={(event) => {
                        setNewSite(event.target.value);
                      }}
                    >
                      <option>{"Tuen Mun"}</option>
                      
                    </select>
                  </div>
                  <button className="btn-create" type="submit">
                    Book
                  </button>
                  <NavLink
                  to="/mainmeun/reservation"
                  className="btn-delete"
                >
                  Cancel
                </NavLink>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEditReservation;
