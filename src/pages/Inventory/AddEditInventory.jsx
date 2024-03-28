import React, { useEffect, useRef, useState } from "react";
import { db } from "../../firebase";
import { uid } from "uid";
import { NavLink, useNavigate } from "react-router-dom";
import "./AddEdit.css";
import { ref, set } from "firebase/database";
import { Calendar } from "react-date-range";
import format from "date-fns/format";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const AddEditInventory = () => {
  const [newStatus, setNewStatus] = useState("");
  const [newRefNo, setNewRefNo] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newProduct, setNewProduct] = useState("");
  const [newQuantity, setNewQuantity] = useState(0);
  const [newCost, setNewCost] = useState("");
  const [newRemark, setNewRemark] = useState("");
  //const [StockDetail, setStockDetail] = useState([]);

  const navigate = useNavigate();

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

  const createUser = () => {
    const uuid = uid();

    set(ref(db, "inventory/" + uuid), {
      status: newStatus,
      refno: newRefNo,
      date: newDate,
      product: newProduct,
      quantity: newQuantity,
      cost: newCost,
      remark: newRemark,
    });


    navigate("/mainmeun/inventory");
  };


  return (
    <div className="main">
      <div
        className="App"
        style={{ width: "100%", padding: "100px", height: "1000px" }}
      >
        <div style={{ padding: "0px 215px" }} className="container">
          <h1>Add Inventory</h1>
          <form
            style={{
              margin: "auto",
              padding: "15px",
              maxWidth: "400px",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <select
              className="input-add"
              placeholder="Status..."
              onChange={(event) => {
                setNewStatus(event.target.value);
              }}
            >
              <option>{"Stock In"}</option>
              <option>{"Stock Out"}</option>
              <option>{"Consignment Sale"}</option>
              <option>{"Consignment Purchase"}</option>
              <option>{"Temporary Stock In"}</option>
              <option>{"Temporary Stock Out"}</option>
              <option>{"After Sales Return Goods"}</option>
              <option>{"GoodsReturn"}</option>
            </select>
            <input
              className="input-add"
              placeholder="Ref No..."
              onChange={(event) => {
                setNewRefNo(event.target.value);
              }}
            />
            <input
              value={newDate}
              readOnly
              className="input-add"
              onClick={() => setOpen((open) => !open)}
            />

            <div ref={refOne}>
              {open && (
                <Calendar
                  date={new Date()}
                  onChange={handleSelect}
                  className="calendarElement"
                />
              )}
            </div>
            <input
              className="input-add"
              placeholder="Product..."
              onChange={(event) => {
                setNewProduct(event.target.value);
              }}
            />
            <input
              className="input-add"
              type="number"
              placeholder="Quantity..."
              onChange={(event) => {
                setNewQuantity(event.target.value);
              }}
            />
            <input
              className="input-add"
              type="number"
              placeholder="Total Cost..."
              onChange={(event) => {
                setNewCost(event.target.value);
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
              <button className="btn-create" onClick={createUser}>
                Create Inventory
              </button>
              <NavLink to="/mainmeun/inventory" className="btn-delete">
                Cancel
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEditInventory;
