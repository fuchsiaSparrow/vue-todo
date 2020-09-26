<template>
  <div class="app" id="app">
    <TodoAddForm @add-todo="addTodo" />
    <hr />
    <TodoList :todos="todos" @delete-todo="deleteTodo" @edit-todo="editTodo" />
  </div>
</template>

<script>
import TodoList from "@/components/TodoList";
import TodoAddForm from "@/components/TodoAddForm";
import AxiosService from "./utils/api";
export default {
  data() {
    return {
      todos: [],
    };
  },
  name: "App",
  components: {
    TodoList,
    TodoAddForm,
  },
  methods: {
    addTodo(todo) {
      AxiosService.postTodo(todo).then((res) => {
        this.todos.push(res);
      });
    },
    deleteTodo(id) {
      AxiosService.deleteTodo(id).then((res) => {
        this.todos = this.todos.filter((todo) => todo.id !== id);
      });
    },
    editTodo({ id, title, isCompleted }) {
      console.log(id, title, isCompleted);
      AxiosService.patchTodo(id, { title, isCompleted }).then((res) => {
        this.todos = this.todos.filter((t) =>
          t.id === res.id ? (t.title = res.title) : t
        );
      });
    },
  },
  mounted() {
    AxiosService.getTodos("").then((res) => {
      this.todos = res.data;
    });
  },
};
</script>

<style lang="scss">
.app {
  margin: 0 auto;
  width: 80%;
  border: 1px solid red;
  border-radius: 10px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
