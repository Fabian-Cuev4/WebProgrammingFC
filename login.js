const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");

loginForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  const validUser = "admin";
  const validPassword = "1234";

  if (username === validUser && password === validPassword) {
    window.location.href = "app.html";
  } else {
    loginMessage.textContent = "Usuario o contraseña incorrectos";
  }
});