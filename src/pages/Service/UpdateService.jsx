import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import "./AddEdit.css";
import { ref, set, onValue } from "firebase/database";


const UpdateService = () => {
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newRemark, setNewRemark] = useState("");
  const [Service, setService] = useState([]);

  const { id } = useParams();

  const navigate = useNavigate();

  const createUser = () => {
    set(ref(db, "Service/" + id), {
      name: newName,
      description: newDescription,
      remark: newRemark,
    });

    navigate("/mainmeun/service");
  };

  useEffect(() => {
    const getService = () => {
      onValue(ref(db, "Service/" + id), (snapshot) => {
        if (snapshot.val() !== null) {
          setService({ ...snapshot.val() });
        }
      });
    };
    getService();
    setNewName(Service.name);
    setNewDescription(Service.description);
    setNewRemark(Service.remark);
  }, [id, Service.name, Service.description, Service.remark]);

  return (
    <div className="main">
      <div
        className="App"
        style={{ width: "100%", padding: "100px", height: "1000px" }}
      >
        <div style={{ padding: "0px 215px" }} className="container">
          <h1>Edit Service </h1>

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
              placeholder="Description..."
              value={newDescription || ""}
              onChange={(event) => {
                setNewDescription(event.target.value);
              }}
            />
            <input
              className="input-add"
              placeholder="Remark..."
              value={newRemark || ""}
              onChange={(event) => {
                setNewRemark(event.target.value);
              }}
            />
            

            <div className="text-center">
              <button className="btn-create" onClick={createUser}>
                Edit Service
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

export default UpdateService;
