
import React from 'react'

const FilmRow = (props) => {
   // console.log('fimrow-props--', props)
   

    const handleSelect = () => {
      console.log('handleselect in filmrow--',props)
        props.handleSelect(props)
      }
  return (
    <div> 
                <div className="FilmRow">
          <img src={`https://image.tmdb.org/t/p/w780${props.poster_path}`} alt={`${props.title}film poster`} />
          <div className="film-summary">
            <h3>{props.title}</h3>
            <p>{props.release_date.substring(0, 4)}</p>
            <div className="actions">
            {props.fav ? (
            <button className="action" onClick={() => props.handleRemoveFavourite(props)}>
              <span className="material-icons">remove_from_queue</span>
            </button>
          ) : (
            <button className="action" onClick={() => props.handleAddFavourite(props)}>
              <span className="material-icons">add_to_queue</span>
            </button>
          )}
              <button className="action" onClick={handleSelect}>
                <span className="material-icons">read_more</span>
              </button>
            </div>
          </div>
        </div>
       
    </div>
  )
}

export default FilmRow