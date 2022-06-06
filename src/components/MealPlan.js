import React, { useContext } from 'react';
import MealsContext from '../contexts/MealsContext'
import MealPlanItem from './MealPlanlItem'
import mealPlanLogo from '../images/mealPlanLogo.png'

const MealPlan = () => {

    const {mealPlan, setMealPlan, mealPlanTotalNutrients, setMealPlanTotalNutrients, mealPlanNutrients, setMealPlanNutrients} = useContext(MealsContext);

    return (
        <div className="mealPlanContainer">
            <img src={mealPlanLogo} alt="para planner" />
            <div className="summaryContainer">
                <p className="mealPlanSummary">Summary of <strong>{mealPlan.length} item(s)</strong></p>
                <button className="clearAll" onClick={() => {
                    setMealPlan([])
                    setMealPlanNutrients([])
                    setMealPlanTotalNutrients({
                        calories: 0,
                        carbs: 0,
                        fat: 0,
                        protein: 0,
                    })
                    }}>x</button>
            </div>
            <div className="mealNutrientsContainer">
                    <span className="mealNutrients calories">{mealPlanTotalNutrients.calories} cal</span>
                    <span className="mealNutrients carbs">{mealPlanTotalNutrients.carbs} carbs</span>
                    <span className="mealNutrients fat">{mealPlanTotalNutrients.fat} fat</span>
                    <span className="mealNutrients protein">{mealPlanTotalNutrients.protein} protein</span>
                </div>
            {mealPlan.map((item, pos) => (
                <MealPlanItem item={item} key={pos} id={pos} nutrients={mealPlanNutrients[pos]} />
            ))}
        </div>
    )
}

export default MealPlan