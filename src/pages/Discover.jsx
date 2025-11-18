import { useEffect, useState } from "react";
import { moodgenremappings } from "../services/moodgenremappings";
import { DISCOVER_URL } from "../services/constants";
import MovieCard from "../components/MovieCard";
import { Link } from "react-router";

const Discover = () => {

  const apikey = process.env.PARCEL_API_ACCESS_TOKEN;

  const [vibe, setVibe] = useState("");
  const [genre, setGenre] = useState([]);
  const [sort, setSort] = useState("");
  const [genMovies,setGenMovies] = useState([]);

  useEffect(() => {
    handleDiscover();
  });

  const handleDiscover = async () => {
    const data = await fetch(`${DISCOVER_URL}sort_by=${sort}&with_genres=${genre.join(",")}`, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${apikey}`
      }
    })

    const json = await data.json();

    setGenMovies(json?.results);
  }

  const changeSort = (e) => {
    setSort(e.target.value);
  }


  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-2">Discover Movies</h1>
      <p className="text-gray-600 mb-6">Find films by mood, genre, and more.</p>

      {/* Filters Panel */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-8">

        {/* Mood Filters */}
        <div className="mb-4">
          <h2 className="font-semibold mb-2">Mood</h2>
          <div className="flex flex-wrap gap-2">
            {["Fun","Emotional","Romantic","Scary","Mindbending","Adventure","SciFi","Crime","Feelgood","TvMovie","Historical","War","Western"].map((mood) => (
              <button
                key={mood}
                className={`px-4 py-2 rounded-full border hover:bg-indigo-200 ${mood === vibe ? 'bg-indigo-200' :'bg-white'}`}
                onClick={() => {
                  setVibe(mood);
                  setGenre(moodgenremappings[mood]);
                }}
              >
                {mood}
              </button>
            ))}
          </div>
        </div>

        {/* Sort Filter */}
        <div>
            <label className="font-semibold block mb-1">Sort By</label>
            <select className="border p-2 rounded-lg" value={sort} onChange={changeSort}>
              <option value="">----Please Choose An Option----</option>
              <option value="popularity.desc">Popularity</option>
              <option value="vote_average.desc">Rating</option>
              <option value="primary_release_date.desc">Newest</option>
              <option value="primary_release_date.asc">Oldest</option>
            </select>
        </div>
      </div>
      {/* Movies Grid */}
      <div>
        <div className='flex flex-wrap mx-12'>
            {genMovies.map((movie) => (
                <Link
                    key={movie?.id}
                    to={"/movie/" + movie?.id}
                    >
                    <MovieCard key={movie?.id} data = {movie} />
                </Link>
            ))}
        
        </div>

      </div>
    </div>
  )
}

export default Discover;
