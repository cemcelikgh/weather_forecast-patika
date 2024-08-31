import { useContext, useState, useEffect } from "react";
import { CityContext } from "../contexts/CityContext.js";
import plantPreloader from '../other/plant-preloader.gif';
import cities from "../other/cities.js"
import '../css/weather-icons.css';

function WeatherForecast() {

  const { selectedCity } = useContext(CityContext);

  const [ weatherData, setWeatherData ] = useState([]);
  const [ days, setDays ] = useState([]);
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`https://api.tomorrow.io/v4/weather/forecast?location=${cities.find(city => city.id === selectedCity).name}}&timesteps=1d&units=metric&apikey=pngbGz0Ku8gfo7JQy8ZBErLWGvvolX4m`)
      .then(response => response.json())
      .then(data => {
        setWeatherData(data.timelines.daily);
        setDays(sixDays());
        setLoading(false);
      })
      .catch(error => {
        console.error('Hava tahmînî alınamadı: ', error)
        setLoading(false);
      });
  }, [selectedCity] );

  const sixDays = () => {
    const days = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
    const todayIndex = new Date().getDay();
    const sixDays = [];
    for (let i = 0; i < 6; i++) {
      sixDays.push(days[(todayIndex + i) % 7]);
    };
    return sixDays;
  };

  return (
    <section>
      {loading &&
      <div className='preloader'>
        <img src={plantPreloader} alt='Yükleniyor...'></img>
      </div>
      }
      {!loading &&
      <ul className="wc-list">
        {weatherData.map((day, index) => (
        <li key={index}>
          <p>{days[index]}</p>
          <div className={`wc${day.values.weatherCodeMin}`}></div>
          <div className="temperatures">
            <div>{parseInt(day.values.temperatureMin)}&#176;</div>
            <div>{parseInt(day.values.temperatureMax)}&#176;</div>
          </div>
        </li>
        ))}
      </ul>
      }
    </section>
  );
};

export default WeatherForecast;
