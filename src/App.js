import "./App.css";
import Todo from "./Todo";
import React, { useState, useEffect } from "react";
import { Container, List, Paper } from "@mui/material";
import AddTodo from "./AddTodo";
import {call} from "./service/ApiService";


function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
	// const requestOptions = {
	// 	method: "GET",
	// 	headers: {"Content-Type": "application/json"}
	// };
	// fetch("http://localhost:8080/todo", requestOptions)
	// 		.then(res => res.json())
	// 		.then(res => {
	// 			setItems(res.data);
	// 		}, err=>{}
	// 		);
	call("/todo", "GET", null)
		.then(res => setItems(res.data));

  }, []);


  const addItem = item =>{
    // item.id="ID-"+items.length;
    // item.done = false;
    // setItems([...items, item]);
    // console.log("items:", items);
	call("/todo", "POST", item)
		.then(res => setItems(res.data));
  }

  const editItem = (item) =>{
	// setItems([...items]);
	call("/todo", "PUT", item)
		.then(res => setItems(res.data));
  }

  const deleteItem = (item)=>{
	// const newItems = items.filter(e => e.id !==item.id);
	// setItems([...newItems]);
	call("/todo", "DELETE", item)
		.then(res => setItems(res.data));
  }

  
  let todoItems = items.length > 0 && (
    <Paper style={{ margin: 16 }}>
      <List>
        {items.map((item) => (
          <Todo item={item} key={item.id} editItem={editItem} deleteItem={deleteItem}/>
        ))}
      </List>
    </Paper>
  );

  return <div className="App">
	<Container maxWidth="md">
		<AddTodo addItem={addItem}/>
		<div className="TodoList">{todoItems}</div>
	</Container>
	</div>;
}

export default App;
