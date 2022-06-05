import React, { useContext } from 'react';
import MealsContext from '../contexts/MealsContext'
import MealPlanItem from './MealPlanlItem'

const MealPlan = () => {

    const {mealPlan, mealPlanTotalNutrients} = useContext(MealsContext);

    return (
        <div>
            <h2>My Meal Plan</h2>
            <p>{mealPlanTotalNutrients.calories} Calories</p>
            <p>{mealPlanTotalNutrients.carbs} Carbs {mealPlanTotalNutrients.fat} Fat {mealPlanTotalNutrients.protein} Protein</p>
            {mealPlan.map((item, pos) => (
                <MealPlanItem item={item} key={pos} />
            ))}
        </div>
    )
}

export default MealPlan