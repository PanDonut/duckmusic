import './style/index.css'
import { getDatabase, ref, onValue, set } from "firebase/database";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { useState } from 'react';
import { useHistory } from "react-router-dom";
import { GetImg } from './image.js';
import { aut } from './dauth';

function Authorize() {

const history = useHistory();


	const [uname, setUName] = useState('');

	

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
	GetImg(aut, window.location.href.split('=')[1].split('.').join(""));

	setTimeout(function () { history.push("/"); }, 2000);

    return (
        <div>
			<h1 className="authtext">{'Autoryzowanie ' + uname}</h1>
        </div>
        )
}

export default Authorize;
