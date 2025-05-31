import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoForm = document.querySelector(".popup__form");

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template", handleCheck, handleDelete);
  const todoElement = todo.getView();
  return todoElement;
};

const renderTodo = (item) => {
  const todoElement = generateTodo(item);
  const todoData = {
    id: uuidv4(),
    name: item.name,
    completed: item.completed,
    date: item.date,
  };
  todoElement.todoData = todoData;
  section.addItem(todoElement);
};

const section = new Section({
  items: initialTodos,
  renderer: renderTodo,
  containerSelector: ".todos__list",
});

const popupInstance = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (items) => {
    renderTodo(items);
    newTodoValidator.resetValidation();
    popupInstance.close();
    todoCounter.updateTotal(true);
  },
});

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

function handleCheck(completed) {
  todoCounter.updateCompleted(completed);
}

function handleDelete(completed) {
  if (completed) {
    todoCounter.updateCompleted(false);
  }
    todoCounter.updateTotal(false);
}

section.renderItems();

addTodoButton.addEventListener("click", () => {
  popupInstance.open();
});

popupInstance.setEventListeners();

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
