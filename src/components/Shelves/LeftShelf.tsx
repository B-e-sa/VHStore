import makeShelves from "../../utils/makeShelves"
import { IGenres } from "../../utils/types"

const LeftShelf = ({ shelvesContent }: any) => {

    return (
        makeShelves({
            cols: '50px',
            rows: 'repeat (2, 150px) 115px',
            rowGap: '30px',
            margin: '0 50px 0 0',
            content: shelvesContent
        })
    )
}

export default LeftShelf