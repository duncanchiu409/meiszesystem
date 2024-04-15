import React, { useState, useEffect } from "react";
import { db } from "../../../firebase";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import "./AddEdit.css";
import { ref, set, onValue } from "firebase/database";
import { Formik } from "formik";
import * as yup from 'yup'

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
  
  const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

  const checkoutSchema = yup.object().shape({
    name: yup.string().required("Required"),
    address: yup.string().required("Required"),
    telephone: yup.string().matches(phoneRegExp, "Phone Number is not valid").required("Required"),
    about: yup.string().required("Required")
  })

  return (
    <div className="main">
      <div
        className="App"
      >
        <div className="container">
          <h1>Edit User</h1>
          
          {/* <Formik initialValues={ini} onSubmit={() => console.log("Submitted")} validationSchema={checkoutSchema}>
          
          </Formik> */}

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
