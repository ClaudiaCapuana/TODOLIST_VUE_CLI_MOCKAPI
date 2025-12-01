import { reactive, computed } from "vue";
import DB from "@/services/DB";

const todos = reactive([]);

const init = async (apiURL) => {
  DB.setApiUrl(apiURL);
  todos.splice(todos.length, 0, ...(await DB.findAll()));
};
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
const itemsCount = computed(() => {
  return todos.filter((todo) => todo.isCompleted != true).length;
  //()=>todo.filter((todo)=>!=todo.completed).length
});

// const updateTodo = async(data){
//   const response = await DB.updateOne(data)

// }

// pour éviter d'export chaque élément à la fois
export const todosStore = reactive({
  todos,
  itemsCount,
  ToggleisCompleted,
  deleteTodo,
  addTodo,
  init,
});
