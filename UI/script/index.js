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

document.getElementById('logOut').addEventListener('click', () => {
	localStorage.removeItem('anceledos');
	// eslint-disable-next-line no-restricted-globals
	location.assign('./index.html');
});
