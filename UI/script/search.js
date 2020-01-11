const token = JSON.parse(localStorage.getItem('anceledos'));
const searchForm = document.getElementById('searchForm');
const buyCar = document.getElementById('buyCar');
const sellCar = document.getElementById('sellCar');
const logOut = document.getElementById('logOut');
const signUp = document.getElementById('signUp');
const signIn = document.getElementById('signIn');
const manufacturer = document.getElementById('manufacturer');
const makeArray = ['Toyota', 'Honda', 'Hyundia', 'Kia', 'Mistubishi', 'Mercedes', 'BMW', 'Cadillac', 'Peugout'];
const minPriceFormat = document.getElementById('minPrice');
const maxPriceFormat = document.getElementById('maxPrice');

// hide and show appropriate links
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

minPriceFormat.addEventListener('input', (e) => {
  // const formattedMinPrice = new Intl.NumberFormat().format(minPriceFormat.value);
  // minPriceFormat.value = formattedMinPrice;
});

// manufacturer options
makeArray.map((make) => {
  const opt = document.createElement('option');
  opt.innerHTML = make;
  opt.value = make.toLowerCase();
  manufacturer.appendChild(opt);
});

// function to store car id to local storage
window.getCarId = (id) => {
  sessionStorage.setItem('carId', JSON.stringify(id));
  location.assign('./details.html');
};

searchForm.addEventListener('submit', (e) => {
  const make = document.getElementById('manufacturer').value;
  const model = document.getElementById('model').value;
  const startYear = document.getElementById('startYear').value;
  const stopYear = document.getElementById('stopYear').value;
  const state = document.getElementById('state').value;
  const minPrice = document.getElementById('minPrice').value;
  const maxPrice = document.getElementById('maxPrice').value;
  const url = `http://localhost:3000/api/v1/car?status=available&min_price=${minPrice}&max_price=${maxPrice}&start_year=${startYear}&stop_year=${stopYear}&state=${state}&manufacturer=${make}&model=${model}`;

  const searchCars = async () => {  
    const request = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await request.json();
    const { error, status, data } = result;
    if (status === 401) {
      const message = '<a href="../UI/signin.html"><p>Please Login </p></a>';
      errorDisplay(message);
      return;
    }
    if (status === 400 || status === 404 || status === 500) {
      const message = `<p>${status} ${error}</p>`;
      errorDisplay(message);
      return;
    }
    let productCard = '';
    data.forEach((product) => { 
      let { image_url: image, manufacturer, model, price, state, status, id, year } = product;
      if (image === null) {
        image = './img/noimage.png';
      }
      const amount = new Intl.NumberFormat('NG', { style: 'currency', currency: 'NGN' }).format(price);
  
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
    document.querySelector('.boxes-container').style.display = 'grid';
    document.querySelector('.boxes-container').innerHTML = productCard;
  };
  searchCars();
  e.preventDefault();
  searchForm.reset();
});
