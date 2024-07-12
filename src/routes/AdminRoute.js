import { getCookie } from "../components/Auth/CookieManager";
import Forbidden from "../components/Common/Error/Forbidden";

const AdminRoute = (props) => {

    let account = getCookie('cookie')
    console.log('check cookies ', account);

    if (account === null || account === undefined) {
        return <Forbidden to='/forbidden'></Forbidden>
    }

    return (
        <div>
            {props.children}
        </div>
    )
}

export default AdminRoute