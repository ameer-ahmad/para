import './App.css';
import Search from './components/Search';
import Meals from './components/Meals';
import MealPlan from './components/MealPlan'
import { MealsProvider } from './contexts/MealsContext'

function App() {
  return (
    <MealsProvider>
      <Search />
      <Meals />
      <MealPlan />
    </MealsProvider>
  );
}

export default App;
