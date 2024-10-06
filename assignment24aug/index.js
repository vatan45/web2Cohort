const fs = require('fs');

const filepath = 'todos.json';

function readTodos() {
    if (!fs.existsSync(filepath)) {
        fs.writeFileSync(filepath, '[]');
    }
    const data = fs.readFileSync(filepath, 'utf8');
    return JSON.parse(data);
}

function writeTodos(todos) {
    fs.writeFileSync(filepath, JSON.stringify(todos, null, 2));
}

function addTodo(todoText) {
    const todos = readTodos();
    const newTodo = { id: Date.now(), text: todoText, done: false };
    todos.push(newTodo);
    writeTodos(todos);
    console.log(`Added todo: "${todoText}"`);
}

function deleteTodo(id) {
    const todos = readTodos();
    const filteredTodos = todos.filter(todo => todo.id !== parseInt(id));
    writeTodos(filteredTodos);
    console.log(`Deleted todo with id: ${id}`);
}

function markTodoAsDone(id) {
    const todos = readTodos();
    const updatedTodos = todos.map(todo =>
        todo.id === parseInt(id) ? { ...todo, done: true } : todo
    );
    writeTodos(updatedTodos);
    console.log(`Marked todo with id: ${id} as done.`);
}

function listTodos() {
    const todos = readTodos();
    if (todos.length === 0) {
        console.log("No todos found.");
        return;
    }
    todos.forEach(todo => {
        const status = todo.done ? '[x]' : '[ ]';
        console.log(`${status} ${todo.id}: ${todo.text}`);
    });
}

function main() {
    const command = process.argv[2];
    const argument = process.argv[3];

    switch (command) {
        case 'add':
            addTodo(argument);
            break;
        case 'delete':
            deleteTodo(argument);
            break;
        case 'done':
            markTodoAsDone(argument);
            break;
        case 'list':
            listTodos();
            break;
        default:
            console.log('Usage:');

    }
}

main();
