import React, { useState, useEffect } from "react";
import { db } from "../../../firebase";
import { uid } from "uid";
import { NavLink, useNavigate } from "react-router-dom";
import "./AddEdit.css";
import { ref, set, onValue } from "firebase/database";

const AddEditClientsPurchase = () => {
  const [newName, setNewName] = useState("");
  const [newTotal, setNewTotal] = useState(0);
  const [Remark, setRemark] = useState([]);
  const [Customer, setCustomer] = useState([]);
  const [newPB, setNewPB] = useState([]);

  const navigate = useNavigate();

  const createUser = () => {
    const uuid = uid();

    set(ref(db, "ClientsPurchase/" + uuid), {
      name: newName,
      remark: Remark,
      total: newTotal,
      pb: newPB,
    });

    navigate("/mainmeun/customer/cp/");
  };

  // useEffect(() => {
  //   const getClientsPurchase = () => {
  //     onValue(ref(db, "ClientsPurchase/"), (snapshot) => {
  //       if (snapshot.val() !== null) {
  //         setClientsPurchase({ ...snapshot.val() });
  //       }
  //     });
  //   };
  //   getClientsPurchase();

  // }, []);

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
            <input
              className="input-add"
              placeholder="Service/Product..."
              onChange={(event) => {
                setNewName(event.target.value);
              }}
            />

            <input
              className="input-add"
              type="number"
              placeholder="Total Price..."
              value={newTotal || ""}
              onChange={(event) => {
                setNewTotal(event.target.value);
              }}
            />

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
            <input
                className="input-add"
                placeholder="Remark..."
                value={Remark || ""}
                onChange={(event) => {
                  setRemark(event.target.value);
                }}
              />
            <div className="text-center">
              <button className="btn-create" onClick={createUser}>
                Edit Purchase
              </button>
              <NavLink to="/mainmeun/customer/cp/" className="btn-delete">
                Cancel
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEditClientsPurchase;
