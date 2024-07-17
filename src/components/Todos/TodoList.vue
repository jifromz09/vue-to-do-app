<template>
    <table>
        <TableHeader :headers="headers" />
        <tbody>
            <TodoItem v-for="(todo) in todos" :key="todo.id" :editTodo="editTodo" :updateTodoStatus="updateTodoStatus"
                :removeTodo="removeTodo" />
        </tbody>
    </table>
</template>
<script>

import TableHeader from './TableHeader.vue';
import TodoItem from './TodoItem.vue';

export default {
    name: "todo-list",
    props: {
        todos: [],
        headers: [],
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
    components: {
        TableHeader,
        TodoItem
    }
}
</script>