import React, { useContext } from 'react';
import MealsContext from '../contexts/MealsContext';
import Meal from './Meal';

const Meals = () => {
    const {meals} = useContext(MealsContext)

    return (
        <div>
            {meals.map((meal, pos) => (
                <Meal meal={meal} key={pos} />
            ))}
        </div>
    )
}

export default Meals;