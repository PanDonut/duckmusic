import './style/index.css'
import { getDatabase, ref, onValue, set } from "firebase/database";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { useState } from 'react';
import { useHistory } from "react-router-dom";

function Authorize() {

	const secondaryAppConfig = {
		apiKey: "AIzaSyBrTxMT7hdosmizt_zbNeakK360BcrfYhM",
		authDomain: "duck-auth.firebaseapp.com",
		projectId: "duck-auth",
		storageBucket: "duck-auth.appspot.com",
		messagingSenderId: "379739278339",
		appId: "1:379739278339:web:011fde286bc19cc71f1236",
		databaseURL: "https://duck-auth-default-rtdb.europe-west1.firebasedatabase.app",
		measurementId: "G-44TNP3VS3J"
	};

	const [uname, setUName] = useState('');

	const aut = initializeApp(secondaryAppConfig, "secondary");

	const analytics = getAnalytics(aut);
	const db = getDatabase(aut);
	console.log(window.location.href.split('=')[1].split('.').join(""));

	const nameRef = ref(db, 'users/' + window.location.href.split('=')[1].split('.').join("") + '/name');
	onValue(nameRef, (snapshot) => {
		const data = snapshot.val();
		localStorage.setItem('name', data);
		if (uname != data) {
			setUName(data);
		}
		console.log(data);
	});

	localStorage.setItem('email', window.location.href.split('=')[1]);

	setTimeout(function () { history.push("/"); } }, 2000);

    return (
        <div>
			<h1 className="authtext">{'Autoryzowanie ' + uname}</h1>
        </div>
        )
}

export default Authorize;
