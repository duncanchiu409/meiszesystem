import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import { db } from "../../../firebase";
import { onValue, ref } from "firebase/database";

import "../../../App.css";

const CI = () => {
  const [CI, setCI] = useState([]);

  useEffect(() => {
    const getCI = () => {
      onValue(ref(db, "CI"), (snapshot) => {
        if (snapshot.val() !== null) {
          setCI({ ...snapshot.val() });
        }
      });
    };

    getCI();
  }, []);



  return (
    <div className="main">
      <div
        className="App"
        style={{ width: "100%", padding: "100px", height: "1000px" }}
      >
        <div style={{ padding: "0px 430px" }} className="container">
          <div className="card-header">
            <h1>Information</h1>
          </div>

          {Object.keys(CI).map((id) => {
            return (
              <div className="view-container">
                <br />
                <strong>Name:</strong>
                <br />
                <span>{CI[id].name}</span>
                <br />
                <br />
                <strong>Address:</strong>
                <br />
                <span>{CI[id].address}</span>
                <br />
                <br />
                <strong>Telephone:</strong>
                <br />
                <span>{CI[id].tel}</span>
                <br />
                <br />
                <strong>About Us:</strong>
                <br />
                <span>{CI[id].about}</span>
                <br />
                <br />

                <div className="text-center">
                  <NavLink to={`update/${id}`} className="btn-edit">
                    Edit
                  </NavLink>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CI;
