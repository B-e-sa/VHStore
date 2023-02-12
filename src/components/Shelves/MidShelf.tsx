import makeShelves from '../../utils/makeShelves';

const MidShelf = ({ shelvesContent }: any) => {
    return (
        makeShelves({
            cols: 'repeat(2, 280px)',
            rows: 'repeat(3, 50px)',
            rowGap: '50px',
            content: shelvesContent,
            margin: '50px 0 50px 0'
        })
    )
}

export default MidShelf;