<template>
    <tr>
        <td>
            <span :class="{'strikethrough': done}">{{ todo.name }}</span>
        </td>
    </tr>
</template>

<script>
export default {
    name: "todo-item'",
    props: {
        todo: {
            name: "",
            done: true
        }
    }
}
</script>