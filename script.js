'use strict';
let persons = [
  { firstName: 'Týna', secondName: 'Testi', birth: '1990-01-28' },
  { firstName: 'Dominika', secondName: 'Nováková', birth: '1980-01-24' },
  { firstName: 'Jana', secondName: 'Nováková', birth: '1980-06-22' },
  { firstName: 'Lada', secondName: 'Nová', birth: '1982-06-27' },
  { firstName: 'Lada', secondName: 'Norebertová', birth: '2021-04-28' },
];

// *********   NAMEDAYS  *****************

const localTime = () => {
  const date = new Date();
  return {
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds(),
  };
};
// Today
const displayNameToday = (json) => {
  const todayElm = document.querySelector('.today__result');
  todayElm.textContent = `${json.data.namedays.cz}`;
};

fetch('https://api.abalin.net/today?country=cz')
  .then((response) => response.json())
  .then(displayNameToday);

//Tomorrow
const displayNameTomorrow = (json) => {
  const todayElm = document.querySelector('.tomorrow__result');
  todayElm.textContent = `${json.data.namedays.cz}`;
};

fetch('https://api.abalin.net/tomorrow?country=cz')
  .then((response) => response.json())
  .then(displayNameTomorrow);

// Who does celebrate on...
const dayElm = document.querySelector('#day');
const monthElm = document.querySelector('#month');
const nameElm = document.querySelector('.who__result');

const displayNameWho = (json) => {
  nameElm.textContent = `Dne ${dayElm.value}.${monthElm.value}. má svátek: 
  ${json.data.namedays.cz}`;
};

document.querySelector('#btn--who').addEventListener('click', () => {
  fetch(
    `https://api.abalin.net/namedays?country=cz&month=${monthElm.value}&day=${dayElm.value}`,
  )
    .then((response) => response.json())
    .then(displayNameWho);

  if (
    dayElm.value <= 0 ||
    dayElm.value > 31 ||
    monthElm.value <= 0 ||
    monthElm.value > 12
  ) {
    nameElm.textContent = 'Byly zadány neplatné hodnoty';
  }
});

// When
const firstnameElm = document.querySelector('#name');
const whenElm = document.querySelector('.when__result');

const displayNameWhen = (json) => {
  whenElm.textContent = `${firstnameElm.value} má svátek: 
  ${json.results[0].day}.${json.results[0].month}.`;
};

document.querySelector('#btn--when').addEventListener('click', () => {
  fetch(`https://api.abalin.net/getdate?name=${firstnameElm.value}&country=cz`)
    .then((response) => response.json())
    .then(displayNameWhen);
});
