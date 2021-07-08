// login, open modal
const logInModalEl = document.getElementById('logInButton');
const modalContLog = document.getElementById('logInModal');
logInModalEl.addEventListener('click', function() {
  event.preventDefault();
  modalContLog.classList.add('is-active');
});
// login, close modal
const modalLogCloseEl = document.getElementById('modalLogClose');
modalLogCloseEl.addEventListener('click', function() {
  modalContLog.classList.remove('is-active');
});

// sign in, open modal
const signInEl = document.getElementById('signInButton');
const modalSignLog = document.getElementById('signInModal');
signInEl.addEventListener('click', function() {
  event.preventDefault();
  modalSignLog.classList.add('is-active');
});
// sign in, close modal
const modalCloseEl = document.getElementById('modalSignClose');
modalCloseEl.addEventListener('click', function() {
  modalSignLog.classList.remove('is-active');
});



// login form
const loginFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#name-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (name && password) {
    const response = await fetch('/api/seller/login', {
    method: 'POST',
    body: JSON.stringify({ name, password }),
    headers: { 'Content-Type': 'application/json' },
      });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert('Failed to log in.');
  }
  }
};


// sign up form
const signupFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (name && email && password) {
    const response = await fetch('/api/seller', {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
    headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/');

    } else {
        alert('Failed to sign up.');
    }
  }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);