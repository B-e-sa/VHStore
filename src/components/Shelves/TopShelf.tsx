import styled from "styled-components"
import makeShelves from "../../utils/makeShelves"

const TopShelf = ({ shelvesContent }: any) => {

    return (
        makeShelves({
            cols: '330px 180px 100px',
            rows: '51px',
            content: shelvesContent
        })
    )
}

const Test = styled.div`
    display: flex;
    align-items: center;
    padding-left: 10px;

    clip-path: polygon(0 0, 100% 0, 73% 100%, 0 100%);
    background-color: black;
    color: white;
    border: 1px solid white;

    height: 51px;
    width: 100px;
`
export default TopShelf