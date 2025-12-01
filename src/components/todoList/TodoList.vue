<script setup>
import { onMounted } from "vue";
import DB from "@/services/DB";
import { todosStore } from "@/stores/todos";
import TodoListAddForm from "@/components/todoList/TodoListAddForm.vue";
import TodoListFooter from "./TodoListFooter.vue";
import Todo from "./Todo.vue";

const props = defineProps({
  apiUrl: { type: String, required: true },
});

onMounted(async () => {
  todosStore.init(props.apiUrl);
});
</script>
<template>
  <section
    class="bg-slate-100 rounded-xl shadow ring-1 ring-slate-200/60 overflow-hidden"
    aria-labelledby="todo-heading"
  >
    <h2 id="todo-heading" class="sr-only">Todo list</h2>

    <!-- INPUT PRINCIPAL -->
    <TodoListAddForm @addTodo="todosStore.addTodo" />

    <!-- LISTE DES TODOS -->
    <ul class="m-4 divide-y divide-slate-200" role="list" aria-label="Todos">
      <!-- ITEM (exemple) -->

      <Todo
        v-for="todo in todosStore.todos"
        :key="todo.id"
        :todo="todo"
        @onToggle="todosStore.ToggleisCompleted"
        @onDelete="todosStore.deleteTodo"
      />
    </ul>

    <!-- FOOTER DE LISTE -->
    <TodoListFooter :itemsCount="todosStore.itemsCount" />
  </section>
</template>
<style scoped></style>
