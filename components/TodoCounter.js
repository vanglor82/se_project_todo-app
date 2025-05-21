class TodoCounter {
  constructor( todos, counterSelector ) {
    this._counterElement = document.querySelector(counterSelector);
    this._completedCount = 0;
    this._totalCount = 0;
  }

    updateCompleted = (increment) => {
        this._completedCount += increment;
        this._render();
    }

    updateTotal = (increment) => {
        this._totalCount += increment;
        this._render();
    }

    updateText() {
        this._counterElement.textContent = `Showing ${this._completedCount} 
        out of ${this._totalCount} completed`;
    }
}