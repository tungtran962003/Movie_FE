import { useNavigate } from 'react-router-dom';
import './Forbidden.scss'
import { FaBan } from "react-icons/fa6";

const Forbidden = (props) => {

    const navigate = useNavigate()

    return (
        <div className="forbidden-container">
            <div className='forbidden'>
                4
                <FaBan className='icon-forbidden' />
                3
            </div>
            <div className='text-forbidden'>
                Không có quyền truy cập
            </div>
            <div className='text-forbidden'>
                Quay về <span onClick={() => navigate('/')} className='go-home'>trang chủ</span>
            </div>
        </div>
    )
}


export default Forbidden