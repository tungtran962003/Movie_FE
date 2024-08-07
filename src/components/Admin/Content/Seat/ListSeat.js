import { forEach } from "lodash";

const ListSeat = (props) => {

    const { listSeat, setListSeat, horizontal, vertical } = props

    const cols = 10

    const rows = 10

    const listRow = []
    const listCol = []
    for (let i = 0; i < rows; i++) {
        listRow.push(i);
    }

    for (let i = 0; i < cols; i++) {
        listCol.push(i);
    }

    return (
        <div className='border-seat'>
            {
                listRow.map(row => (
                    <div className="row-seat">
                        {
                            listCol.map(col => (
                                <div className="seat">
                                    Ghế
                                </div>
                            ))
                        }
                        <br />
                    </div>
                ))
            }
        </div>
    )
}

export default ListSeat