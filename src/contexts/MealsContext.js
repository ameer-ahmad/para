import { createContext, useState } from 'react';

const MealsContext = createContext()

export const MealsProvider = ({children}) => {
    const [meals, setMeals] = useState([])
    const [mealType, setMealType] = useState('')
    const [mealPlan, setMealPlan] = useState([])
    const [mealPlanTotalNutrients, setMealPlanTotalNutrients] = useState({});

    return (
        <MealsContext.Provider value={{meals, setMeals, mealType, setMealType, mealPlan, setMealPlan, mealPlanTotalNutrients, setMealPlanTotalNutrients}} >
            {children}
        </MealsContext.Provider>
    )
}

export default MealsContext;