<script setup>
import { reactive, onMounted } from "vue";
import DB from "@/services/DB";
import TodoListAddForm from "@/components/todoList/TodoListAddForm.vue";
import TodoListFooter from "./TodoListFooter.vue";
import Todo from "./Todo.vue";

const todos = reactive([]);

const ToggleisCompleted = async (todo) => {
  await DB.updateOne(todo);
};
const deleteTodo = async (id) => {
  await DB.deleteOne(id);
  const index = todos.findIndex((todo) => todo.id === id);
  index !== -1 ? todos.splice(index, 1) : console.log("vapas");
};
const addTodo = async (newTodo) => {
  const response = await DB.create(newTodo);
  todos.push(response);
};

// const updateTodo = async(data){
//   const response = await DB.updateOne(data)

// }

onMounted(async () => {
  DB.setApiUrl("https://68de7109d7b591b4b78f8da0.mockapi.io/");

  todos.splice(todos.length, 0, ...(await DB.findAll()));
  console.table(todos);
});
</script>
<template>
  <section
    class="bg-slate-100 rounded-xl shadow ring-1 ring-slate-200/60 overflow-hidden"
    aria-labelledby="todo-heading"
  >
    <h2 id="todo-heading" class="sr-only">Todo list</h2>

    <!-- INPUT PRINCIPAL -->
    <TodoListAddForm @addTodo="addTodo" />

    <!-- LISTE DES TODOS -->
    <ul class="m-4 divide-y divide-slate-200" role="list" aria-label="Todos">
      <!-- ITEM (exemple) -->

      <Todo
        v-for="todo in todos"
        :key="todo.id"
        :todo="todo"
        @onToggle="ToggleisCompleted"
        @onDelete="deleteTodo"
      />
    </ul>

    <!-- FOOTER DE LISTE -->
    <TodoListFooter />
  </section>
</template>
<style scoped></style>
