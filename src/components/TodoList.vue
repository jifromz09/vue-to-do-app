<template>
     <div className="container">
      
     </div>
</template>
<script>

export default {
    name: "todo-list",
    props: {
        todos: []
    },
    data() {
        return {
            headers: ["Task name", "Status", "Date completed", "Action"],
            hasTodos: false,
        }
    }
}
</script>