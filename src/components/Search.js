import React, { useState } from 'react'
import axios from 'axios'

const Search = () => {

    const [search, setSearch] = useState("");

    const options = {
        method: 'GET',
        url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch',
        params: {
            query: search,
        },
        headers: {
            'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
            'X-RapidAPI-Key': '0e3f16cb99msh0c45ed889f095e2p1db952jsn93820868190d'
          }
    }

    const submit = () => {
        axios.request(options).then(function (response) {
            console.log(response.data.results);
        }).catch(function (error) {
            console.error(error);
        });
    }

  return (
    <div>
        <input type="search" placeholder="Enter a meal..." value={search} onChange={(e) => setSearch(e.target.value)}/>
        <button onClick={submit}>Submit</button>
    </div>
  )
}

export default Search