const username = document.getElementById("username");
const userid = document.getElementById("client_id");
const userid_info = document.getElementById("client_id_info");
const api_key = document.getElementById("client_secret");
const emailAuth = document.getElementById("email_auth");
const pgpAuth = document.getElementById("pgp_auth");
const update = document.getElementById("update_callback");
const token_gen = document.getElementById("regen_key");
const signout = document.getElementById("signout");

const url = 'https://authrexapi.bharathshanmugam.dev';
// const url = 'http://localhost:5000';

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

function eraseCookie(name) {   
	document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

const token = getCookie('token');
const id = getCookie('id');
const user = getCookie('name');
const api_key_cookie = getCookie('api_key');

console.log(api_key_cookie);

if (!api_key_cookie) {
	fetch(`${url}/key?t=get`, {
		headers: {
			'Authorization': `Bearer ${token}`
		}
	})
	.then(res => {
		res.json().then(data => {
			setCookie('api_key', data.token);
			api_key.innerText = data.token;
		})
	})
}

if (!token) {
	window.location.href = '../login';
}

username.innerText = user;
userid.innerText = id;
userid_info.innerText = id;

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

signout.addEventListener('click', (e) => {
	eraseCookie('token');
	eraseCookie('id');
	eraseCookie('name');
	alert("Signed out successfully");
	window.location.href = '../login';
});

update.addEventListener('click', (e) => {
	const callback_url = document.getElementById("callback_url").value;
	fetch(`${url}/user?redirect=${callback_url}`, {
		headers: {
			'Authorization': `Bearer ${token}`
		},
		method: 'POST'
	}).then(res => {
		if (res.status === 401) {
			alert("Invalid token");
			return;
		}

		if (res.status === 204) {
			alert("Callback updated successfully");
		}
	}).catch(err => {
		console.log(err);
	})
});


const clientBox = document.getElementById("client_box");

fetch(`${url}/user`, {
	headers: {
		'Authorization': `Bearer ${token}`
	}
})
.then(res => res.json())
.then(data => {
	console.log(data);
	data.forEach(client => {
		clientBox.innerHTML += `
		<div class="client_details">
			<div>${client.id}</div>
			<div>${client.username}</div>
		</div>
		`
	})
})
