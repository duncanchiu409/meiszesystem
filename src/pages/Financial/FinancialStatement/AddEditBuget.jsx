import React, {useState, useEffect} from 'react'
import {db} from "../../../firebase";
import{NavLink, useNavigate} from "react-router-dom"
import "./AddEdit.css";
import {ref, set, onValue } from 'firebase/database'

const AddEditBuget = () => {

    const [newIncome, setNewIncome] = useState(0);
    const [newExpense, setNewExpense] = useState(0);
    const [newBudget,setNewBudget] = useState([]);

    const navigate = useNavigate()

    const createUser = () => {
  
        set(ref(db,'budget/'),{
          income: newIncome,
          expense: newExpense,
          balance: parseInt(newIncome) - parseInt(newExpense),
        })
      
  
        navigate('/mainmeun/financial/FS/')
        
    };

    useEffect(() => {
        const getBudget = () => {
          onValue(ref(db, 'budget/' ) , (snapshot) => {
      
           if(snapshot.val() !==null){
             setNewBudget({...(snapshot.val())})
           }else{
            setNewBudget({income: 0, expense: 0, balance:0});
           }
         });
       }
        getBudget();
        setNewIncome(newBudget.income);
        setNewExpense(newBudget.expense);

          
       },[newBudget.balance, newBudget.income, newBudget.expense]);


  return (
    <div className="main">
      <div className="App" style={{width:"100%", padding:"100px", height:"1000px"}}>
    

      <div style={{padding: "0px 215px"}} className="container" >
                <h1>Edit Budget</h1>
                
                <form 
                    style ={{
                        margin: "auto",
                        padding: "15px",
                        maxWidth: "400px",
                        justifyContent: "center",
                        alignContent: "center",
                    }}
                >
                    <input className='input-add' type="number" placeholder="Budget Income..." value={newIncome || ""} onChange={(event) => {setNewIncome(event.target.value)}}/>
                    <input className='input-add' type="number" placeholder='Budget Expense...' value={newExpense || ""} onChange={(event) => {setNewExpense(event.target.value)}}/>
                    <div className='text-center'>
                        <button className='btn-create' onClick={createUser}>Edit Budget</button>
                        <NavLink to="/mainmeun/financial/FS/" className='btn-delete'>Cancel</NavLink>
                    </div>
                    

                </form>
                
            </div>
            
        
            
        </div>
      
    </div>
  )
}

export default AddEditBuget
