import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Modal = ({meal, setModalIsOpen}) => {

    const [recipes, setRecipes] = useState(false)
    const [products, setProducts] = useState(false)
    const [menuItems, setMenuItems] = useState(false)
    const [info, setInfo] = useState({})
    const [ingredients, setIngredients] = useState([])

    useEffect(() => {
        if (meal.mealType === 'recipes') {
            setRecipes(true)
            recipeInfo()
        } else if (meal.mealType === 'products') {
            setProducts(true)
        } else if (meal.mealType === 'menuItems') {
            setMenuItems(true)
        }
    }, [])

    
    const recipeInfo = () => {
        const options = {
            method: 'GET',
            url: `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${meal.id}/information`,
            headers: {
              'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
              'X-RapidAPI-Key': '0e3f16cb99msh0c45ed889f095e2p1db952jsn93820868190d'
            }
          };
          
          axios.request(options).then(function (response) {
              setInfo(response.data)
              setIngredients(response.data.extendedIngredients)
              console.log(response.data);
              console.log(response.data.extendedIngredients)
          }).catch(function (error) {
              console.error(error);
          });
    }

    // const productNutrients = () => {
    //     const options = {
    //         method: 'GET',
    //         url: `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/products/${meal.id}`,
    //         headers: {
    //           'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
    //           'X-RapidAPI-Key': '0e3f16cb99msh0c45ed889f095e2p1db952jsn93820868190d'
    //         }
    //       };
          
    //       axios.request(options).then(function (response) {
    //           setNutrients({
    //             calories: response.data.nutrition.calories,
    //             carbs: parseInt(response.data.nutrition.carbs.slice(0, -1)),
    //             fat: parseInt(response.data.nutrition.fat.slice(0, -1)),
    //             protein: parseInt(response.data.nutrition.protein.slice(0, -1)),
    //         })
    //       }).catch(function (error) {
    //           console.error(error);
    //       });
    // }

    // const menuItemNutrients = () => {
    //     const options = {
    //         method: 'GET',
    //         url: `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/menuItems/${meal.id}`,
    //         headers: {
    //           'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
    //           'X-RapidAPI-Key': '0e3f16cb99msh0c45ed889f095e2p1db952jsn93820868190d'
    //         }
    //       };
    // }
    
    return (
        <div className="modalContainer" onClick={() => {setModalIsOpen(false)}}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                {recipes ? (
                    <>
                        <img src={info.image} alt={info.title} />
                        <h3>{info.title}</h3>
                        <h4>{info.sourceName}</h4>
                        <a href={info.sourceUrl} target="_blank" rel="noreferrer">Check out the recipe!</a>
                        <p dangerouslySetInnerHTML={{__html: info.summary}}></p>
                        <p>Recipe: </p>
                        <button onClick={() => {setModalIsOpen(false)}}>Close</button>
                    </>
                ) : null}
            </div>
        </div>
    )
}


export default Modal;