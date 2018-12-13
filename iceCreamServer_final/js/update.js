'use strict';

(function(){
  let iceCreamList;
  let name;
  let price;
  let iceCreamImage;

  document.addEventListener('DOMContentLoaded', init);

  function init() {
    iceCreamList = document.getElementById('iceCreams');
    name = document.getElementById('name');
    price = document.getElementById('price');
    iceCreamImage = document.getElementById('iceCreamImage');

    fetch('/all')
      .then(result => result.json())
      .then(flavors => populateIceCreamList(flavors))
      .catch(err => console.log(err));
  }

  function populateIceCreamList(flavors) {
    for(let flavor of flavors) {
      let option = document.createElement('option');
      option.value = `/${flavor}`;
      option.textContent = flavor[0].toUpperCase() + flavor.substr(1);
      iceCreamList.appendChild(option);
    }
    iceCreamList.addEventListener('change', choose);
    iceCreamList.value = '';
  }

  function choose() {
    let iceCream = iceCreamList.value;
    if(iceCream.length > 0) {
      fetch(`/api${iceCream}`) // /api/Blueberry
        .then(result => result.json())
        .then(data => updateResult(data))
        .catch(err => console.log(err));
    }
    else {
      updateResult({name:'', price:'', image:''});
    }
  }

  function updateResult(data) {
    name.textContent = data.name;
    price.textContent = data.price;
    if(data.image.length === 0) {
      iceCreamImage.classList.add('hiddenimage');
    }
    else {
      iceCreamImage.classList.remove('hiddenimage');
      iceCreamImage.src = `/images/${data.image}`;
    }
  }

})();
