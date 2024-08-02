import { forEach } from "lodash";

const ListSeat = (props) => {

    const { listSeat, setListSeat, horizontal, vertical } = props

    const cols = 2

    const rows = 5

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
                    <div>
                        {
                            listCol.map(col => (
                                <div className="seat">
                                    Ghế 123
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