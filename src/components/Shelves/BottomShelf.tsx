import makeShelves from "../../utils/makeShelves"

const BottomShelf = ({ shelvesContent }: any) => {

    return (
        makeShelves({
            cols: 'repeat(4, 100px)',
            rows: '51px',
            content: shelvesContent
        })
    )
}

export default BottomShelf