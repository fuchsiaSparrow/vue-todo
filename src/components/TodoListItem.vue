<template>
  <li class="list-item">
    <div class="list-item__left">
      <input
        @click="$emit('on-toggle-checkbox', id)"
        type="checkbox"
        v-model="isChecked"
        class="list-item__checkbox"
      />
      <p @click="startEditing" v-if="!isEditing" class="list-item__text">
        {{ title }}
      </p>
      <form v-else @submit.prevent="finishEditing" class="list-item__form">
        <input
          @blur="isEditing = false"
          type="text"
          v-model="currentTitle"
          v-focus
          class="list-item__input"
        />
      </form>
    </div>
    <button
      @click="$emit('on-delete-todo', id)"
      type="button"
      class="list-item__button"
    >
      &times;
    </button>
  </li>
</template>

<script>
export default {
  props: {
    id: Number,
    title: String,
    isCompleted: Boolean,
  },
  data() {
    return {
      isEditing: false,
      currentTitle: this.title,
      isChecked: this.isCompleted,
    };
  },
  methods: {
    startEditing() {
      this.currentTitle = this.title;
      this.isEditing = true;
    },
    finishEditing() {
      if (this.currentTitle.trim())
        this.$emit("on-edit-todo", { id: this.id, title: this.currentTitle });
      this.isEditing = false;
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
  input {
    color: #35495e;
  }
  color: #35495e;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  margin: 5px;
  border: 2px solid #41b883;
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
    border-bottom: 1px solid #41b883;
    outline: none;
  }
  &__button {
    width: 25px;
    height: 25px;
    color: #41b883;
    background-color: white;
    font-size: 14px;
    font-weight: 700;
    border: 2px solid #41b883;
    border-radius: 50px;
    cursor: pointer;
  }
}
</style>
