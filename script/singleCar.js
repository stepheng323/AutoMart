/* eslint-disable prefer-const */
const carTitle = document.getElementById('title');
const Carprice = document.getElementById('price');
const CarImage = document.getElementById('image');
const carState = document.getElementById('state');
const carYear = document.getElementById('year');
const carColor = document.getElementById('color');
const carDescription = document.getElementById('description');

const carId = JSON.parse(sessionStorage.getItem('carId'));
const token = JSON.parse(localStorage.getItem('anceledos'));
const url = `https://automartendpoints.herokuapp.com/api/v1/car/${carId}`;

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

const errorDisplay = message => {
	document.querySelector('.main').innerHTML = message;
};

const getSingleCar = async () => {
	const request = await fetch(url, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		}
	});
	const result = await request.json();
	const { status, data, error } = result;
	if (status === 400) {
		const message = '<a href="../UI/signin.html"><p>Please Login </p></a>';
		errorDisplay(message);
		return;
	}
	if (status === 404 || status === 500) {
		const message = `<p>${status} ${error}</p>`;
		errorDisplay(message);
		return;
	}
	let {
		status: carStatus,
		manufacturer,
		model,
		image_url: image,
		price,
		year,
		color,
		description
	} = data;
	if (image === null) {
		image = './img/noimage.png';
	}
	const amount = new Intl.NumberFormat('NG', {
		style: 'currency',
		currency: 'NGN'
	}).format(price);

	carTitle.innerHTML = `${year} ${manufacturer} ${model}`;
	Carprice.innerHTML = amount;
	CarImage.src = image;
	carState.innerHTML = carStatus;
	carYear.innerHTML = year;
	carColor.innerHTML = color;
	carDescription.innerHTML = description;
};

if (!token) {
	location.assign('./signin.html');
}
getSingleCar();
