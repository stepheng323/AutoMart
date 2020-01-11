const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const email = document.getElementById('email');
const password = document.getElementById('password');
const address = document.getElementById('address');
const signUp = document.querySelector('.signupbtn');

const url = 'https://automartendpoints.herokuapp.com/api/v1/auth/signup';

signUp.addEventListener('click', async (e) => {
  e.preventDefault();
  const data = {
    first_name: firstName.value,
    last_name: lastName.value,
    email: email.value,
    password: password.value,
    address: address.value,
  };
  const request = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const result = await request.json();
  const { data: user, status } = result;
  if (status === 400 || status === 409) {
    const warning = document.createElement('p');
    const content = document.createTextNode(result.error);
    warning.setAttribute('class', 'warning');
    warning.appendChild(content);
    signUp.parentNode.insertBefore(warning, signUp);
    return false;
  }
  firstName.value = '';
  lastName.value = '';
  password.value = '';
  email.value = '';
  address.value = '';

  localStorage.setItem('anceledos', JSON.stringify(user));
  location.assign('./index.html');
});
