class FormValidator {
  constructor(settings, formElement) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.inputSelector;
    this._errorClass = settings.inputSelector;
    this._inputErrorClass = settings.inputSelector;
    this._inactiveButtonClass = settings.inputSelector;
    this._formElement = formElement;
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      showInputError(inputElement, inputElement.validationMessage);
    } else {
      hideInputError(inputElement);
    }
  }

_setEventListeners() {
   this._inputList = Array.from(
    this._formElement.querySelectorAll(this._inputSelector)
  );
  this._buttonElement = this._formElement.querySelector(
    this._submitButtonSelector
  );

  toggleButtonState(buttonElement);

  this._inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      this._checkInputValidity(inputElement);
      this._toggleButtonState(buttonElement);
    });
  });
}

resetValidation () {
    this._inputList.forEach((inputElement) => {
     hideInputError(inputElement);
    });
  };

enableValidation() {
//   this._formElement.document.querySelector(this._inputSelector);
  this._formElement.addEventListener("submit", (evt) => {
    evt.preventDefault();
  });
  this._setEventListeners();
 }
}

export default FormValidator;
