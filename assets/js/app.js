const emptyMessage = "Can't be blank";
const month = document.querySelector("#month");
const year = document.querySelector("#year");
const form = document.querySelector("#frmAddCard");
const completedForm = document.querySelector(".completed-form");

const currentYear = new Date().getFullYear().toString().substring(2);
const dateMax = parseInt(currentYear) + 7;

function verifyEmptyField(input) {
  input.forEach((element) => {
    if (element.value.trim() === "") {
      toggleEmptyErrorMessage(element, emptyMessage);
    } else {
      toggleEmptyErrorMessage(element, emptyMessage);
    }
  });
}

function toggleEmptyErrorMessage(element, message) {
  if (element.value.trim() === "") {
    element.classList.add("invalid-inp");
    element
      .closest(".card-info-wrapper")
      .querySelector(".error-message-box").textContent = message;
    element.closest(".border-gradient").classList.add("bg-transparent");
  } else {
    element.classList.remove("invalid-inp");
    element
      .closest(".card-info-wrapper")
      .querySelector(".error-message-box").textContent = "";
    element.closest(".border-gradient").classList.remove("bg-transparent");
  }
}

function toggleInvalidDataErrorMessage(element, message) {
  if (element.value.trim() !== "") {
    element.classList.add("invalid-inp");
    element
      .closest(".card-info-wrapper")
      .querySelector(".error-message-box").textContent = message;
    element.closest(".border-gradient").classList.add("bg-transparent");
  } else {
    toggleEmptyErrorMessage(element, message);
    element.closest(".border-gradient").classList.remove("bg-transparent");
  }
}

function verifyMonth() {
  const message = "Invalid Expiration Date";
  let regex = /^[0-9]+$/;
  if (month.value.trim() !== "") {
    if (!regex.test(month.value)) {
      month.classList.add("invalid-inp");
      toggleInvalidDataErrorMessage(month, message);
    } else if (month.value > 12 || month.value < 1) {
      month.classList.add("invalid-inp");
      toggleInvalidDataErrorMessage(month, message);
    } else {
      month.classList.remove("invalid-inp");
      verifyExpDate();
    }
  }
}

function validateYear() {
  const message = "Invalid Expiration Date";
  let regex = /^[0-9]+$/;
  if (year.value.trim() !== "") {
    if (!regex.test(year.value)) {
      year.classList.add("invalid-inp");
      toggleInvalidDataErrorMessage(year, message);
    } else if (year.value < parseInt(currentYear) || year.value > dateMax) {
      year.classList.add("invalid-inp");
      toggleInvalidDataErrorMessage(year, message);
    } else {
      year.classList.remove("invalid-inp");
      verifyExpDate();
    }
  }
}

function verifyExpDate() {
  const message = "Invalid Expiration Date";
  if (year.classList.contains("invalid-inp")) {
    toggleInvalidDataErrorMessage(year, message);
  } else if (month.classList.contains("invalid-inp")) {
    toggleInvalidDataErrorMessage(month, message);
  } else {
    toggleEmptyErrorMessage(month, "");
  }
}

function validateCVC() {
  const regex = /^[0-9]+$/;
  const cvc = document.querySelector("#cvc");
  const message = "Invalid CVC";
  if (cvc.value !== "") {
    if (cvc.value.length < 3 || cvc.value.length > 4) {
      toggleInvalidDataErrorMessage(cvc, message);
    } else if (!regex.test(cvc.value)) {
      toggleInvalidDataErrorMessage(cvc, message);
    } else {
      toggleEmptyErrorMessage(cvc, "");
    }

    setCardBack(cvc.value);
  }
}

const formatNumber = (number) =>
  number.split("").reduce((seed, next, index) => {
    if (index !== 0 && !(index % 4)) seed += " ";
    return seed + next;
  }, "");

function validateCarNumber() {
  const regex = /^[0-9]+$/;
  const message = "Wrong format, numbers only";
  let cardNumber = document.querySelector("#cardNumber");
  let arrNumber = cardNumber.value.split(" ");
  const numbers = arrNumber.join("");

  if (cardNumber.value !== "") {
    if (!regex.test(numbers)) {
      toggleInvalidDataErrorMessage(cardNumber, message);
    } else if (numbers.length > 16 || numbers.length < 14) {
      toggleInvalidDataErrorMessage(cardNumber, "Invalid Card Number");
    } else {
      toggleEmptyErrorMessage(cardNumber, "");
    }
  }
}

function setCardBack(cvc) {
  const cardBackCVC = document.querySelector("#cardBackCVC");
  cardBackCVC.textContent = cvc;
}

function setCardFront(value, cardFrontEl) {
  const element = document.querySelector(cardFrontEl);
  element.textContent = value;
}

function setCardFrontNumber(number) {
  const list = document.querySelectorAll(".number-block");
  for (let i = 0; i < list.length; i++) {
    const elementList = list[i];
    elementList.textContent = "";

    for (let j = 0; j < number.length; j++) {
      const elementNumber = number[j];
      if (elementList.textContent.length < 4 && j <= number.length) {
        elementList.textContent = number[i];
      }
    }
  }
}

function submitData(e) {
  const fields = document.querySelector(".invalid-inp");

  if (fields) {
    e.preventDefault();
  } else {
    form.classList.add("d-none");
    completedForm.classList.remove("d-none");
  }
}

//Events
document.querySelector("#btnConfirm").addEventListener("click", function (e) {
  const fields = document.querySelectorAll("input");
  verifyEmptyField(fields);
  validateYear();
  validateCVC();
  verifyMonth();
  validateCarNumber();
  submitData(e);
});
document.querySelector("#btnContinue").addEventListener("click", function (e) {
  form.submit();
});

document.querySelector("#month").addEventListener("blur", function (e) {
  if (this.value.trim() !== "") {
    verifyMonth();
  } else {
    toggleEmptyErrorMessage(this, emptyMessage);
  }
});

document.querySelector("#year").addEventListener("blur", function (e) {
  if (this.value.trim() !== "") {
    validateYear();
  } else {
    toggleEmptyErrorMessage(this, emptyMessage);
  }
});
document.querySelector("#cvc").addEventListener("blur", function (e) {
  if (this.value.trim() !== "") {
    validateCVC();
  } else {
    toggleEmptyErrorMessage(this, emptyMessage);
  }
});

document.querySelector("#cardName").addEventListener("blur", function (e) {
  verifyEmptyField([this]);
});

document.querySelector("#cardNumber").addEventListener("input", function (e) {
  if (this.value.trim() !== "") {
    this.value = formatNumber(this.value.replaceAll(" ", ""));
  } else {
    toggleEmptyErrorMessage(this, emptyMessage);
  }
});
document.querySelector("#cardNumber").addEventListener("blur", function (e) {
  if (this.value.trim() !== "") {
    validateCarNumber();
  } else {
    toggleEmptyErrorMessage(this, emptyMessage);
  }
});

//Keyup
document.querySelector("#cvc").addEventListener("keyup", function (e) {
  if (this.value.trim() !== "") {
    setCardBack(this.value);
  } else {
    setCardBack("000");
    toggleEmptyErrorMessage(this, emptyMessage);
  }
});
document.querySelector("#cardName").addEventListener("keyup", function (e) {
  if (this.value.trim() !== "") {
    setCardFront(this.value, ".card-owner");
  } else {
    setCardFront("Jane Appleseed", ".card-owner");
  }
});
document.querySelector("#cardNumber").addEventListener("keyup", function (e) {
  let value = this.value;
  const defaultNumber = ["0000", "0000", "0000", "0000"];
  if (value !== "") {
    setCardFrontNumber(value.split(" "));
  } else {
    setCardFrontNumber(defaultNumber);
  }
});

document.querySelector("#month").addEventListener("keyup", function (e) {
  if (this.value.trim() !== "") {
    setCardFront(this.value, "#cardFrontMonth");
  } else {
    setCardFront("00", "#cardFrontMonth");
  }
});
document.querySelector("#year").addEventListener("keyup", function (e) {
  if (this.value.trim() !== "") {
    setCardFront(this.value, "#cardFrontYear");
  } else {
    setCardFront("00", "#cardFrontYear");
  }
});
