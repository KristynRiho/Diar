'use strict';
const localTime = () => {
  const date = new Date();
  return {
    currentYear: date.getFullYear(),
    currentMonth: date.getMonth(),
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds(),
  };
};

// ******************* BIRTHDAY **************************
let persons = [
  { firstName: 'Tyna', secondName: 'Testi', birth: '2000-04-28' },
  { firstName: 'Lada', secondName: 'Norebertova', birth: '2014-05-26' },
  { firstName: 'Jana', secondName: 'Nováková', birth: '1980-04-22' },
  { firstName: 'Lada', secondName: 'Nova', birth: '1982-06-27' },
  { firstName: 'Dominika', secondName: 'Nováková', birth: '1980-03-24' },
];

// birthday in the current month:
let mesic = '';
const year = 0;
const day = '';

let message = '';
for (let i = 0; i < persons.length; i++) {
  const soucasnyMesic = String(localTime().currentMonth + 1).padStart(2, '0');
  let mesic = persons[i].birth.slice(5, 7);
  const year = Number(persons[i].birth.slice(0, 4));
  const day = persons[i].birth.slice(8, 10);
  if (soucasnyMesic === mesic) {
    message += `<li> ${persons[i].firstName} ${
      persons[i].secondName
    } ${day}. ${mesic}. (${localTime().currentYear - year} let)</li>`;
  }
}
if (message !== '') {
  document.querySelector('.current-month').innerHTML = message;
} else {
  document.querySelector('.current-month').innerHTML =
    'Nikdo nemá tento měsíc narozeniny';
}

// fce pro výpis jednoho záznamu:
const onePerson = (listOfPersons) => {
  const dateOfBirt = listOfPersons.birth;
  const year = Number(dateOfBirt.slice(0, 4));
  const month = dateOfBirt.slice(5, 7);
  const day = dateOfBirt.slice(8, 10);
  return `<li class='one-person'>
  ${listOfPersons.firstName} ${
    listOfPersons.secondName
  } má narozeniny ${day}.${month}. (${localTime().currentYear - year} let).
  </li>`;
};
// výpis všech záznamů:
document.querySelector('#btn--all').addEventListener('click', () => {
  document.querySelector('.all-persons').innerHTML = '';
  persons.forEach((item) => {
    document.querySelector('.all-persons').innerHTML += onePerson(item);
  });
});

//narozeniny dle jména
document.querySelector('#btn--by-name').addEventListener('click', () => {
  const fnameElm = document.querySelector('#fname').value;
  const lnameElm = document.querySelector('#lname').value;
  for (let j = 0; j < persons.length; j++) {
    const datum = persons[j].birth;
    if (
      persons[j].firstName === fnameElm &&
      persons[j].secondName === lnameElm
    ) {
      console.log('jsem tam');
      document.querySelector(
        '.birthday-by-name',
      ).innerHTML = `<p>${fnameElm} ${lnameElm} má narozeniny ${datum.slice(
        8,
        10,
      )}. ${datum.slice(5, 7)}. (${
        localTime().currentYear - Number(datum.slice(0, 4))
      } let)</p>`;
      break;
    } else {
      console.log('nejsem tam');
      document.querySelector(
        '.birthday-by-name',
      ).innerHTML = `<p>${fnameElm} ${lnameElm} není v tvém diáři. </p>`;
    }
  }
});

// přidání osoby do seznamu:
document.querySelector('#btn--add').addEventListener('click', () => {
  const firstNameAddElm = document.querySelector('#firstname').value;
  const lastNameAddElm = document.querySelector('#lastname').value;
  const birthElm = document.querySelector('#dateOfBirth').value;
  const newPerson = {
    firstName: firstNameAddElm,
    secondName: lastNameAddElm,
    birth: birthElm,
  };
  persons.push(newPerson);
  document.querySelector('.ok-msg').textContent =
    'Osoba byla přidána do seznamu';
});
