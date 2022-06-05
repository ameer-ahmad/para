import React from 'react'

const MealPlanItem = ({item}) => {
    console.log(item)
    return(
        <div>{item.title}</div>
    )
}

export default MealPlanItem