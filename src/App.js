import HomePage from './pages/homepage/homepage.component.jsx';
import { Switch, Route } from 'react-router-dom';
import './App.css';
// import ShopPage from './pages/homepage'


const HatsPage = () => (
  <div>
    <h1>HATS PAGE</h1>
  </div>
)

function App() {
  return (
    <div>
      <Switch>
        {/* 設path='/' 就是設定首頁的初始頁面 */}
        <Route exact path='/' component={HomePage} />
        <Route path='/hats' component={HatsPage} />
      </Switch>
    </div>
  );
}

export default App;
