import './style/index.css'
import { useState } from 'react';
import { useHistory } from "react-router-dom";

function Authorize() {

const history = useHistory();

    return (
        <div>
			<a href="https://dauth.vercel.app/v2/auth/login&redirect=duckmusic.vercel.app" className="authtext">Zaloguj się</a>
        </div>
        )
}

export default Authorize;
