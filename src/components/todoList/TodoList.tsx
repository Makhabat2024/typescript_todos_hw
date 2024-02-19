import { FC, useEffect, useState } from "react";
import TodoForm from "../todoForm/TodoForm";
import TodoItem from "../todoItem/TodoItem";
import axios from "axios";
import scss from "./TodoList.module.scss";
import { TodoType } from "../../types";
const url =
	"https://api.elchocrud.pro/api/v1/67fb642765e78b534b807be85709f0ad/typescript_todos";

//! ====================================================

const TodoList: FC = () => {
	const [todos, setTodos] = useState<TodoType[]>([]);

	const getTodos = async () => {
		try {
			const response = (await axios.get(url)).data;
			setTodos(response);
			console.log(response);
		} catch (error) {
			console.error(error);
		}
	};

	//! ====================================================

	const postTodos = async (newTask: TodoType) => {
		try {
			const response = (await axios.post<TodoType>(url, newTask)).data;
			setTodos([...todos, response]);
			getTodos();
			console.log(response);
		} catch (error) {
			console.error(error);
		}
	};
	//! ====================================================

	const toggleTask = async (id: number) => {
		const updateTask = todos.map((item) =>
			item._id === id ? { ...item, completed: !item.completed } : item
		);
		setTodos(updateTask);
		console.log(updateTask);

		try {
			await axios.patch(`${url}/${id}`, {
				completed: updateTask.find((item) => item._id === id)?.completed,
			});
		} catch (error) {
			console.error(error);
		}
	};
	//! ====================================================

	const deleteTask = async (id: number) => {
		try {
			await axios.delete(`${url}/${id}`);
			setTodos(todos.filter((item) => item._id !== id));
			getTodos();
		} catch (error) {
			console.error(error);
		}
	};
	//! ====================================================

	const toggleAllTasks = async () => {
		const allCompleted = todos.every((item) => item.completed);
		const updateTask = todos.map((item) => ({
			...item,
			completed: !allCompleted,
		}));
		setTodos(updateTask);

		try {
			await axios.patch(url, {
				completed: !allCompleted,
			});
		} catch (error) {
			console.error(error);
		}
	};
	//! ====================================================

	const deleteAllTasks = async () => {
		try {
			await axios.delete(url);
			setTodos([]);
		} catch (error) {
			console.error(error);
		}
	};
	//! ====================================================

	useEffect(() => {
		getTodos();
	}, []);

	//! ====================================================
	return (
		<div className={scss.listContainer}>
			<TodoForm
				postTodos={(newTask: TodoType) => postTodos(newTask)}
				toggleAllTasks={toggleAllTasks}
				deleteAllTasks={deleteAllTasks}
			/>

			<ul>
				{todos.map((item, index) => (
					<TodoItem
						key={index}
						item={item as TodoType}
						toggleTask={toggleTask}
						deleteTask={deleteTask}
					/>
				))}
			</ul>
		</div>
	);
};

export default TodoList;
