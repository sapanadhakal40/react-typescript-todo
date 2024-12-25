import React, { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa'; 
import useLocalStorage from '../hooks/useLocalStorage.ts';

interface Todo {
   id: number;
   title: string;
   description: string;
   dueDate: string;
   completed: boolean;

    }

    const TodoList: React.FC = () => {
    const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []); 
    const [form, setForm] = useState({ title: '', description: '' , dueDate: ''});
   

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!form.title || !form.description || !form.dueDate){
           alert('Please fill in all fields'); 
            return;
}

        
        const newTodo : Todo = {
           id: Date.now(),
           title: form.title,
           description: form.description,
            dueDate: form.dueDate,
           completed: false,
            };

        setTodos([...todos, newTodo]);
        setForm({ title: '', description: '', dueDate: '' });

    };

    const toggleComplete = (id: number) => {
        setTodos(
            todos.map((todo) => 
                todo.id === id ? { ...todo, completed: !todo.completed } : todo )

                );
            };
            const deleteTodo = (id: number) => {
            setTodos(todos.filter((todo) => todo.id !== id));
              };
              

            return (
                <div className='max-w-2xl mx-auto p-4 bg-white rounded-md shadow-md mt-5'>
                    <h1 className='text-2xl font-semibold mb-4 text-center'>Todo App</h1>
                    <form onSubmit={handleSubmit}>
                    <label htmlFor="title" className="block text-sm font-medium">
                     Title
                    </label>
                        <input
                            type="text"
                            name="title"
                            value={form.title}
                             id="title"
                            onChange={handleChange}
                            placeholder="Title"
                            className='mb-2 w-full border p-2 rounded-md space-y-2'
                        />
                        <label htmlFor="description" className="block text-sm font-medium">
                         Description
                        </label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            id="description"
                            placeholder="Description"
                            className='mb-2 w-full border p-2 rounded-md'
                        />

                        <label htmlFor="dueDate" className="block text-sm font-medium">
                         Due Date
                        </label>
                        <input
                            type="date"
                            name="dueDate"
                              id="dueDate"
                            value={form.dueDate}
                            onChange={handleChange}
                            placeholder="Due Date"
                            className='mb-2 w-full border p-2 rounded-md'
                        />
                        <button type="submit"
                        className=' bg-blue-500 text-white px-4 py-2 rounded-md'
                        >Add Todo</button>
                    </form>

                    <ul className='mt-4 space-y-4'>
                        {todos.length > 0 ? (
                            todos.map((todo: Todo) => (
                                <li
                                key={todo.id}
                                className="flex items-center justify-between mb-2"
                              >
                                <div className={`mb-2 ${todo.completed ? 'line-through' : ''}`}>
                                        <h2 className='text-lg'>{todo.title}</h2>
                                        <p>{todo.description}</p>
                                        <p className="text-sm ">Due: {todo.dueDate}</p>
                                         </div>
                                       
                                    <div className='flex items-center space-x-2'>

                                    <input type="checkbox"
                                         checked={todo.completed}
                                         onChange={() => toggleComplete(todo.id)}
                                         className="mr-2 cursor-pointer"
                                         />
                                       
                                        <button onClick={() => deleteTodo(todo.id)}
                                            className="bg-red-500 text-white px-2 py-1 rounded">
                                            <FaTrashAlt />
                                        </button>
                                    </div>
                                    
                                    </li>
                            ))
                        ) : (
                            <p className="text-center">No todos available.Add one</p>
                        )}
                    </ul>
                </div>
            );
        };

        export default TodoList;