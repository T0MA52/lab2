// Отримуємо елементи форми
const form = document.getElementById('registerForm');

const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');

const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const confirmPasswordError = document.getElementById('confirmPasswordError');

const successMessage = document.getElementById('successMessage');

// Регулярний вираз для email
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Обробка відправки форми
form.addEventListener('submit', function (event) {
    event.preventDefault(); // не відправляємо форму одразу

    // Очищуємо попередні помилки та повідомлення про успіх
    clearErrors();
    successMessage.textContent = '';

    let isValid = true;

    // Перевірка Імені
    if (nameInput.value.trim() === '') {
        showError(nameInput, nameError, "Поле «Ім’я» не може бути порожнім");
        isValid = false;
    }

    // Перевірка Email
    if (emailInput.value.trim() === '') {
        showError(emailInput, emailError, "Поле Email не може бути порожнім");
        isValid = false;
    } else if (!emailRegex.test(emailInput.value.trim())) {
        showError(emailInput, emailError, "Введіть коректний Email");
        isValid = false;
    }

    // Перевірка пароля (якщо поле є)
    const passwordValue = passwordInput.value;
    if (passwordValue.length < 6) {
        showError(passwordInput, passwordError, "Пароль має містити щонайменше 6 символів");
        isValid = false;
    }

    // Перевірка повтору пароля
    const confirmPasswordValue = confirmPasswordInput.value;
    if (confirmPasswordValue === '') {
        showError(confirmPasswordInput, confirmPasswordError, "Повторіть пароль");
        isValid = false;
    } else if (confirmPasswordValue !== passwordValue) {
        showError(confirmPasswordInput, confirmPasswordError, "Паролі не співпадають");
        isValid = false;
    }

    // Якщо всі перевірки пройдено
    if (isValid) {
        successMessage.textContent = "Форма успішно відправлена!";
        alert("Форма успішно відправлена!");
        form.reset();
    }
});

// Функція показу помилки
function showError(inputElement, errorElement, message) {
    inputElement.classList.add('input-error');
    errorElement.textContent = message;
}

// Очистка помилок
function clearErrors() {
    const inputs = [nameInput, emailInput, passwordInput, confirmPasswordInput];
    const errors = [nameError, emailError, passwordError, confirmPasswordError];

    inputs.forEach(input => input.classList.remove('input-error'));
    errors.forEach(error => error.textContent = '');
}
