import styled from "styled-components"
import makeShelves from "../../utils/makeShelves"

const RightShelf = ({ shelvesContent }: any) => {

    return (
        makeShelves({
            cols: '51px',
            margin: '-27px 0 0 0',
            content: shelvesContent
        })
    )
}

const Test2 = styled.div`
    display: flex;
    align-items: center;
    border: 1px solid white;
    color: white;
    clip-path: polygon(50% 0%, 100% 0, 100% 60%, 100% 100%, 0 100%, 0 32%, 22% 20%);
    width: 51px;
`

export default RightShelf