<script setup>
import AppHeader from "./components/AppHeader.vue";
import AppFooter from "./components/AppFooter.vue";
import TodoList from "./components/todoList/TodoList.vue";
</script>

<template>
  <AppHeader />
  <main class="w-full max-w-xl mt-8 bg-slate-200 rounded-xl">
    <TodoList />
  </main>
  <AppFooter />
</template>

<style scoped></style>
