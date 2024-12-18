import React, { useState, useEffect } from "react";



//create your first component
const Home = () => {
	const [inputValor, setInputValor] = useState("");
	// const [listado, setListado] = useState([]);
	const [job,setJob] = useState([]);
	useEffect (()=>{
		const getHacerTareas = async () => {
			let response = await fetch("https://dummyjson.com/todos");
			if(!response.ok){ new Error (" No se recibieron datos")}
			let data = await response.json();
			let newArray = data.todos.map((tarea)=> tarea.todo);
			setJob(newArray);
		}
		getHacerTareas()
	},[])
	const listJob = job.map((t) => <li>{t}</li>);
	
	


	return (
		<div className="container justify-content-center">
			
			<h1>Mi listado de tareas</h1>
			<div className="container d-flex justify-content-center">
			<button type="button" class="btn btn-danger" onClick={()=> setJob(job.filter((t,currentIndex)=> job.length === currentIndex))}>Vaciar lista</button>	
			</div>
			
			{listJob.length===0 ? (
				<div>No hay tareas disponibles</div>):(
				<ul>
				<li>
					<input
						type="text" 
						onChange={(e) => setInputValor(e.target.value)} 
						value={inputValor}
						onKeyUp={(e) => {
							if (e.key === "Enter" && inputValor !=="") {								
								setJob([...job ,inputValor]);
								setInputValor("");
								alert("Tarea añadida");
							}
						}}
						placeholder="Introduce la tarea en el listado"></input>
						</li>
			

				{job.map((item,index) => {
					return(
					<li key={index} className="d-flex justify-content-between">
						{item}{""} <i className="fa-solid fa-trash" onClick={()=> setJob(job.filter((t,currentIndex)=> index != currentIndex))} ></i>
						
						</li>)}
				)}

			
			</ul>)}
			
			
		</div>
	);
};

export default Home;
