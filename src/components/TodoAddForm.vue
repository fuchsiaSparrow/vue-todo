<template>
  <form class="form" @submit.prevent="onSubmit">
    <input class="form__input" type="input" v-model="title" />
    <button class="form__button" type="submit">Add</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      title: "",
    };
  },
  methods: {
    onSubmit() {
      this.title.trim()
        ? this.$emit("add-todo", {
            id: Date.now(),
            title: this.title,
            isCompleted: false,
          })
        : null;
      this.title = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.form {
  display: flex;
  margin: 5px;
  width: 100%;
  height: 40px;
  &__input {
    width: calc(80% - 15px);
    margin-right: 1%;
    border: 1px solid red;
    border-radius: 10px;
  }
  &__button {
    width: calc(20% - 15px);
    background: #fff;
    border: 1px solid red;
    border-radius: 10px;
    outline: none;
    cursor: pointer;
  }
}
</style>