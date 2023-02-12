import { Link } from "react-router-dom"
import styled from "styled-components"
import { searchedGenre } from "../features/genreSlice"
import { useAppDispatch } from "../hooks"

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
                            dispatch(searchedGenre({ genre: item.id }))
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
    color: white;
    border: 1px solid white;
    cursor: pointer;
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