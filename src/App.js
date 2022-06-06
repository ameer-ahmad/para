import './App.css';
import Search from './components/Search';
import Meals from './components/Meals';
import MealPlan from './components/MealPlan'
import { MealsProvider } from './contexts/MealsContext'

function App() {
  return (
    <MealsProvider>
      <div className="container">
        <div className="mainContainer">
          <Search />
          <Meals />
        </div>
        <MealPlan />
      </div>
    </MealsProvider>
  );
}

export default App;
