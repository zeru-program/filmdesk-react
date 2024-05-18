import React, { useState } from 'react';
import './App.css';
import ReactSvg from './assets/react.svg'
import BootstrapSvg from './assets/bootstrap.svg'

const url = 'https://www.omdbapi.com/?apikey=c7ae72b3&'; 
const resultsPerPage = 10;

function Navbar() {
  const HandleGithub = () => {
      window.open('github.com')
  }
    
  return (
    <nav className="navbar py-2" style={{ background: '#0d0d0d' }}>
      <div className="container-fluid">
        <span className="navbar-brand text-light mb-0 h1">Filmdesk</span>
        <i style={{color: '#fff'}} className="bi bi-github mx-3 p-2" onClick={HandleGithub}></i>
      </div>
    </nav>
  );
}


function Footer() {
    return (
        <footer className="w-100 text-light d-flex flex-column justify-content-center py-5 position-relative bottom-0" style={{ background: '#000' }}>
           <h2>FilmDesk.</h2>
           <p>Created by zeru/justine, with React JS & Bootstrap, in 2024.</p>
           <div className="w-100 mt-4 d-flex gap-3 justify-content-center">
           <img src={ReactSvg} style={{width:'50px'}} />
           <img src={BootstrapSvg} style={{width:'50px'}} />
           </div>
        </footer>
     )
}


function SearchInput({ onSearch }) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue === '') {
      alert('Masukkan nama film dengan benar!');
      return;
    }
    onSearch(inputValue, 1);
    setInputValue('');
  };

  return (
    <div className="w-100 mt-3 d-flex flex-column px-3 text-light py-5 text-center">
      <h1>
        Search you're <span style={{ color: '#cb95f7' }}>Movies</span>
      </h1>
      <form className="input-group mb-3" id="form-film" onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control text-light"
          placeholder="search your movie here.."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          style={{ background: 'transparent', color: 'white' }}
          id="input-film"
        />
        <div className="input-group-append">
          <button
            className="btn btn-primary"
            style={{ background: '#8d1beb', borderRadius: 0, height: 40, border: 0 }}
            type="submit"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
}

function Pagination({ currentPage, totalPages, onPageChange }) {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => onPageChange(currentPage - 1)}>Previous</button>
        </li>
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => onPageChange(currentPage + 1)}>Next</button>
        </li>
      </ul>
    </nav>
  );
}


function Disclaimer () {
    const [Display, setDisplay] = useState('d-flex');
    
    const CloseDisclaimer = () => {
        setDisplay('d-none');
    }
    
    return (
      <>
      <div className={`w-100 ${Display} justify-content-center align-items-center z-3 vh-100 position-fixed top-0`} style={{ left: '0', backdropFilter: 'blur(5px)'}} onClick={CloseDisclaimer}>
         <div className="bg-light flex-column px-3 d-flex justify-content-center align-items-center shadow-lg rounded-3" style={{ width: '300px', height: '400px', }}>
            <h3 className="fw-bold">Disclaimer!!!!</h3>
            <p>Ini hanya untuk mencari informasi sebuah film saja bukan tempat nonton film nya ya. Terimakasih.</p>
         </div>
      </div>
      </>
    )
}

function App() {
  const [results, setResults] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentQuery, setCurrentQuery] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [modalImg, setModalImg] = useState('');
  const [modalYear, setModalYear] = useState('');
  const [modalDesk, setModalDesk] = useState('');
  const [VhDisp, setVhDisp] = useState('vh-100');

  const getFilm = (query, page) => {
    fetch(url + 's=' + query + '&page=' + page)
      .then(res => res.json())
      .then(data => {
        setTotalResults(data.totalResults);
        setResults(data.Search || []);
        setCurrentPage(page);
        setCurrentQuery(query);
        setVhDisp('')
      });
  };

  const handleSearch = (query, page) => {
    getFilm(query, page);
  };

  const handlePageChange = (page) => {
    getFilm(currentQuery, page);
  };

  const DetailFilm = (id) => {
      //alert(id)
       fetch(url + `i=${id}`)
       .then(res => res.json())
       .then(data => {
       // console.log(data)
    /*   const img = document.getElementById('img-details')
       const title = document.querySelector('.modal-title')
       const deskmini = document.querySelector('.modal-desk')
       const body = document.querySelector('.modal-body')
      // title.textContent = 'dd' 
      title.textContent = ''
         img.src = data.Poster;
         title.textContent = data.Title;
         deskmini.textContent = data.Year
         body.innerHTML = `
         <p>Released : ${data.Released}</p>
         <p>Duration : ${data.Runtime}</p>
         <p>Ratings : ${data.imdbRating}</p>
         <p>Genre : ${data.Genre}</p>
         <p>Director : ${data.Director}</p>
         <p>Writer : ${data.Writer}</p>
         <p>Plot : ${data.Plot}</p>
         <p>Bahasa : ${data.Language}</p>
         <p>Lokasi : ${data.Country}</p>
         <p>Awards : ${data.Awards}</p>
         `; */
         var deskFilm = `
         <p>Released : ${data.Released}</p>
         <p>Duration : ${data.Runtime}</p>
         <p>Ratings : ${data.imdbRating}</p>
         <p>Genre : ${data.Genre}</p>
         <p>Director : ${data.Director}</p>
         <p>Writer : ${data.Writer}</p>
         <p>Plot : ${data.Plot}</p>
         <p>Bahasa : ${data.Language}</p>
         <p>Lokasi : ${data.Country}</p>
         <p>Awards : ${data.Awards}</p>
         `;
         
         setModalImg(data.Poster);
         setModalTitle(data.Title);
         setModalYear(data.Year);
         setModalDesk(deskFilm);
       })
  };

  const totalPages = Math.ceil(totalResults / resultsPerPage);

  return (
    <>
      <Navbar />
      <SearchInput onSearch={handleSearch} />
      
      // Disclaimer
      <Disclaimer />
      
      // card
      <div id="display-body" className="mt-4">
        <div className={`w-100 ${VhDisp} contain-box px-3 d-flex justify-content-center flex-wrap`}>
          {results.map(movie => (
            <div key={movie.imdbID} className="mb-4 p-0">
              <div className="card p-0" style={{ background: 'black', color: 'white', width: '180px', height: '450px' }}>
                <img src={movie.Poster} className="card-img-top" alt="img" style={{ height: '280px' }} />
                <div className="card-body">
                  <h5 className="card-title">{movie.Title}</h5>
                  <p className="card-text">{movie.Year}</p>
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => DetailFilm(movie.imdbID)}
                  >
                    See details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {results.length > 0 && <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />}
      </div>
       
       // modals
      <div className="modal fade justify-content-center align-items-center vh-100" style={{ color: 'white' }} id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content" style={{ background: 'black', boxShadow: '0 0 5px rgba(225, 225, 225, .5)' }}>
            <div className="modal-header d-flex justify-content-center align-items-center flex-wrap gap-3" style={{ padding: '0', paddingTop: '10px' }}>
              <img src={modalImg} id="img-details" style={{ width: '100px' }} alt="" />
              <h1 className="modal-title fs-5 w-100 m-0 text-center" id="exampleModalLabel">{ modalTitle }</h1>
              <h1 className="modal-desk fs-5 w-100 m-0 text-center" id="exampleModalLabel" style={{ padding: '0' }}>{ modalYear }</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
             <div dangerouslySetInnerHTML={

                { __html: modalDesk }

             } />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
}

export default App;
