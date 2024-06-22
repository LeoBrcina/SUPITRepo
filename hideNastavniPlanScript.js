const token = sessionStorage.getItem('JWT');

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
    sessionStorage.removeItem('username');
    location.assign("aboutUsPage.html");
}

checkToken();