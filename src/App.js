import './css/App.css';
import CityProvider from './contexts/CityContext.js';
import SelectCity from './components/SelectCity.js';
import WeatherForecast from './components/WeatherForecast.js';

function App() {

  return (
    <div className='container'>
      <header>
        <h1>Hava Tahmini</h1>
      </header>
      <main>
        <CityProvider>
          <SelectCity />
          <WeatherForecast />
        </CityProvider>
      </main>
    </div>
  );
};

export default App;
