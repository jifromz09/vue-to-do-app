<template>
  <div class="container">
    <h1>{{ 'Simple todo app' }}</h1>
    <form @submit.prevent="saveTodo" class="form">
      <label for="newItem">{{'Todo name: '}} </label>
      <input type="text" id="newItem" name="todo" v-model="newTodo.name">
      <button type="submit" name="submit">{{ todoButtonLabel }} </button>
    </form>

    <!-- To do: Refactor table into dynamic table-->
    <table v-if="paginatedTodo?.length > 0" class="todo-table">
      <!-- To do: Refactor table head into separate component-->
      <thead>
        <tr>
          <th v-for="(header, index) in headers" :key="index">{{ header}}</th>
        </tr>
      </thead>
      <tbody>
        <!-- To do: Refactor into Todo component-->
        <tr v-for="(todo) in paginatedTodo" :key="todo.id">
          <td><span :class="{ 'strike-through': todo.done }">
              {{ todo.name }}
            </span></td>
          <td>{{ todo.done ? 'Done' : 'To do' }}</td>
          <td>{{ todo.dateCompleted}}</td>
          <td>
            <div class="action-btn-container">
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

    <div class="pagination">
      <button @click="onPageChange($event, 1)">
        {{ '<<' }} </button>
          <button v-for="(page, index) in paginationNumbers" :key="index" @click="onPageChange($event, page)">
            {{ page }}
          </button>
          <button @click="onPageChange($event, lastPage)">
            {{ '>>' }}
          </button>
    </div>

  </div>
</template>
<script>

import { retrivedDataFromLocalStorage, saveDataToLocalStorage, headersName, firstDataIndex, lastDataIndex,DEFAULT_FIRST_PAGE, DEFAULT_PAGE_SIZE} from './utils';
 
export default {
  name: 'App',
  data() {
   return {
    todos: [],
    newTodo: {id: null, name: "", done: false, dateCompleted: ""},
    todoButtonLabel: 'Add todo',
    isUpdate: false,
    hasTodos: false,
    currPage: DEFAULT_FIRST_PAGE,
    lastPage: 0,
    paginationNumbers: [],
    firstIndex: null,
    lastIndex: null,
    pageSize: DEFAULT_PAGE_SIZE,
    paginatedTodo: []
   }
  },
 
  created() {

    this.todos = retrivedDataFromLocalStorage();

    this.headers = headersName();

    this.pagination();

  },
 
  methods : {

    pagination() {

      this.firstIndex = firstDataIndex(this.currPage);

      this.lastIndex = lastDataIndex(this.firstIndex);

      this.paginatedTodo = this.currPage === DEFAULT_FIRST_PAGE

      ? this.todos.slice(0, DEFAULT_PAGE_SIZE)

      : this.todos.slice(this.firstIndex, this.lastIndex);

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
    },

    onPageChange(e, pageNumber) {

      e.stopPropagation();

      this.currPage = pageNumber;
    
    }
  },

  watch: {

    todos: {

      handler() {

       saveDataToLocalStorage(this.todos);

       if(this.todos?.length > 0) {

        this.lastPage = Math.ceil(this.todos?.length / DEFAULT_PAGE_SIZE);

        this.paginationNumbers = [];

        for (let i = 1; i <= this.lastPage; i++) {

          this.paginationNumbers.push(i);

        }

        this.hasTodos = true;
        
       }
         
      },

      deep: true,
    },

    currPage: {

      handler(newValue, oldValue) {

        if(newValue == oldValue) return;

        this.pagination();

      },

      deep: true, 
    }
  }
}

</script>

<style scoped>
/* Scoped styles for this component only */

.container {
  padding: 32px;
  width: 1260px;
}

th,
td {
  border: 1px solid;
  padding: 6px 0px 6px 0px;
}

tr {
  text-align: center;
}

thead {
  background-color: darkgrey;
}

form {
  display: flex;
  gap: 8px;
  padding: 16px;
  align-items: center;
}

.todo-table {
  width: 600px;
  border-spacing: 2px;
}

input[name="todo"] {
  border-radius: 3px;
  padding-left: 6px;
  padding: 4px;
  width: 280px;
}

button[name="submit"] {
  padding: 4px;
}

.action-btn-container {
  gap: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.action-btn-container button {
  padding: 4px;
}

button {
  border-radius: 3px;
}

h1 {
  text-align: center;
  width: 600px;
}

.strike-through {
  text-decoration: line-through;
}

.pagination {
  display: flex;
  gap: 6px;
  margin-top: 8px;
  justify-content: end;
  align-items: center;
  width: 600px;
}
</style>