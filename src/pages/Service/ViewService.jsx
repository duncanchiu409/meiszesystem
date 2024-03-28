import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { NavLink, useParams } from "react-router-dom";
import "./AddEdit.css";
import { ref, onValue } from "firebase/database";
import logo from "../../images/perv-beauty-web-Ultraformer-MPT-02.jpg";
import logo2 from "../../images/perv-beauty-web-Ultraformer-MPT-03-3.jpg";

const ViewService = () => {
  const [Service, setService] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    const getService = () => {
      onValue(ref(db, "Service/" + id), (snapshot) => {
        if (snapshot.val() !== null) {
          setService({ ...snapshot.val() });
        }
      });
    };
    getService();
  }, [id]);

  return (
    <div className="main">
      <div
        className="App"
        style={{ width: "100%", padding: "100px", height: "1000%" }}
      >
        <div style={{ padding: "0px 450px" }} className="container">
          <div className="card-header">
            <h1>Service</h1>
          </div>
          <div className="view-container">
            <br />
            <strong>Service Name:</strong>
            <br />
            <span>{Service.name}</span>
            <br />
            <br />
            <strong>Description:</strong>
            <br />
            <span>{Service.description}</span>
            <br />
            <br />
            <strong>Remark:</strong>
            <br />
            <span>{Service.remark}</span>
            <br />
            <br />
            <strong>Photo/Video/PDF</strong>
            <br />
            <img
              style={{
                color: "#e1e9fc",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              alt="logo"
              src={logo}
            />
            <img
              style={{
                color: "#e1e9fc",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              alt="logo"
              src={logo2}
            />

            <div className="text-center">
              <NavLink to="/mainmeun/service" className="btn-delete">
                Go Back
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewService;
