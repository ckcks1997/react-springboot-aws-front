import "./App.css";
import Todo from "./Todo";
import React, { useState, useEffect } from "react";
import { Container, List, Paper, Grid, Button, AppBar, Toolbar, Typography } from "@mui/material";
import AddTodo from "./AddTodo";
import LoadingPage from "./LoadingPage";
import {call, signout} from "./service/ApiService";


function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
	call("/todo", "GET", null)
		.then(res => {
			setItems(res.data);
			setTimeout(()=>{setLoading(false)},100);
		});
  }, []);


  const addItem = item =>{
	call("/todo", "POST", item)
		.then(res => setItems(res.data));
  }

  const editItem = (item) =>{
	call("/todo", "PUT", item)
		.then(res => setItems(res.data));
  }

  const deleteItem = (item)=>{
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

  let navigationBar = (
	<AppBar position="static">
		<Toolbar>
			<Grid justifyContent="space-between" container>
				<Grid item>
					<Typography variant="h6">오늘의 할일</Typography>
				</Grid>
				<Grid item>
					<Button color="inherit" raised onClick={signout}>
						로그아웃
					</Button>
				</Grid>
			</Grid>
		</Toolbar>
	</AppBar>
  )

  let todoListPage = (
	<div>
		{navigationBar}
		<Container maxWidth="md">
			<AddTodo addItem = {addItem}/>
			<div className = "TOdoList">{todoItems}</div>
		</Container>
	</div>
  )

  let loadingPage = <LoadingPage/>;
  let content = loadingPage;
  if(!loading){
	content = todoListPage;
  }

  return (
  	<div className="App">
		{content}
	</div>
	);
}

export default App;
