import React, { useContext } from 'react'
import MealsContext from '../contexts/MealsContext'

const MealPlanItem = ({item, id, nutrients}) => {

    const {mealPlanNutrients, setMealPlanNutrients, mealPlan, setMealPlan, setMealPlanTotalNutrients, mealPlanTotalNutrients} = useContext(MealsContext);

    const removeMeal = () => {
        if (mealPlan.length === 1) {
            setMealPlan([])
        } else {
            let temps = mealPlan.filter((temp, index) => {
                return index !== id
            })
            setMealPlan(temps)
        }
        
        setMealPlanTotalNutrients({
            calories: mealPlanTotalNutrients.calories -= nutrients.calories,
            carbs: mealPlanTotalNutrients.carbs -= nutrients.carbs,
            fat: mealPlanTotalNutrients.fat -= nutrients.fat,
            protein: mealPlanTotalNutrients.protein -= nutrients.protein,
        })
        if (mealPlanNutrients.length === 1) {
            setMealPlanNutrients([])
        } else {
            let temps = mealPlanNutrients.filter((temp, index) => {
                return index !== id
            })
            setMealPlanNutrients(temps)
        }
    }
    
    return(
        <div className="mealPlanItemContainer">
            <div className="mealPlanImageContainer">
                <img className="mealPlanImage" src={item.image} alt={item.title} />
            </div>
            <h3 className="mealPlanTitle">{item.title}</h3>
            <div className="mealNutrientsContainer">
                    <span className="mealNutrients calories">{nutrients.calories} cal</span>
                    <span className="mealNutrients carbs">{nutrients.carbs} carbs</span>
                    <span className="mealNutrients fat">{nutrients.fat} fat</span>
                    <span className="mealNutrients protein">{nutrients.protein} protein</span>
                </div>
            <button className="removeBtn" onClick={removeMeal}>-</button>
        </div>
    )
}

export default MealPlanItem