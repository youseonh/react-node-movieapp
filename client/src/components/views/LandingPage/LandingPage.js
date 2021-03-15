import React, { useEffect, useState } from 'react'
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config';
import MainImage from './Sections/MainImage';
import GridCards from '../Commons/GridCard';
import { Row } from 'antd';

function LandingPage() {

  const [Movies, setMovies] = useState([])
  const [MainMovieImage, setMainMovieImage] = useState(null)
  const [CurrentPage, setCurrentPage] = useState(0)

  // 랜딩시마다 동작
  useEffect(() => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    fetchMovies(endpoint)
  }, [])

  // 영화 내용 가져오는 함수
  const fetchMovies = (endpoint) => {
    fetch(endpoint)
      .then(response => response.json())
      .then(response => {
        console.log(response)
        setMovies([...Movies, ...response.results])
        setMainMovieImage(response.results[0])
        setCurrentPage(response.page)
      })
  }

  //more 버튼 클릭시 동작
  const loadMoreItems = () => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${CurrentPage + 1}`;
    fetchMovies(endpoint)
  }


  return (
    <div style={{ width: '100%', margin: '0' }}>

      {/* Main Image */}
      {MainMovieImage &&
        <MainImage
          image={`${IMAGE_BASE_URL}w1280${MainMovieImage.backdrop_path}`}
          title={MainMovieImage.original_title}
          text={MainMovieImage.overview}
        />
      }

      <div style={{ width: '85%', margin: '1rem auto' }}>

        <h2>Movies by latest</h2>
        <hr />

        {/* Movie Grid Cards */}
        <Row gutter={[16, 16]}>
          {Movies && Movies.map((movie, index) => {
            return (
              <React.Fragment key={index}>
                <GridCards any
                  image={movie.poster_path ?
                    `${IMAGE_BASE_URL}w500${movie.poster_path}` : null}
                  movieId={movie.id}
                  movieName={movie.original_title}
                />
              </React.Fragment>
            )
          })}
        </Row>
      </div>

      {/* 더보기 버튼 */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button onClick={loadMoreItems}> Load More</button>
      </div>

    </div >
  )
}

export default LandingPage