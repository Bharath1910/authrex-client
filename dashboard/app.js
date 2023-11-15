const username = document.getElementById("username");
const userid = document.getElementById("uid");
const api_key = document.getElementById("secret");
const emailAuth = document.getElementById("email_auth");
const pgpAuth = document.getElementById("pgp_auth");
const update = document.getElementById("update");
const token_gen = document.getElementById("token_gen");

// const url = 'https://authrexapi.bharathshanmugam.dev';
const url = 'http://localhost:5000';

function setCookie(name,value,days) {
	var expires = "";
	if (days) {
			var date = new Date();
			date.setTime(date.getTime() + (days*24*60*60*1000));
			expires = "; expires=" + date.toUTCString();
	}
	document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

const token = getCookie('token');
const id = getCookie('id');
const user = getCookie('name');
const api_key_cookie = getCookie('api_key');

if (!token) {
	window.location.href = '../login';
}

username.innerText = user;
userid.innerText = id;

function fetchToken() {
	fetch(`${url}/key?t=generate`, {
		headers: {
			'Authorization': `Bearer ${token}`
		}
	})
	.then(res => {
		if (res.status === 401) {
			alert("Invalid token");
			return;
		}

		res.json().then(data => {
			setCookie('api_key', data.token);
			api_key.innerText = data.token;
		})
	})
}


token_gen.addEventListener('click', fetchToken);