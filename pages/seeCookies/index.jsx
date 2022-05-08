import Cookies from 'js-cookie';
import { useEffect } from 'react';
const SeeCookies = () => {

    useEffect(() => {
        console.log(Cookies.get("jejeje"));
    })

    return (<>
        ejeje
    </>)
}

export default SeeCookies;