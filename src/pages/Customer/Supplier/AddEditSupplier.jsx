import React, { useState } from "react";
import { db } from "../../../firebase";
import { uid } from "uid";
import { NavLink, useNavigate } from "react-router-dom";
import "./AddEdit.css";
import { ref, set } from "firebase/database";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const AddEditSupplier = () => {
    const [newName, setNewName] = useState("");
    const [newMobile, setNewMobile] = useState(0);
    const [newEmail, setNewEmail] = useState("");
    const [newAddress, setNewAddress] = useState("");
    const [newOT, setNewOT] = useState("");
    const [newCP, setNewCP] = useState("");

    const navigate = useNavigate();
  
    const createUser = () => {
      const uuid = uid();
  
      set(ref(db, "Supplier/" + uuid), {
        name: newName,
        mobile: newMobile,
        email: newEmail,
        address: newAddress,
        ot: newOT,
        cp: newCP,
      });
  
      navigate("/mainmeun/customer/supplier");
    };
  
    return (
      <div className="main">
        <div
          className="App"
          style={{ width: "100%", padding: "100px", height: "1000px" }}
        >
          <div style={{ padding: "0px 215px" }} className="container">
            <h1>Add Supplier</h1>
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
                onChange={(event) => {
                  setNewName(event.target.value);
                }}
              />
              <input
                className="input-add"
                placeholder="Office Telephone..."
                onChange={(event) => {
                  setNewOT(event.target.value);
                }}
              />
              <input
                className="input-add"
                placeholder="Contact Person..."
                onChange={(event) => {
                  setNewCP(event.target.value);
                }}
              />
              <input
                className="input-add"
                placeholder="Mobile..."
                onChange={(event) => {
                  setNewMobile(event.target.value);
                }}
              />
              <input
                className="input-add"
                placeholder="Address..."
                onChange={(event) => {
                  setNewAddress(event.target.value);
                }}
              />
              <input
                className="input-add"
                placeholder="Email..."
                onChange={(event) => {
                  setNewEmail(event.target.value);
                }}
              />
            
  
              <div className="text-center">
                <button className="btn-create" onClick={createUser}>
                  Create Supplier
                </button>
                <NavLink to="/mainmeun/customer/Supplier/" className="btn-delete">
                  Cancel
                </NavLink>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
}

export default AddEditSupplier
