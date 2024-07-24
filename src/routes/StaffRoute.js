import { useEffect, useState } from "react";
import { getCookie } from "../components/Auth/CookieManager";
import Forbidden from "../components/Common/Error/Forbidden";
import { getPrincipal } from "../services/AuthService";

const StaffRoute = (props) => {

    const [accountByToken, setAccountByToken] = useState({})

    const token = getCookie('cookie')
    useEffect(() => {
        getAccountByToken()
    }, [])

    const getAccountByToken = async () => {
        if (token === null || token === undefined) {
            return
        }
        let response = await getPrincipal(token)
        setAccountByToken(response)
    }

    if (accountByToken === null || accountByToken === undefined) {
        return <Forbidden to='/forbidden'></Forbidden>
    }

    if (token === null || token === undefined) {
        return <Forbidden to='/forbidden'></Forbidden>
    }

    if (accountByToken?.role?.name === 'User') {
        return <Forbidden to='/forbidden'></Forbidden>
    }

    return (
        <div>
            {props.children}
        </div>
    )
}

export default StaffRoute