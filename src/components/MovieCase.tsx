import { useEffect, useState } from "react";

const MovieCase = () => {

  const [selectedMovie, setSelectedMovie] = useState();

  const [movieCase, setMovieCase] = useState([{ name: 'aaa' }, { name: 'bbb' }, { name: 'ccc' }]);

  useEffect(() => {
    console.log('sla')
  }, [movieCase])

  const dummy = [
    {
      name: 'penis'
    },
    {
      name: 'dick'
    },
    {
      name: 'cock'
    }
  ]

  const movieCaseLength = movieCase.length || 1

  return (
    <div className="App">

      <div
        style={{
          border: '1px solid white',
          width: '250px',
          height: '150px',
          marginBottom: 10
        }}>
        {movieCase.map((space, index) => {
          return (
            <div
              style={{ height: 150 / movieCaseLength }}
              key={index}
              onDrop={() => space.name = selectedMovie.name}
              onDragOver={(e) => e.preventDefault()}
            >
              {space.name}
            </div>
          )
        })}
      </div>

      <div>
        {dummy.map(movie => {
          return (
            <div
              style={{ color: 'black', backgroundColor: 'white' }}
              onDragStart={e => {
                e.currentTarget.style.backgroundColor = 'gray';
                setSelectedMovie(movie);
              }}
              onDragEnd={e => {
                e.currentTarget.style.backgroundColor = 'white';
                setSelectedMovie([])
              }}
              draggable='true'
            >
              {movie.name}
            </div>)
        })}
      </div>

    </div >
  )

}

export default MovieCase;