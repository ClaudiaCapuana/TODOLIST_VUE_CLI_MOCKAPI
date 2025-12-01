<script setup>
import { ref } from "vue";
const props = defineProps({
  todo: { type: Object, required: true },
});

const emit = defineEmits(["onDelete", "onToggle"]);

const isEdited = ref(false);
const onDelete = () => {
  emit("onDelete", props.todo.id);
};
const onToggle = () => {
  emit("onToggle", props.todo);
};
const onUpdate = () => {
  isEdited.value = true;
};
</script>
<template>
  <li class="px-4 py-3 sm:px-5" role="listitem">
    <div class="flex items-center gap-3">
      <!-- La ligne entière est cliquable via label -->
      <input
        :id="props.todo.id"
        type="checkbox"
        v-model="props.todo.isCompleted"
        class="h-4 w-4 text-blue-600 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        @change="onToggle"
        @dblclick="onUpdate"
      />
      <label
        :for="props.todo.id"
        class="flex-1 text-slate-800 cursor-pointer"
        :class="{ 'line-through': todo.isCompleted }"
      >
        {{ props.todo.content }}
      </label>
      <button
        class="text-red-600/90 hover:text-red-700 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded"
        aria-label="Delete task"
        title="Delete"
        @click="onDelete"
        @dblclick.stop="onUpdate"
      >
        ✕
      </button>
    </div>
    <!-- Champ d'édition (masqué par défaut, visible en mode edit) -->
    <input
      type="text"
      value="Buy milk"
      class="hidden mt-2 w-full border border-slate-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      v-if="isEdited"
      v-model="props.todo.content"
    />
    {{ props.todo.content }}
  </li>
</template>
<style scoped></style>
