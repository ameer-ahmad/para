import './App.css';
import Search from './components/Search';
import Meals from './components/Meals';
import { MealsProvider } from './contexts/MealsContext'

function App() {
  return (
    <MealsProvider>
      <Search />
      <Meals />
    </MealsProvider>
  );
}

export default App;
