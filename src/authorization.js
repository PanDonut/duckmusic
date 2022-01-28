import './style/index.css'
import { getDatabase, ref, onValue, set } from "firebase/database";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { useState } from 'react';
import { useHistory, useParams } from "react-router-dom";
import { GetImg } from './image.js';
import { aut } from './dauth';

function Authorize() {

const history = useHistory();


	const [uname, setUName] = useState('');
	const {path, cnt} = useParams();
	

	const analytics = getAnalytics(aut);
	const db = getDatabase(aut);

	const nameRef = ref(db, 'users/' + path.split('.').join("") + '/name');
	onValue(nameRef, (snapshot) => {
		const data = snapshot.val();
		localStorage.setItem('name', data);
		if (uname != data) {
			setUName(data);
		}
	});

	localStorage.setItem('emaildm', path);
	GetImg(aut, path.split('.').join(""));
	console.log(cnt.replace(">", "/"));
	setTimeout(function () { history.push(cnt.replace(">", "/")); }, 2000);

    return (
        <div>
			<h1 className="authtext">{'Autoryzowanie ' + uname}</h1>
        </div>
        )
}

export default Authorize;
