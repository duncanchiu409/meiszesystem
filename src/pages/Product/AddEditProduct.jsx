import React, { useState } from "react";
import { db } from "../../firebase";
import { uid } from "uid";
import { NavLink, useNavigate } from "react-router-dom";
import "./AddEdit.css";
import { ref, set } from "firebase/database";

const AddEditProduct = () => {
  const [newName, setNewName] = useState("");
  const [newSKU, setNewSKU] = useState("");
  const [newModel, setNewModel] = useState("");
  const [newType, setNewType] = useState("");
  const [newOtherInformation, setNewOtherInformation] = useState("");
  const [newAcessories, setNewAcessories] = useState("");
  const [newModule, setNewModule] = useState("");
  const [newAttributes, setNewAttributes] = useState("");
  const [newProcess, setNewProcess] = useState("");
  const [newPrice, setNewPrice] = useState(0);

  const navigate = useNavigate();

  const createUser = () => {
    const uuid = uid();

    set(ref(db, "products/" + uuid), {
      name: newName,
      sku: newSKU,
      model: newModel,
      type: newType,
      oi: newOtherInformation,
      acessories: newAcessories,
      module: newModule,
      attributes: newAttributes,
      process: newProcess,
      price: newPrice,
    });

    navigate("/mainmeun/product");
  };

  const createAI = () => {
    const uuid = uid();

    set(ref(db, "products/" + uuid), {
      name: newName,
      sku: newSKU,
      model: newModel,
      type: newType,
      oi: newOtherInformation,
      acessories: newAcessories,
      module: newModule,
      attributes: newAttributes,
      process: newProcess,
      price: newPrice,
    });

    set(ref(db, "ProductionOrder/" + uuid), {
      name: newName,
      sku: newSKU,
      model: newModel,
      type: newType,
      oi: newOtherInformation,
      acessories: newAcessories,
      module: newModule,
      attributes: newAttributes,
    });

    navigate("/mainmeun/product");
  };

  return (
    <div className="main">
      <div
        className="App"
        style={{ width: "100%", padding: "100px", height: "1000px" }}
      >
        <div style={{ padding: "0px 215px" }} className="container">
          <h1>Add Product</h1>
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
              placeholder="Bar Code/SKU..."
              onChange={(event) => {
                setNewSKU(event.target.value);
              }}
            />
            <input
              className="input-add"
              placeholder="Model/Detail/Specification..."
              onChange={(event) => {
                setNewModel(event.target.value);
              }}
            />
            <input
              className="input-add"
              placeholder="Type..."
              onChange={(event) => {
                setNewType(event.target.value);
              }}
            />
            <input
              className="input-add"
              placeholder="Other Information..."
              onChange={(event) => {
                setNewOtherInformation(event.target.value);
              }}
            />
            <input
              className="input-add"
              placeholder="Acessories..."
              onChange={(event) => {
                setNewAcessories(event.target.value);
              }}
            />
            <input
              className="input-add"
              placeholder="Module..."
              onChange={(event) => {
                setNewModule(event.target.value);
              }}
            />
            <input
              className="input-add"
              placeholder="Attributes..."
              onChange={(event) => {
                setNewAttributes(event.target.value);
              }}
            />
            <select

              className="input-add"
              placeholder="Process..."
              onChange={(event) => {
                setNewProcess(event.target.value);
              }}
            >
              <option>{"No"}</option>
              <option>{"Yes"}</option>
            </select>
            <input
              className="input-add"
              placeholder="Price..."
              type="number"
              onChange={(event) => {
                setNewPrice(event.target.value);
              }}
            />
            <div className="text-center">
              <button className="btn-create" >
                Import Appendix
              </button>
              <button className="btn-create" onClick={
                
                newProcess ==="Yes" ? createAI : 
              
              createUser}>
                Create Product
              </button>
              <NavLink to="/mainmeun/product" className="btn-delete">
                Cancel
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEditProduct;
