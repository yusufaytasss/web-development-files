const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

let user = [
    {
        name: " ",
        email: " ",
        password: " "
    }
];

function SignUp(event) {
    event.preventDefault();
    const nameInputElement = document.getElementById('name');
    const emailInputElement = document.getElementById('email');
    const passwordInputElement = document.getElementById('password');

    const data = {
        name: nameInputElement.value,
        email: emailInputElement.value,
        password: passwordInputElement.value
    };

    user.push(data);

    nameInputElement.value = '';
    emailInputElement.value = '';
    passwordInputElement.value = '';

    showToast("User create is successful");
}

function SignIn(event) {
    event.preventDefault();
    const signEmailInputElement = document.getElementById('signEmail');
    const signPasswordInputElement = document.getElementById('signPassword');

    const data = {
        signEmail: signEmailInputElement.value,
        signPassword: signPasswordInputElement.value
    };

    const foundUser = user.find(u => u.email === data.signEmail && u.password === data.signPassword);

    if (foundUser) {
        showToast("Login is Successful");
        window.location.href = 'https://www.google.com/';
    } else {
        showToast("Login Failed");
    }
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.classList.add('toast');
    toast.textContent = message;
    document.body.appendChild(toast);

    // 3 saniye sonra toast mesajını kaldır
    setTimeout(() => {
        document.body.removeChild(toast);
    }, 3000);
}
