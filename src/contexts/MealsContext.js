import { createContext, useState } from 'react';

const MealsContext = createContext()

export const MealsProvider = ({children}) => {
    const [meals, setMeals] = useState([])

    return (
        <MealsContext.Provider value={{meals, setMeals}} >
            {children}
        </MealsContext.Provider>
    )
}

export default MealsContext;