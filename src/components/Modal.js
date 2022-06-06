import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Modal = ({meal, setModalIsOpen}) => {

    const [recipes, setRecipes] = useState(false)
    const [info, setInfo] = useState({})
    const [ingredients, setIngredients] = useState([])
    const [nutrients, setNutrients] = useState([])


    useEffect(() => {
        if (meal.mealType === 'recipes') {
            setRecipes(true)
            recipeInfo()
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

          const options2 = {
            method: 'GET',
            url: `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${meal.id}/nutritionWidget.json`,
            headers: {
              'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
              'X-RapidAPI-Key': '0e3f16cb99msh0c45ed889f095e2p1db952jsn93820868190d'
            }
        };

        axios.request(options2).then(function (response) {
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

    return (
        <div className="modalContainer" onClick={() => {setModalIsOpen(false)}}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                {recipes ? (
                    <>  
                        <div className="modalAlignImageBtn">
                            <div className="modalImageContainer">
                                <img className="modalImage" src={info.image} alt={info.title} />
                            </div>
                            <a href={info.sourceUrl} target="_blank" rel="noreferrer"><div className="sourceLink">Source</div></a>
                        </div>
                        <div className="modalAlign">
                            <div>
                                <h3 className="modalTitle">{info.title}</h3>
                                <h4 className="modalSource" >{info.sourceName}</h4>
                            </div>
                            <div className="mealNutrientsContainer">
                                <span className="mealNutrients calories">{nutrients.calories} cal</span>
                                <span className="mealNutrients carbs">{nutrients.carbs} carbs</span>
                                <span className="mealNutrients fat">{nutrients.fat} fat</span>
                                <span className="mealNutrients protein">{nutrients.protein} protein</span>
                            </div>
                        </div>
                        <h5 className="modalDesc">Description</h5>
                        <p className="modalSummary" dangerouslySetInnerHTML={{__html: info.summary}}></p>
                        <button className="closeModal" onClick={() => {setModalIsOpen(false)}}>x</button>
                    </>
                ) : null}
            </div>
        </div>
    )
}


export default Modal;