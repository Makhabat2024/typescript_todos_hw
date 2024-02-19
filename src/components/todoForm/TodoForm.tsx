import React, { FC, useState } from "react";
import { TodoType } from "../../types";
import scss from "./TodoForm.module.scss";
interface TodoInputProps {
	postTodos: (newTask: TodoType) => void;
	toggleAllTasks: () => void;
	deleteAllTasks: () => void;
}
const TodoForm: FC<TodoInputProps> = ({
	postTodos,
	toggleAllTasks,
	deleteAllTasks,
}) => {
	const [task, setTask] = useState("");

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (task.trim() === "") {
			alert("Please enter a task");
		} else {
			const newTask: TodoType = {
				task,
				completed: false,
				_id: Math.random() + 1,
			};
			postTodos(newTask);
			setTask("");
		}
	};
	return (
		<div className={scss.formContainer}>
			<form onSubmit={handleSubmit} className={scss.form}>
				<div className={scss.inputbox}>
					<label htmlFor="text">Task:</label>
					<input
						type="text"
						placeholder="task ..."
						id="text"
						value={task}
						onChange={(e) => setTask(e.target.value)}
					/>
				</div>
				<button type="submit">ADD</button>
			</form>
			<div className={scss.allbuttons}>
				<button onClick={toggleAllTasks}>toggleAllTasks</button>
				<button onClick={deleteAllTasks}>toggleAllTasks</button>
			</div>
		</div>
	);
};

export default TodoForm;
