<template>
  <li class="list-item">
    <div class="list-item__left">
      <input
        type="checkbox"
        v-model="currentCheck"
        class="list-item__checkbox"
        @click="onHandleCheckbox"
      />
      <p
        v-if="isTitleShown"
        @click="onEditTitleVisibility"
        class="list-item__text"
      >
        {{ todo.title }}
      </p>
      <form v-else @submit.prevent="onSubmit" class="list-item__form">
        <input
          type="text"
          v-model="currentTitle"
          v-focus
          @blur="isTitleShown = true"
          class="list-item__input"
        />
      </form>
    </div>
    <button
      type="button"
      @click="$emit('delete-todo', todo.id)"
      class="list-item__button"
    >
      &times;
    </button>
  </li>
</template>

<script>
export default {
  props: ["todo"],
  data() {
    return {
      isTitleShown: true,
      currentTitle: this.todo.title,
      currentCheck: this.todo.isCompleted,
    };
  },
  methods: {
    onEditTitleVisibility() {
      this.currentTitle = this.todo.title;
      this.isTitleShown = false;
    },
    onHandleCheckbox() {
      this.currentCheck = !this.currentCheck;
      this.$emit("edit-todo", {
        id: this.todo.id,
        title: this.currentTitle,
        isCompleted: this.currentCheck,
      });
    },
    onSubmit() {
      this.currentTitle.trim()
        ? this.$emit("edit-todo", {
            id: this.todo.id,
            title: this.currentTitle,
            isCompleted: this.currentCheck,
          })
        : null;
      this.isTitleShown = true;
    },
  },
  directives: {
    focus: {
      inserted: function (el) {
        el.focus();
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.list-item {
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  margin: 5px;
  border: 1px solid red;
  border-radius: 10px;

  &__left {
    width: 95%;
    display: flex;
  }
  &__text {
    width: 100%;
    height: 100%;
    text-align: left;
    margin: 0;
    font-size: 18px;
    cursor: pointer;
  }
  &__form {
    width: 100%;
  }
  &__input {
    width: 100%;
    height: 100%;
    font-size: 18px;
    border: none;
    border-bottom: 1px solid red;
    outline: none;
  }
  &__button {
    background-color: white;
    color: red;
    font-size: 14px;
    font-weight: 700;
    border: 2px solid red;
    border-radius: 50px;
    outline: none;
    cursor: pointer;
  }
}
</style>