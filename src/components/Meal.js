import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import MealsContext from '../contexts/MealsContext'

const Meal = ({meal}) => {

    const [nutrients, setNutrients] = useState({});
    const {meals} = useContext(MealsContext);

    useEffect(() => {
        if (meal.mealType === 'recipes') {
            recipeNutrients()
            console.log('test')
        } else if (meal.mealType === 'products') {
            productNutrients()
        } else if (meal.mealType === 'menuItems') {
            menuItemNutrients()
        }
    }, [meals])

    const recipeNutrients = () => {
        const options = {
            method: 'GET',
            url: `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${meal.id}/nutritionWidget.json`,
            headers: {
              'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
              'X-RapidAPI-Key': '0e3f16cb99msh0c45ed889f095e2p1db952jsn93820868190d'
            }
        };

        axios.request(options).then(function (response) {
            setNutrients({
                calories: response.data.calories,
                carbs: response.data.carbs,
                fat: response.data.fat,
                protein: response.data.protein,
            })
        }).catch(function (error) {
            console.error(error);
        });
    }

    const productNutrients = () => {
        const options = {
            method: 'GET',
            url: `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/products/${meal.id}`,
            headers: {
              'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
              'X-RapidAPI-Key': '0e3f16cb99msh0c45ed889f095e2p1db952jsn93820868190d'
            }
          };
          
          axios.request(options).then(function (response) {
              console.log(response.data);
              setNutrients({
                calories: response.data.nutrition.calories,
                carbs: response.data.nutrition.carbs,
                fat: response.data.nutrition.fat,
                protein: response.data.nutrition.protein,
            })
          }).catch(function (error) {
              console.error(error);
          });
    }

    const menuItemNutrients = () => {
        const options = {
            method: 'GET',
            url: `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/menuItems/${meal.id}`,
            headers: {
              'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
              'X-RapidAPI-Key': '0e3f16cb99msh0c45ed889f095e2p1db952jsn93820868190d'
            }
          };
          
          axios.request(options).then(function (response) {
              console.log(response.data);
              setNutrients({
                calories: response.data.nutrition.calories,
                carbs: response.data.nutrition.carbs,
                fat: response.data.nutrition.fat,
                protein: response.data.nutrition.protein,
            })
          }).catch(function (error) {
              console.error(error);
          });
    }


    return (
        <div>
            <img src={meal.image} alt={meal.title} />
            <h3>{meal.title}</h3>
            <p>Calories: {nutrients.calories}cal Carbs: {nutrients.carbs} Fat: {nutrients.fat} Proteins: {nutrients.protein}</p>
        </div>
    )
}

export default Meal;