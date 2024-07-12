import { useNavigate } from 'react-router-dom';
import './NotFound.scss'
import { RxQuestionMarkCircled } from "react-icons/rx";

const NotFound = (props) => {

    const navigate = useNavigate()

    return (
        <div className="notfound-container">
            <div className='notfound'>
                4
                <RxQuestionMarkCircled className='icon-notfound' />
                4
            </div>
            <div className='text-notfound'>
                Không tìm thấy đường dẫn
            </div>
            <div className='text-notfound'>
                Quay về <span onClick={() => navigate('/')} className='go-home'>trang chủ</span>
            </div>
        </div>
    )
}


export default NotFound