import React, { useState, useEffect } from "react";
import { db } from "../../../firebase";
import { NavLink, useParams } from "react-router-dom";
import "./AddEdit.css";
import { ref, onValue } from "firebase/database";

const ViewPaymentRequest = () => {
  const [PaymentRequest, setPaymentRequest] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    const getPaymentRequest = () => {
      onValue(ref(db, "paymentRequest/" + id), (snapshot) => {
        if (snapshot.val() !== null) {
          setPaymentRequest({ ...snapshot.val() });
        }
      });
    };
    getPaymentRequest();
  }, [id]);

  return (
    <div className="main">
      <div
        className="App"
        style={{ width: "100%", padding: "100px", height: "1000px" }}
      >
        <div style={{ padding: "0px 450px" }} className="container">
          <div className="card-header">
            <h1>Payment Request</h1>
          </div>
          <div className="view-container">
            <br />
            <strong>Payment Request No:</strong>
            <br />
            <span>{PaymentRequest.no}</span>
            <br />
            <br />
            <strong>Date:</strong>
            <br />
            <span>{PaymentRequest.date}</span>
            <br />
            <br />
            <strong>Payment Request to:</strong>
            <br />
            <span>{PaymentRequest.prt}</span>
            <br />
            <br />
            <strong>Item:</strong>
            <br />
            <span>{PaymentRequest.item}</span>
            <br />
            <br />
            <strong>Status:</strong>
            <br />
            <span>{PaymentRequest.status}</span>
            <br />
            <br />
            <strong>Total:</strong>
            <br />
            <span>${PaymentRequest.total}</span>
            <br />
            <br />

            <div className="text-center">
              <NavLink
                to="/mainmeun/financial/paymentrequest"
                className="btn-delete"
              >
                Go Back
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPaymentRequest;
