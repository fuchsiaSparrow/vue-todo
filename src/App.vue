<template>
  <div id="app" class="app">
    <header class="header">Vue ToDo App</header>
    <section class="main-section">
      <TodoAddForm @on-new-todo="addTodo" />
      <hr class="hr"/>
      <TodoList
        :todos="todos"
        @on-toggle-checkbox="toggleTodo"
        @on-delete-todo="deleteTodo"
        @on-edit-todo="editTodo"
      />
    </section>
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
    toggleTodo(id) {
      const index = this.todos.findIndex((el) => el.id === id);
      const isCompleted = !this.todos[index].isCompleted;
      AxiosService.patchTodo(id, { isCompleted }).then((res) => {
        this.todos = this.todos.filter((t) =>
          t.id === res.id ? (t.title = res.title) : t
        );
      });
    },
    addTodo(newTitle) {
      AxiosService.postTodo({ title: newTitle, isCompleted: false }).then(
        (res) => {
          this.todos.push(res);
        }
      );
    },
    deleteTodo(id) {
      AxiosService.deleteTodo(id).then((res) => {
        this.todos = this.todos.filter((todo) => todo.id !== id);
      });
    },
    editTodo({ id, title }) {
      AxiosService.patchTodo(id, { title }).then((res) => {
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
  width: 100%;
  height: 100vh;
}
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80px;
  font-weight: 700;
  font-size: 40px;
  background-color: #41b883;
}
.main-section {
  width: 50%;
  margin: 0 auto;
  padding: 30px;
}
.hr {
  height: 1px;
  border: none;
  background-color: #41b883;
}
#app {
  font-family: sans-serif;
  color: #35495e;
  box-sizing: border-box;
  input, button {
    outline: none;
  }
}
</style>
