import Slider from "./Slider"
import './Home.scss'
import { useEffect, useState } from "react"
import { getListMovieHome } from "../../../services/HomeService"
import { FaTicketAlt } from "react-icons/fa";
import moment from 'moment';

const Home = () => {

    const [listIsShowing, setListIsShowing] = useState([])
    const [listUpComming, setListUpComming] = useState([])

    const getHome = async () => {
        let response = await getListMovieHome()
        setListIsShowing(response.listMovieIsShowing)
        setListUpComming(response.listUpCommingMovie)
    }

    const convertGMTtoVietnamese = (dateTime) => {
        const vietnameseDateTime = moment(dateTime).utcOffset(7).format('DD/MM/YYYY');
        return vietnameseDateTime;
    }

    useEffect(() => {
        getHome()
    }, [])

    return (
        <div className="home-container">
            <div className="slider-container">
                <Slider />
            </div>
            <div className="home-content">
                <div className="title-list-movie">
                    Phim đang chiếu
                </div>
                <div className="list-movie row col-12">
                    {listIsShowing && listIsShowing.length > 0 &&
                        listIsShowing.map((item, index) => {
                            return (
                                <div className="card-movie col-3">
                                    <div>
                                        <div className="img-movie">
                                            <img src={`http://localhost:8080/image/movie/${item.id}`} />
                                        </div>
                                        <div className="movie-name">
                                            {item.name}
                                        </div>
                                        <div className="content-movie">
                                            <div className="title-movie">
                                                Thể loại: <span className="content">{item.movieType.name}</span>
                                            </div>
                                            <div className="title-movie">
                                                Thời lượng: <span className="content">{item.time} phút</span>
                                            </div>
                                            <div className="title-movie">
                                                Khởi chiếu: <span className="content">{convertGMTtoVietnamese(item.premiereDate)}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="btn-function">
                                        <button className="btn-ticket"><FaTicketAlt className="me-1" />Mua vé</button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="title-list-movie">
                    Phim sắp chiếu
                </div>
                <div className="list-movie">
                    List Phim
                </div>
            </div>
            <div>

            </div>

        </div>
    )
}

export default Home