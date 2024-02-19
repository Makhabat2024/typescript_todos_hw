import { FC } from "react";
import { TodoType } from "../../types";
import scss from "./TodoItem.module.scss";
interface TodoItemProps {
	item: TodoType;
	deleteTask: (id: number) => void;
	toggleTask: (id: number) => void;
}
const TodoItem: FC<TodoItemProps> = ({ item, deleteTask, toggleTask }) => {
	return (
		<li className={scss.todoItem} key={item._id}>
			<p style={{ textDecoration: item.completed ? "line-through" : "none" }}>
				{item.task}
			</p>
			<div className={scss.buttons}>
				<input
					type="checkbox"
					checked={item.completed}
					onChange={() => toggleTask(item._id)}
				/>
				<button onClick={() => deleteTask(item._id)}>delete</button>
			</div>
		</li>
	);
};

export default TodoItem;
