import { forEach } from "lodash";

const ListSeat = (props) => {

    // const { listSeat } = props
    // console.log(listSeat);

    let number = []

    for (let i = 0; i < 100; i++) {
        // Thêm số nguyên i vào mảng
        number.push(i);
    }

    return (
        <div className='border-seat'>
            {number && number.length > 0 &&
                number.map((item, index) => {
                    return (
                        <div className="seat">
                            Ghế
                        </div>
                    )
                })
            }
        </div>
    )
}

export default ListSeat