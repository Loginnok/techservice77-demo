const form = document.querySelector("#booking-form");
const { car, service, phone, note } = form.elements;
const result = document.querySelector("#result");
const resultTitle = document.querySelector("#result-title");
const summary = document.querySelector("#summary");

for (const link of document.querySelectorAll("[data-service]")) {
  link.addEventListener("click", () => {
    service.value = link.dataset.service;
    result.hidden = true;
    form.hidden = false;
    car.focus({ preventScroll: true });
  });
}

for (const field of [car, phone]) {
  field.addEventListener("input", () => field.setCustomValidity(""));
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const carName = car.value.trim();
  const phoneNumber = phone.value.trim();
  if (!carName) {
    car.setCustomValidity("Укажите марку и модель автомобиля.");
    car.reportValidity();
    return;
  }
  if (!/^\+?[\d ().-]+$/.test(phoneNumber) || !/^(?:[78])?\d{10}$/.test(phoneNumber.replace(/\D/g, ""))) {
    phone.setCustomValidity("Введите номер телефона, например +7 900 000-00-00.");
    phone.reportValidity();
    return;
  }

  const fields = [["Автомобиль", carName], ["Услуга", service.value], ["Телефон", phoneNumber]];
  if (note.value.trim()) fields.push(["Комментарий", note.value.trim()]);
  summary.replaceChildren();
  for (const [label, value] of fields) {
    const term = document.createElement("dt");
    const detail = document.createElement("dd");
    term.textContent = label;
    detail.textContent = value;
    summary.append(term, detail);
  }

  form.hidden = true;
  result.hidden = false;
  resultTitle.focus();
});

document.querySelector("#edit").addEventListener("click", () => {
  result.hidden = true;
  form.hidden = false;
  car.focus();
});
