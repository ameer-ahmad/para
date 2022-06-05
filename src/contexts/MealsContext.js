import { createContext, useState } from 'react';

const MealsContext = createContext()

export const MealsProvider = ({children}) => {
    const [meals, setMeals] = useState([])
    const [mealType, setMealType] = useState('')

    return (
        <MealsContext.Provider value={{meals, setMeals, mealType, setMealType}} >
            {children}
        </MealsContext.Provider>
    )
}

export default MealsContext;