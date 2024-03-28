import React, { useState, useEffect } from "react";
import { db } from "../../../firebase";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import "./AddEdit.css";
import { ref, set, onValue } from "firebase/database";

const UpdateCI = () => {
  const [newName, setNewName] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [newTelephone, setNewTelephone] = useState("");
  const [newAbout, setNewAbout] = useState("");
  const [staff, setStaff] = useState([]);

  const navigate = useNavigate();
  const { id } = useParams();

  const createUser = () => {
    set(ref(db, "CI/" + id), {
      name: newName,
      address: newAddress,
      tel: newTelephone,
      about: newAbout,
    });

    navigate("/mainmeun/setting/ci");
  };

  useEffect(() => {
    const getStaff = () => {
      onValue(ref(db, "CI/" + id), (snapshot) => {
        if (snapshot.val() !== null) {
          setStaff({ ...snapshot.val() });
        }
      });
    };
    getStaff();
    setNewName(staff.name);
    setNewAddress(staff.address);
    setNewTelephone(staff.tel);
    setNewAbout(staff.about);
  }, [id, staff.name, staff.address, staff.tel, staff.about]);

  return (
    <div className="main">
      <div
        className="App"
        style={{ width: "100%", padding: "100px", height: "1000px" }}
      >
        <div style={{ padding: "0px 215px" }} className="container">
          <h1>Edit User</h1>

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
              placeholder="Name..."
              value={newName || ""}
              onChange={(event) => {
                setNewName(event.target.value);
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
              type="number"
              placeholder="Telephone..."
              value={newTelephone || ""}
              onChange={(event) => {
                setNewTelephone(event.target.value);
              }}
            />
            <input
              className="input-add"
              placeholder="About us..."
              value={newAbout || ""}
              onChange={(event) => {
                setNewAbout(event.target.value);
              }}
            />
            <div className="text-center">
              <button className="btn-create" onClick={createUser}>
                Edit Information
              </button>
              <NavLink to="/mainmeun/setting/ci" className="btn-delete">
                Cancel
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateCI;
