<template>
  <ul class="app-list">
    <TodoListItem
      :todo="todo"
      v-for="todo of todos"
      :key="todo.id"
      @delete-todo="deleteTodo"
      @edit-todo="editTodo"
    />
  </ul>
</template>

<script>
import TodoListItem from "@/components/TodoListItem";
export default {
  props: ["todos"],
  components: {
    TodoListItem,
  },
  methods: {
    deleteTodo(id) {
      this.$emit("delete-todo", id);
    },
    editTodo(todo) {
      this.$emit("edit-todo", todo);
    },
  },
};
</script>

<style lang="scss" scoped>
.app-list {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>