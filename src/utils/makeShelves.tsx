import styled from "styled-components"
import { searchedGenre } from "../features/genreSlice"
import { useAppDispatch } from "../hooks/hooks"

interface IProps {
    cols: string
    colGap: string
    rows: string
    rowGap: string
    margin: string
    padding: string
}

const makeShelves = ({
    cols = '',
    colGap = '',
    rows = '',
    rowGap = '',
    content = [{ id: 0, name: '' }],
    margin = '',
    padding = '',
}) => {

    const dispatch = useAppDispatch();

    return (
        <ShelfContainer
            cols={cols}
            colGap={colGap}
            rows={rows}
            rowGap={rowGap}
            margin={margin}
            padding={padding}
        >
            {content.map(item => {
                return (
                    <Shelf
                        key={item.id}
                        onClick={() => {
                            dispatch(searchedGenre({ genreId: item.id, genreName: item.name }))
                        }}
                    >
                        <p>{item.name}</p>
                    </Shelf>
                )
            })}
        </ShelfContainer>
    )
}

const Shelf = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    color: black;
    cursor: pointer;

    box-shadow: 
        3px 0 black, 
        -3px 0 black, 
        0 3px black, 
        0 -3px black;

`

const ShelfContainer = styled.div<IProps>`
    display: grid;
    grid-template-columns: ${props => props.cols};
    column-gap: ${props => props.colGap};
    grid-template-rows: ${props => props.rows};
    row-gap: ${props => props.rowGap};
    margin: ${props => props.margin};
    padding: ${props => props.padding};
`

export default makeShelves;