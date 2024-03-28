import React, {useState, useEffect} from 'react'
import {db} from "../../firebase";
import{NavLink, useNavigate, useParams} from "react-router-dom"
import "./AddEdit.css";
import {ref, set, onValue } from 'firebase/database'

const UpdateProduct = () => {
  const [newName, setNewName] = useState("");
  const [newSKU, setNewSKU] = useState("");
  const [newModel, setNewModel] = useState("");
  const [newType, setNewType] = useState("");
  const [newOtherInformation, setNewOtherInformation] = useState("");
  const [newAcessories, setNewAcessories] = useState("");
  const [newModule, setNewModule] = useState("");
  const [newAttributes, setNewAttributes] = useState("");
  const [newProcess, setNewProcess] = useState("");
  const [newPrice, setNewPrice] = useState("");
    const [products, setProducts] = useState([]);
    const navigate = useNavigate()
    const {id}=useParams();
      const createUser = () => {
  
        set(ref(db,'products/' + id),{
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
        })
      
        navigate('/mainmeun/product')
        
    };
  
  //   const getProducts = () => {
  //     onValue(ref(db, 'products/' + id) , (snapshot) => {
  
  //      if(snapshot.val() !==null){
  //        setProducts({...(snapshot.val())})
         
  //      }
  //    });
  //  }
  
   useEffect(() => {
    const getProducts = () => {
      onValue(ref(db, 'products/' + id ) , (snapshot) => {
  
       if(snapshot.val() !==null){
         setProducts({...(snapshot.val())})
         
       }
     });
   }
    getProducts();
    setNewName(products.name);
    setNewSKU(products.sku);
    setNewModel(products.model);
    setNewType(products.type);
    setNewOtherInformation(products.oi);
    setNewAcessories(products.acessories);
    setNewModule(products.module);
    setNewAttributes(products.attributes);
    setNewProcess(products.process);
    setNewPrice(products.price);
      
   },[id,products.name,products.sku, products.module,products.type,products.oi,products.acessories,products.model,products.attributes,products.process,products.price]);
  
  
  
    return (
      <div className="main">
        <div className="App" style={{width:"100%", padding:"100px", height:"1000px"}}>
      
  
        <div style={{padding: "0px 215px"}} className="container" >
                  <h1>Edit Product #{id}</h1>
                  
                  <form 
                      style ={{
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
              placeholder="Bar Code/SKU..."
              value={newSKU || ""}
              onChange={(event) => {
                setNewSKU(event.target.value);
              }}
            />
            <input
              className="input-add"
              placeholder="Model/Detail/Specification..."
              value={newModel || ""}
              onChange={(event) => {
                setNewModel(event.target.value);
              }}
            />
            <input
              className="input-add"
              placeholder="Type..."
              value={newType || ""}
              onChange={(event) => {
                setNewType(event.target.value);
              }}
            />
            <input
              className="input-add"
              placeholder="Other Information..."
              value={newOtherInformation || ""}
              onChange={(event) => {
                setNewOtherInformation(event.target.value);
              }}
            />
            <input
              className="input-add"
              placeholder="Acessories..."
              value={newAcessories || ""}
              onChange={(event) => {
                setNewAcessories(event.target.value);
              }}
            />
            <input
              className="input-add"
              placeholder="Module..."
              value={newModule || ""}
              onChange={(event) => {
                setNewModule(event.target.value);
              }}
            />
            <input
              className="input-add"
              placeholder="Attributes..."
              value={newAttributes || ""}
              onChange={(event) => {
                setNewAttributes(event.target.value);
              }}
            />
            <input
              className="input-add"
              placeholder="Process..."
              value={newProcess || ""}
              onChange={(event) => {
                setNewProcess(event.target.value);
              }}
            />
            <input
              className="input-add"
              placeholder="Price..."
              value={newPrice || ""}
              type="number"
              onChange={(event) => {
                setNewPrice(event.target.value);
              }}
            />
            <div className="text-center">
              <button className="btn-create" >
                Import Appendix
              </button>
              <button className="btn-create" onClick={createUser}>
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
    )
}

export default UpdateProduct
