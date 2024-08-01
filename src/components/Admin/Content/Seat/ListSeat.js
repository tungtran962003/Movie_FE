import { forEach } from "lodash";

const ListSeat = (props) => {

    const { listSeat, setListSeat, horizontal, vertical } = props

    const a = 5

    const b = 2

    for (let i = 0; i < 5; i++) {
        listSeat.push(i);
    }

    return (
        <div className='border-seat'>
            {listSeat && listSeat.length > 0 &&
                listSeat.map((item, index) => {
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