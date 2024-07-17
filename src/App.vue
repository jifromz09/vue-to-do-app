<template>
  <div>
    <div>
      <form @submit.prevent="saveTodo">
        <label for="newItem">{{'New Item: '}} </label>
        <input type="text" id="newItem" v-model="newTodo.name">
        <button type="submit">{{ todoButtonLabel }} </button>
      </form>
    </div>
    <!-- To do: Refactor table into dynamic table-->
    <table v-if="todos?.length > 0">
      <!-- To do: Refactor table head into separate component-->
      <thead>
        <tr>
          <th v-for="(header, index) in headers" :key="index">{{ header}}</th>
        </tr>
      </thead>

      <tbody>
        <!-- To do: Refactor into Todo component-->
        <tr v-for="(todo) in todos" :key="todo.id">
          <td>{{ todo.name }}</td>
          <td>{{ todo.done ? 'Done' : 'Todo' }}</td>
          <td>{{ todo.dateCompleted}}</td>
          <td>
            <div>
              <button @click="editTodo($event, todo)">{{ 'Edit' }}</button>
              <button @click="updateTodoStatus($event, todo.id)">{{ !todo.dateCompleted ? 'Done': "Undo" }}</button>
              <button @click="removeTodo($event, todo.id)">{{ 'Delete' }}</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
 
    <div v-else>
      <p>{{ 'No to do available!' }}</p>
    </div>
  </div>
</template>
<script>
 
export default {
  name: 'App',
  data() {
   return {
    headers: ["Name", "Status", "Date completed", "Action"],
    todos: [],
    newTodo: {id: null, name: "", done: false, dateCompleted: ""},
    todoButtonLabel: 'Add todo',
    isUpdate: false,
    hasTodos: false
   }
  },
 
  created() {

    this.retrivedDataFromLocalStorage();

  },
 
  methods : {

    saveDataToLocalStorage() {

      localStorage.setItem("todos", JSON.stringify(this.todos));

    },

    retrivedDataFromLocalStorage() {

      this.todos = JSON.parse(localStorage.getItem('todos'));

    },

    addTodo() {

      const existingTodo = this.todos.find(todo => todo.name === this.newTodo.name);

      if(this.todos.length > 0 && existingTodo) {

        this.newTodo.name = "";

        alert("Todo name already in use!");
    
      } else {

        const id = !this.todos.length
      ? 1
      : this.todos[this.todos.length - 1].id + 1;

       this.todos.push({...this.newTodo, id: id});

      }
    },

    updateTodo() {

      const existingTodo = this.todos.find(todo => todo.name === this.newTodo.name && todo.id !== this.newTodo.id);

      if(existingTodo) {
 
        return alert("Todo name already in use!");
  
      }

     this.todos = this.todos.map(todo => {
 
      if(this.newTodo.id !== todo.id) return todo;

       todo.name = this.newTodo.name;

       return todo;

     });
    
    },

    saveTodo(e) {

      e.preventDefault();

        if(!this.newTodo.name || this.newTodo.name == undefined) {

         alert("Please provide todo name!");

         return;
        
        }
      
      if(!this.isUpdate) {

        this.addTodo();

      } else {

        this.updateTodo();

      }

      this.newTodo.name = "";

      this.isUpdate = false;

      this.todoButtonLabel = this.isUpdate ? "Update todo" : "Add todo";

    },

    removeTodo(e, id) {

      e.stopPropagation();

      this.todos = this.todos.filter(todo => todo.id !== id);

    },

    editTodo(e, todo) {

      e.stopPropagation();

      this.newTodo = {...todo};

      this.todoButtonLabel = "Update todo";

      this.isUpdate = true;

    },

    updateTodoStatus(e, todoId) {

      e.stopPropagation();

      this.todos = this.todos.map(todo => {
 
      if(todoId !== todo.id) return todo;

      todo.done = !todo.done;

      todo.dateCompleted =  todo.done ? new Date().toLocaleDateString() : null;

      return todo;

      });
    }
  },

  watch: {

    todos: {

      handler() {

       this.saveDataToLocalStorage();

       if(this.todos?.length > 0) {

        this.hasTodos = true;
        
       }
         
      },

      deep: true  
    }
  }
}

</script>