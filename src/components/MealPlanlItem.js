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
        <div>
            <img src={item.image} alt={item.title} />
            <h3>{item.title}</h3>
            <p>Calories: {nutrients.calories}cal Carbs: {nutrients.carbs} Fat: {nutrients.fat} Protein: {nutrients.protein}</p>
            <button onClick={removeMeal}>remove</button>
        </div>
    )
}

export default MealPlanItem