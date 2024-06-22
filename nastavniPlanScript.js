const apiUrl = 'https://www.fulek.com/data/api/supit/curriculum-list/hr';

const token = sessionStorage.getItem('JWT');

const nameKolegij = document.getElementById('nameKolegij');

document.addEventListener('DOMContentLoaded', function () {

    console.log('JWT found:', token);

    checkToken();
    fetchKolegij();

    const autocompleteList = document.getElementById('autocomplete-list');
    const kolegijiTable = document.getElementById('kolegijiTable');
    const kolegijiBody = document.getElementById('kolegijiBody');
    const totalECTS = document.getElementById('totalECTS');
    const totalHours = document.getElementById('totalHours');
    const totalLectures = document.getElementById('totalLectures');
    const totalExercises = document.getElementById('totalExercises');

    console.log('Initialization complete.');

});

function checkToken() {
    if (!token) {
        document.getElementById('NP').style.display = 'none';
    }
    else {
        document.getElementById('NP').style.display = '';
        document.getElementById('loginButton').style.display = 'none';
        document.getElementById('logoutButton').style.display = '';
    }
};

function Logout() {
    sessionStorage.removeItem('JWT');
    location.reload();
}

function openContact() {
    document.getElementById("contactForm1").style.display = "flex";
}

function closeContact() {
    document.getElementById("contactForm1").style.display = "none";
}

function Logout() {
    sessionStorage.removeItem('JWT');
    sessionStorage.removeItem('username');
    location.assign("homePage.html");
}

nameKolegij.addEventListener("input", onInputChange);

let kolegijNames = [];
let kolegiji = [];

async function fetchKolegij() {
    try {
        const response = await fetch(apiUrl, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        console.log('Response status:', response.status);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        kolegijNames = data.data.map((kolegij) => {
            return kolegij.kolegij;
        });
        kolegiji = data.data.map((kolegij) => {
            return kolegij;
        });

        console.log(kolegijNames);
        console.log(kolegiji);

    } catch (error) {
        console.error('Error fetching kolegiji:', error);
        return [];
    }
}

function onInputChange() {
    removeAutocompleteDropdown();

    const value = nameKolegij.value.toLowerCase();

    if (value.length === 0) {
        return;
    }

    const filteredNames = [];

    kolegiji.forEach((kolegij) => {
        if (kolegij.kolegij.substr(0, value.length).toLowerCase() === value)
            filteredNames.push(kolegij);
    });

    createAutocompleteDropdown(filteredNames);
}

function createAutocompleteDropdown(list) {
    const listEl = document.createElement("ul");
    listEl.className = "autocomplete-list";
    listEl.id = "autocomplete-list";

    list.forEach((kolegij) => {
        const listItem = document.createElement("li");
        const kolegijButton = document.createElement("button");
        kolegijButton.innerHTML = kolegij.kolegij;
        listItem.appendChild(kolegijButton);
        kolegijButton.addEventListener('click', () => {
            document.getElementById('kolegijiTable').removeAttribute('hidden');
            document.querySelector('#kolegijiBody').innerHTML = '';
            onKolegijSelect(kolegij);
            selectedKolegiji.forEach(kolegij => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${kolegij.kolegij}</td>
                    <td>${kolegij.ects}</td>
                    <td>${kolegij.sati}</td>
                    <td>${kolegij.predavanja}</td>
                    <td>${kolegij.vjezbe}</td>
                    <td>${kolegij.tip}</td>
                    <td><button class="delete-btn" data-id="${kolegij.id}">Ukloni</button></td>
                `;
                row.querySelector('.delete-btn').addEventListener('click', () => {
                    removeKolegij(kolegij.id);
                });
                document.querySelector('#kolegijiBody').appendChild(row);
            });
            updateTotals();
        });
        listEl.appendChild(listItem);
    });

    document.querySelector("#autocomplete-wrapper").appendChild(listEl);
}

function removeAutocompleteDropdown() {
    const listEl = document.querySelector("#autocomplete-list");
    if (listEl) {
        listEl.remove();
    }
}

let selectedKolegiji = [];

async function onKolegijSelect(kolegij) {
    if (kolegij) {
        selectedKolegiji.push(kolegij);
    }
    else {
        console.error('Failed to fetch details for Kolegij ID:', kolegij.id);
    }
    removeAutocompleteDropdown();
    nameKolegij.value = '';
    document.getElementById('kolegijiTable').removeAttribute('hidden');
}

// Function to update the table totals
function updateTotals() {
    let totalECTSValue = 0;
    let totalHoursValue = 0;
    let totalLecturesValue = 0;
    let totalExercisesValue = 0;

    selectedKolegiji.forEach(kolegij => {
        totalECTSValue += kolegij.ects;
        totalHoursValue += kolegij.sati;
        totalLecturesValue += kolegij.predavanja;
        totalExercisesValue += kolegij.vjezbe;
    });

    totalECTS.textContent = totalECTSValue;
    totalHours.textContent = totalHoursValue;
    totalLectures.textContent = totalLecturesValue;
    totalExercises.textContent = totalExercisesValue;
}

function renderTable() {
    document.querySelector('#kolegijiBody').innerHTML = '';
    selectedKolegiji.forEach(kolegij => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${kolegij.kolegij}</td>
            <td>${kolegij.ects}</td>
            <td>${kolegij.sati}</td>
            <td>${kolegij.predavanja}</td>
            <td>${kolegij.vjezbe}</td>
            <td>${kolegij.tip}</td>
            <td><button class="delete-btn" data-id="${kolegij.id}">Ukloni</button></td>
        `;
        row.querySelector('.delete-btn').addEventListener('click', () => {
            removeKolegij(kolegij.id);
        });
        document.querySelector('#kolegijiBody').appendChild(row);
    });
    updateTotals();
}

function removeKolegij(id) {
    selectedKolegiji = selectedKolegiji.filter(kolegij => kolegij.id !== id);
    renderTable();
}
