class Todo {
  constructor(data, selector, handleCheck, handleDelete) {
    this._data = data;
    this._templateElement = document.querySelector(selector);
    this._handleCheck = handleCheck;
    this._handleDelete = handleDelete;
  }

  _setEventListeners() {
    this._deleteBtn.addEventListener("click", () => {
      this._handleDelete(this._data.completed);
      this._remove();
    });
    this._todoCheckboxEl.addEventListener("change", () => { 
      this._toggleCompletion();
      this._handleCheck(this._data.completed);
    });
  }

  _generateCheckBoxEl() {
    this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    this._todoLabel = this._todoElement.querySelector(".todo__label");
    this._todoCheckboxEl.checked = this._data.completed;
    this._todoCheckboxEl.id = `todo-${this._data.id}`;
    this._todoLabel.setAttribute("for", `todo-${this._data.id}`);
  }

    _generateDueDate(dueDate) {
    if (!isNaN(dueDate)) {
      this._todoDate.textContent = `Due: ${dueDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`;
    }
  }

  _toggleCompletion() {  
    this._data.completed = !this._data.completed;
  };

  _remove = () => {
    this._todoElement.remove();

    this._todoElement = null;
  };

  getView() {
    this._todoElement = this._templateElement.content
      .querySelector(".todo")
      .cloneNode(true);
    this._todoDate = this._todoElement.querySelector(".todo__date");
    this._todoNameEl = this._todoElement.querySelector(".todo__name");
    this._todoNameEl.textContent = this._data.name;
    this._deleteBtn = this._todoElement.querySelector(".todo__delete-btn");
    
    this._generateCheckBoxEl();
    this._setEventListeners();
    this._generateDueDate();
 
    return this._todoElement;
  }
}

export default Todo;