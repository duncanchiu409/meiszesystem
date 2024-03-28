import React, {useState } from "react";
import { db } from "../../firebase";
import { uid } from "uid";
import { NavLink, useNavigate } from "react-router-dom";
import "./AddEdit.css";
import { ref, set } from "firebase/database";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const AddEditService = () => {
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newRemark, setNewRemark] = useState("");

  const navigate = useNavigate();

  const createUser = () => {
    const uuid = uid();

    set(ref(db, "Service/" + uuid), {
      name: newName,
      description: newDescription,
      remark: newRemark,
    });

    navigate("/mainmeun/service");
  };

  return (
    <div className="main">
      <div
        className="App"
        style={{ width: "100%", padding: "100px", height: "1000px" }}
      >
        <div style={{ padding: "0px 215px" }} className="container">
          <h1>Add Service</h1>
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
              placeholder="Service Name..."
              onChange={(event) => {
                setNewName(event.target.value);
              }}
            />
            <input
              className="input-add"
              placeholder="Description..."
              onChange={(event) => {
                setNewDescription(event.target.value);
              }}
            />
            <input
              className="input-add"
              placeholder="Remark..."
              onChange={(event) => {
                setNewRemark(event.target.value);
              }}
            />
            <div className="text-center">
            <button className="btn-create" >
                Import Appendix
              </button>
              <button className="btn-create" onClick={createUser}>
                Create Service
              </button>
              <NavLink to="/mainmeun/service" className="btn-delete">
                Cancel
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEditService;
