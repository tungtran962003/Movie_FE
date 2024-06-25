import Slider from "./Slider"
import './Home.scss'

const Home = () => {
    return (
        <div className="home-container">
            <div className="slider-container">
                <Slider />
            </div>
            <div className="home-content">
                <div className="title-list-movie">
                    Phim đang chiếu
                </div>
                <div className="list-movie">
                    List Phim
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