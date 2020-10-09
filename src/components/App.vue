<template>
  <div id="app" class="app">
    <header class="header">Vue ToDo App</header>
    <section class="main-section">
      <todo-add-form @on-new-todo="addTodo" />
      <hr class="hr" />
      <todo-list
        :todos="todos"
        @on-toggle-checkbox="toggleTodo"
        @on-delete-todo="deleteTodo"
        @on-edit-todo="editTodo"
      />
    </section>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import TodoList from './TodoList.vue';
import TodoAddForm from './TodoAddForm.vue';

export default {
  data() {
    return {
      // todos: [{ title: "wqe" }, { title: "asdasd" }],
    };
  },
  name: 'App',
  components: {
    TodoList,
    TodoAddForm,
  },
  computed: {
    ...mapGetters({
      todos: 'todos',
    }),
  },
  methods: {
    ...mapActions(['getAllTodos', 'addNewTodo', 'deleteNewTodo', 'toggleNewTodo', 'updateNewTodo']),
    addTodo(item) {
      this.addNewTodo({ todo: item });
    },
    deleteTodo(id) {
      this.deleteNewTodo({ id });
    },
    toggleTodo(id) {
      this.toggleNewTodo({ id });
    },
    editTodo(id, title) {
      this.updateNewTodo(id, title);
    },
  },
  mounted() {},
  created() {
    this.getAllTodos('');
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
  width: 70%;
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
  input,
  button {
    outline: none;
  }
}
</style>
