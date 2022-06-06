import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import MealsContext from '../contexts/MealsContext'
import Modal from './Modal'

const Meal = ({meal}) => {

    const [nutrients, setNutrients] = useState({});
    const {meals, setMealPlan, mealPlan, setMealPlanTotalNutrients, mealPlanTotalNutrients, setMealPlanNutrients, mealPlanNutrients} = useContext(MealsContext);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        if (meal.mealType === 'recipes') {
            recipeNutrients()
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
                calories: parseInt(response.data.calories.slice(0, -1)),
                carbs: parseInt(response.data.carbs.slice(0, -1)),
                fat: parseInt(response.data.fat.slice(0, -1)),
                protein: parseInt(response.data.protein.slice(0, -1)),
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
              setNutrients({
                calories: response.data.nutrition.calories,
                carbs: parseInt(response.data.nutrition.carbs.slice(0, -1)),
                fat: parseInt(response.data.nutrition.fat.slice(0, -1)),
                protein: parseInt(response.data.nutrition.protein.slice(0, -1)),
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
              setNutrients({
                calories: response.data.nutrition.calories,
                carbs: parseInt(response.data.nutrition.carbs.slice(0, -1)),
                fat: parseInt(response.data.nutrition.fat.slice(0, -1)),
                protein: parseInt(response.data.nutrition.protein.slice(0, -1)),
            })
          }).catch(function (error) {
              console.error(error);
          });
    }

    const addMealPlan = () => {
        setMealPlan([...mealPlan, meal])
        setMealPlanTotalNutrients({
            calories: mealPlanTotalNutrients.calories += nutrients.calories,
            carbs: mealPlanTotalNutrients.carbs += nutrients.carbs,
            fat: mealPlanTotalNutrients.fat += nutrients.fat,
            protein: mealPlanTotalNutrients.protein += nutrients.protein,
        })
        setMealPlanNutrients([...mealPlanNutrients, {
            calories: nutrients.calories,
            carbs: nutrients.carbs,
            fat: nutrients.fat,
            protein: nutrients.protein
        }])

    }


    return (
        <>
            <div className="mealContainer" onClick={() => setModalIsOpen(true)}>
                <div className="mealImageContainer">
                    <img className="mealImage" src={meal.image} alt={meal.title} />
                </div>
                <h3 className="mealTitle">{meal.title}</h3>
                <div className="mealNutrientsContainer">
                    <span className="mealNutrients calories">{nutrients.calories} cal</span>
                    <span className="mealNutrients carbs">{nutrients.carbs} carbs</span>
                    <span className="mealNutrients fat">{nutrients.fat} fat</span>
                    <span className="mealNutrients protein">{nutrients.protein} protein</span>
                </div>
                <button className="addBtn" onClick={(e) => {
                    e.stopPropagation()
                    addMealPlan()
                }}>+</button>
            </div>
            {modalIsOpen ? (
                <Modal meal={meal} setModalIsOpen={setModalIsOpen} />
            ) : null}
        </>
    )
}

export default Meal;