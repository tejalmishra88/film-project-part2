import FilmDetail from "../FilmDetail";
import TMDB from "../../TMDB";
import FilmRow from "../FilmRow";
import './FilmLibrary.css'
import React, { useState, useEffect } from 'react'


const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY
function FilmLibrary() 
{
  const filmsArray = TMDB.films
  const [films, setFilms] = useState([])
 // console.log('films', filmsArray)
  const [selectedFilm, setSelectedFilm] = useState(null)
  const [favourites, setfavourites] = useState([])
  const [option, setOption] = useState('all')
  const [fav, setFav] = useState(false)
  const [filmMap, setFilmMap] = useState([])
  const [page, setPage] = useState(1)
  const [year, setYear] = useState(2022)

  const getMovies = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate&primary_release_year=${year}`
    )
      .then((data) => data.json())
      .then((data) => data.results)
      .then((data) => data.map((item) => ({ ...item, fav: false })))

    console.log('response----', response)

    setFilms([...films, ...response])
    
    setPage(page + 1)
  }
  let years=["2010","2011","2012","2013","2014","2015","2016","2017","2018","2019","2020","2021","2022"]
  const handleChangeYear=(e)=>{
console.log('handlechangeyear--e',e)
setFilms([])
setYear(e)
  }
  useEffect(() => {
    getMovies()
  }, [year])
 
  
  const handleSelect = (film) => {
    console.log('film back in lib from list',film)
    setSelectedFilm(film)
  }
  const handleAddFavourite = (e) => {
    let faveList = [...films]
    const updatedFilms = faveList.map((item) => {
      if (item.id === e.id) {
        return { ...item, fav: true }
      }
      return item
    })
    setFilms(updatedFilms)
  }
  const handleRemoveFavourite = (e) => {
    let faveList = [...films]
    const updatedFilms = faveList.map((item) => {
      if (item.id === e.id) {
        return { ...item, fav: false }
      }
      return item
    })
    setFilms(updatedFilms)
  }
  const selectFavTab = () => {
    setFav(true)
  }
  const selectAllTab = () => {
    setFav(false)
  }
  return (
    <div className="FilmLibrary">
      <div className="film-list">
        <h1 className="section-title">FILMS</h1>
        {!fav &&
        <>
        <select
      className="year-dropdown"
      onChange={(e) => handleChangeYear(e.target.value)}
    >
      <option value="">
        Select release year (default 2022)
      </option>
      {years.map((year) => (
        <option  key={year} value={year}>
          {year}
        </option>
      ))}
    </select>
    <button className="load-more" onClick={getMovies}>
Load 20 More Movies
</button>
</>
}
        <div className="film-list-filters">
        <button  className={`film-list-filter ${!fav && 'is-active'}`} onClick={selectAllTab} >
            ALL
            <span className="section-count">{films.length}</span>
          </button>
          <button  className={`film-list-filter ${fav && 'is-active'}`}   onClick={selectFavTab} >
            FAVES
            <span className="section-count" > {films.filter((item) => item.fav === true).length}</span>
          </button>
        </div>
        {fav===false ? (
          
films.map((item) => (
 
  <FilmRow
    key={item.id}
    handleSelect={handleSelect}
    handleAddFavourite={handleAddFavourite}
    handleRemoveFavourite={handleRemoveFavourite}
    {...item}
  />
 

))


) : (
  films.filter((item) => item.fav === true)
            .map((item) => (
              <FilmRow
                key={item.id}
                handleSelect={handleSelect}
                handleAddFavourite={handleAddFavourite}
                handleRemoveFavourite={handleRemoveFavourite}
                {...item}
              />
            ))
        )
        
          }
       
       
      </div>

      <div className="film-details">
        <h1 className="section-title">DETAILS</h1>
        <FilmDetail  film={selectedFilm}/>
      </div>
    </div>
  );
}

export default FilmLibrary