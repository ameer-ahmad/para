import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import MealsContext from '../contexts/MealsContext'
import logo from '../images/logo.png'

const Search = () => {

    const [search, setSearch] = useState("");
    const {mealType, setMealType} = useContext(MealsContext)
    const {setMeals, setMealPlanTotalNutrients} = useContext(MealsContext);

    useEffect(() => {
        setMealType('recipes')
        setMealPlanTotalNutrients({
            calories: 0,
            carbs: 0,
            fat: 0,
            protein: 0,
        })
    }, [])


    const submit = () => {
        if (mealType === 'recipes') {
            displayRecipes()
        } else if (mealType === 'products') {
            displayProducts()
        } else if (mealType === 'menuItems') {
            displayMenuItems()
        }
    }

    const displayRecipes = () => {
        const options = {
            method: 'GET',
            url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch',
            params: {
              query: search,
            },
            headers: {
              'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
              'X-RapidAPI-Key': process.env.REACT_APP_API_KEY
            }
        };
        
        axios.request(options).then(function (response) {
            for (let i = 0; i < response.data.results.length; i++) {
                response.data.results[i].mealType = mealType;
            }
            setMeals(response.data.results);
        }).catch(function (error) {
            console.error(error);
        });
    }

    const displayProducts = () => {
        const options = {
            method: 'GET',
            url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/products/search',
            params: {
              query: search,
            },
            headers: {
              'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
              'X-RapidAPI-Key': '0e3f16cb99msh0c45ed889f095e2p1db952jsn93820868190d'
            }
          };
          
        axios.request(options).then(function (response) {
            for (let i = 0; i < response.data.products.length; i++) {
                response.data.products[i].mealType = mealType;
            }
            setMeals(response.data.products)
        }).catch(function (error) {
            console.error(error);
        });
    }

    const displayMenuItems = () => {
        const options = {
            method: 'GET',
            url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/menuItems/search',
            params: {
              query: search,
            },
            headers: {
              'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
              'X-RapidAPI-Key': '0e3f16cb99msh0c45ed889f095e2p1db952jsn93820868190d'
            }
          };
          
        axios.request(options).then(function (response) {
            for (let i = 0; i < response.data.menuItems.length; i++) {
                response.data.menuItems[i].mealType = mealType;
            }
            setMeals(response.data.menuItems)
        }).catch(function (error) {
            console.error(error);
        });
    }

  return (
    <div className="searchContainer">
        <img src={logo} alt="logo" className="searchLogo" />
        <input className="searchInput" type="search" placeholder="Enter a meal..." value={search} onChange={(e) => setSearch(e.target.value)}/>
        <select className="searchSelect" name="meals" id="meals" onChange={(e) => setMealType(e.target.value)}>
            <option value="recipes">Recipes</option>
            <option value="products">Products</option>
            <option value="menuItems">Menu Items</option>
        </select>
        <button className="searchBtn" onClick={submit}>Search</button>
    </div>
  )
}

export default Search