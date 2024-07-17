<template>
    <tr>
        <td>{{ todo.name }}</td>
        <td>{{ todo.done ? 'Done' : 'Todo' }}</td>
        <td>{{ todo.dateCompleted}}</td>
        <td>
            <div>
                <button @click="executeEditTodo($event, todo)">{{ 'Edit' }}</button>
                <button @click="executeUpdateTodoStatus($event, todo.id)">{{ !todo.dateCompleted ? 'Done': "Undo" }}</button>
                <button @click="executeRemoveTodo($event, todo.id)">{{ 'Delete' }}</button>
            </div>
        </td>
    </tr>
</template>

<script>
export default {
    name: "todo-item'",
    props: {

        todo: {},

        editTodo: {
            type: Function,
            required: true
        },

        updateTodoStatus: {
            type: Function,
            required: true
        },

        removeTodo: {
            type: Function,
            required: true
        },

    },
    methods: {

        executeEditTodo(e, todo) {
            this.editTodo(e, todo);
        },

        executeRemoveTodo(e, id) {
            this.removeTodo(e, id);
        },

        executeUpdateTodoStatus(e, todoId) {
            this.updateTodoStatus(e, todoId);
        }

    }
}
</script>