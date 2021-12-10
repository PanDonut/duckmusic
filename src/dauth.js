import { initializeApp } from "firebase/app";

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

export const aut = initializeApp(secondaryAppConfig, "secondary");