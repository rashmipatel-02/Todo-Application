import React, { useEffect, useState } from 'react';

const Todo = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [edit, setEdit] = useState(null);
    const [task, setTask] = useState(() => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks'));
        return storedTasks || [];
    });

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(task));
    }, [task]);

    const handleTitle = (e) => setTitle(e.target.value);

    const handleDescription = (e) => setDescription(e.target.value);

    const SubmitTask = () => {
        if (title.trim() === '' || description.trim() === '') {
            alert('Please fill all fields.');
            return;
        }

        if (edit !== null) {
            const updatedTasks = task.map((text, i) =>
                i === edit ? { ...text, title, description } : text
            );
            setTask(updatedTasks);
            setEdit(null);
        } else {
            const newTask = { title, description, completed: false };
            setTask([...task, newTask]);
        }

        setTitle('');
        setDescription('');
    };

    const EditTodo = (id) => {
        setTitle(task[id].title);
        setDescription(task[id].description);
        setEdit(id);
    };

    const toggleCompleted = (id) => {
        const updatedTasks = task.map((t, i) =>
            i === id ? { ...t, completed: !t.completed } : t
        );
        setTask(updatedTasks);
    };

    const DeleteTodo = (id) => {
        const deletetask = [...task];
        deletetask.splice(id, 1);
        setTask(deletetask);
    };

    const handleClearAll = () => {
        setTask([]);
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-gray-800 to-gray-900 text-gray-200 p-6 dark:bg-gradient-to-r dark:from-gray-800 dark:to-black">
            <div className="max-w-lg mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 space-y-6">
                <h1 className="text-3xl font-semibold text-center text-gray-700 dark:text-gray-100">
                    To-Do Application
                </h1>

                <div className="space-y-4">
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={handleTitle}
                        className="w-full px-4 py-2 border-2 text-gray-700 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={handleDescription}
                        className="w-full px-4 py-2 border-2 text-gray-700 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    />
                    <button
                        onClick={SubmitTask}
                        className="w-full px-4 py-2 rounded-lg text-white bg-indigo-600 hover:bg-indigo-500 transition-colors"
                    >
                        {edit !== null ? 'Update Task' : 'Add Task'}
                    </button>
                </div>

                {task.length > 0 && (
                    <button
                        onClick={handleClearAll}
                        className="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                        Clear All Tasks
                    </button>
                )}

                <ul className="space-y-4 mt-6">
                    {task.map((tasks, id) => (
                        <li
                            key={id}
                            className="flex justify-between items-center p-4 bg-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-all"
                        >
                            <div className="flex items-center space-x-4">
                                <input
                                    type="checkbox"
                                    checked={tasks.completed}
                                    onChange={() => toggleCompleted(id)}
                                    className="w-6 h-6"
                                />
                                <div>
                                    <h3
                                        className={`w-52 text-lg font-semibold text-start ${
                                            tasks.completed ? 'line-through text-gray-400' : 'text-gray-700'
                                        }`}
                                    >
                                        {tasks.title}
                                    </h3>
                                    <p
                                        className={`w-52 text-sm text-start break-words ${
                                            tasks.completed ? 'line-through text-gray-400' : 'text-gray-500'
                                        }`}
                                    >
                                        {tasks.description}
                                    </p>
                                </div>
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => EditTodo(id)}
                                    className="px-3 py-1 text-sm bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => DeleteTodo(id)}
                                    className="px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Todo;
