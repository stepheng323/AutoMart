/* eslint-disable no-tabs */
/* eslint-disable object-curly-newline */
/* eslint-disable object-curly-spacing */
/* eslint-disable prefer-const */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-vars */

const token = JSON.parse(localStorage.getItem('anceledos'));
const buyCar = document.getElementById('buyCar');
const sellCar = document.getElementById('sellCar');
const logOut = document.getElementById('logOut');
const signUp = document.getElementById('signUp');
const signIn = document.getElementById('signIn');

buyCar.style.display = 'none';
sellCar.style.display = 'none';
logOut.style.display = 'none';

if (token) {
  buyCar.style.display = 'unset';
  sellCar.style.display = 'unset';
  signIn.style.display = 'none';
  signUp.style.display = 'none';
  logOut.style.display = 'unset';
}

const timer = setInterval(() => {
  const isLoaded = document.getElementById('products').value;
  if (isLoaded === 'loaded' && token) {
    document.querySelector('.product-filter').style.display = 'block';
    document.getElementById('products').style.display = 'grid';
    document.getElementById('loader-container').style.display = 'none';
    clearInterval(timer);
  }
}, 10);

const getCarId = (id) => {
  sessionStorage.setItem('carId', JSON.stringify(id));
  location.assign('./details.html');
};
const errorDisplay = (message) => {
  document.querySelector('.product-filter').style.display = 'none';
  document.getElementById('products').innerHTML = message;
  document.getElementById('products').setAttribute('class', 'center');
  document.getElementById('products').style.display = 'flex';
};

const getCars = async () => {
  const url = 'http://localhost:3000/api/v1/car?status=available';
  const request = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const result = await request.json();
  const { data, status, error } = result;
  if (status === 401) {
    const message = '<a href="../UI/signin.html"><p>Please Login </p></a>';
    errorDisplay(message);
    return;
  }
  if (status === 404 || status === 500) {
    const message = `<p>${status} ${error}</p>`;
    errorDisplay(message);
    return;
  }
  let productCard = '';
  data.forEach((product) => {
    let {
      image_url: image,
      manufacturer,
      model,
      price,
      state,
      status,
      id,
      year,
    } = product;
    if (image === null) {
      image = './img/noimage.png';
    }
    const amount = new Intl.NumberFormat('NG', {
      style: 'currency',
      currency: 'NGN',
    }).format(price);
    productCard += `<div class="product-card">
			<a onclick="getCarId(${id})">
      <div class="product-image">
        <img src="${image}" />
      </div>
      <div class="product-info">
					<h3>${year} ${manufacturer} ${model}</h3>
					<h4 class="state">${state}</h4>
					<h4 id="price">${amount}</h4>
          <h4 class="properties">Year: <span class="dark">${year}</span></h4>
          <h4 class="properties">Status: <span class="dark">${status}</span></h4>
      </div>
			</a>
    </div>`;
  });
  document.getElementById('products').innerHTML = productCard;
  document.getElementById('products').value = 'loaded';
};
getCars();
