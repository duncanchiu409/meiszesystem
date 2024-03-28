import React, {useState, useEffect} from 'react'
import {db} from "../../firebase";
import{NavLink , useParams} from "react-router-dom"
import './AddEdit.css'
import {ref , onValue } from 'firebase/database'

const ViewProduct = () => {
    const [products, setProducts] = useState([]);
    
    const {id}=useParams();
    
    useEffect(() => {
        const getProducts = () => {
          onValue(ref(db, 'products/' + id ) , (snapshot) => {
      
           if(snapshot.val() !==null){
             setProducts({...(snapshot.val())})
             
           }
         });
       }
        getProducts();

          
    },[id]);


    return (
        <div className="main">
        <div className="App" style={{width:"100%", padding:"100px", height:"1000px"}}>
      
  
        <div style={{padding: "0px 450px"}} className="container" >
            <div className='card-header'>
                <h1>Product #{products.code}</h1>
            </div>
            <div className='view-container'>
                <br/>
                <strong>Name:</strong>
                <br/>
                <span>{products.name}</span>
                <br/>
                <br/>
                <strong>Bar Code/SKU:</strong>
                <br/>
                <span>{products.sku}</span>
                <br/>
                <br/>
                <strong>Model/Detail/Specification:</strong>
                <br/>
                <span>{products.model}</span>
                <br/>
                <br/>
                <strong>Type:</strong>
                <br/>
                <span>{products.type}</span>
                <br/>
                <br/>
                <strong>Other Information:</strong>
                <br/>
                <span>{products.oi}</span>
                <br/>
                <br/>
                <strong>Acessories:</strong>
                <br/>
                <span>{products.acessories}</span>
                <br/>
                <br/>
                <strong>Module:</strong>
                <br/>
                <span>{products.module}</span>
                <br/>
                <br/>
                <strong>Attributes:</strong>
                <br/>
                <span>{products.attributes}</span>
                <br/>
                <br/>
                <strong>Process:</strong>
                <br/>
                <span>{products.process}</span>
                <br/>
                <br/>
                <strong>Price:</strong>
                <br/>
                <span>{products.price}</span>
                <br/>
                <br/>
                <strong>Phote/Video/Appendix:</strong>
                <br/>
                <span>{}</span>
                <br/>
                <br/>
                <div className='text-center'>
                        
                        <NavLink to="/mainmeun/product" className='btn-delete'>Go Back</NavLink>
                </div>
            </div>
        </div>
        </div>
        </div>
    )
}

export default ViewProduct
