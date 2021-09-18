import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import Photo from "./Photo";
// bdYMjNW7irDyiU1b-JSWAmKbO-Tc95LPfalAO_9QG2I
// const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`
const clientID = `?client_id=bdYMjNW7irDyiU1b-JSWAmKbO-Tc95LPfalAO_9QG2I`;
const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;

function App() {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState(false);
  /// fetchAPI images and useEffect
  useEffect(() => {
    fetchImages();
  }, [page, search]);
  // infinite scroll, page calculation on
  useEffect(() => {
    const event = window.addEventListener("scroll", () => {
      if (
        (!loading && window.scrollY + window.innerHeight) >=
        document.body.scrollHeight - 10
      ) {
        setPage((currentPage) => {
          return currentPage + 1;
        });
      }
    });
    return () => window.removeEventListener("scroll", event);
  }, []);

  // form handler
  const handleSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    fetchImages();
    setSearch(!search);
  };

  const fetchImages = async () => {
    setLoading(true);
    let url; //this will change later
    const urlQuery = `&query=${query}`; // form term
    const urlPage = `&page=${page}`;
    // if query is there change the url, else keep the same
    if (query) {
      url = `${searchUrl}${clientID}${urlPage}${urlQuery}`;
    } else {
      url = `${mainUrl}${clientID}${urlPage}`;
    }

    try {
      const resp = await fetch(url);
      const data = await resp.json();
      setQuery("");

      setPhotos((photos) => {
        if (query && page === 1) return data.results;
        else if (query) {
          return [...photos, ...data.results];
        } else {
          return [...photos, ...data];
        } //the objects also mystified, removed the object
      });
      // setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <main>
      <h2 className="loading">Image <span style={{color:'red'}}>Stack</span> </h2>
      <section className="search">
        <form className="search-form">
          <input
            type="text"
            placeholder="search"
            className="form-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={handleSubmit} type="submit" className="submit-btn">
            <FaSearch />
          </button>
        </form>
      </section>
      <section className="photos">
        <div className="photos-center">
          {photos.map((images) => {
            return <Photo key={images.id} {...images} />;
            /* destructured */
          })}
        </div>
        {loading && <h2 className="loading">Loading...</h2>}
      </section>
      <footer className='loading'> By N Venkatesh Kamath</footer>
    </main>
  );
}

export default App;
