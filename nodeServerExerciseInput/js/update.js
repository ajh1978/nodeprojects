'use strict';

(function(){

  let personContainer;

  document.addEventListener('DOMContentLoaded', init);

  function init() {
    personContainer = document.getElementById('personContainer');

    fetch('/persons')
      .then(result => result.json())
      .then(data => updateResult(data))
      .catch(err => console.log(err));
  }

  function updateResult(data) {

    for(let i=0; i < data.length; i++) {
      let person = document.createElement('div');
      person.id = 'person_' + i;
      person.className = 'person';
      personContainer.appendChild(person);

      let name = document.createElement('p');
      name.className = 'name';
      let image = document.createElement('img');
      image.className = 'photo';
      let imageText = document.createElement('p');
      imageText.className = 'imageText';
      image.appendChild(imageText);
      let years = document.createElement('p');
      years.className = 'years';

      person.append(name, image, years);

      let firstName = data[i].firstName;
      let lastName = data[i].lastName;
      let yearOfBirth = data[i].yearOfBirth;
      let yearOfDeath = data[i].yearOfDeath;
      let photo = data[i].photo;

      if(firstName === undefined){firstName = '';}
      if(lastName === undefined){lastName = '';}
      if(yearOfBirth === undefined){yearOfBirth = '';}
      if(yearOfDeath === undefined){yearOfDeath = '';}
      // if(photo === undefined || photo.length === 0){photo = 'no_image.png';}
      if(photo === undefined || photo.length === 0) {
        imageText.textContent = '(No portrait available)';
      }
      else {
        image.src = `/images/${photo}`;
      }

      name.textContent = `${firstName} ${lastName}`;

      if(yearOfDeath === '' && yearOfBirth ==='') {
        years.textContent = '';
      }
      else if(yearOfDeath ===''){
        years.textContent = `(${yearOfBirth})`;
      }
      else {
        years.textContent = `(${yearOfBirth} - ${yearOfDeath})`;
      }

    }
  }

})();
