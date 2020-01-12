const email = document.getElementById('email');
const password = document.getElementById('pwd');
const signinBtn = document.querySelector('.signinbtn');

const url = 'https://automartendpoints.herokuapp.com/api/v1/auth/signin';

signinBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  const data = { email: email.value, password: password.value };
  const request = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const result = await request.json();
  const { data: user, status } = result;

  if (status === 400) {
    const warning = document.createElement('p');
    const content = document.createTextNode(result.error);
    warning.setAttribute('class', 'warning');
    warning.appendChild(content);
    signinBtn.parentNode.insertBefore(warning, signinBtn);
    password.style.border = '2px solid #f5c3bf';
    email.style.border = '2px solid #f5c3bf';

    return;
  }

  const { token } = user;
  localStorage.setItem('anceledos', JSON.stringify(token));
  location.assign('index.html');
});
