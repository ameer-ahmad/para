import React, { useContext } from 'react';
import MealsContext from '../contexts/MealsContext';

const Meals = () => {
    const {meals} = useContext(MealsContext)

    return (
        <div>Meals</div>
    )
}

export default Meals;