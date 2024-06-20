import { useContext, useEffect } from "react";
import { CityContext } from "../Context.js";
import cities from "../other/cities.js";

function SelectCity() {

  const { selectedCity, setSelectedCity } = useContext(CityContext);

  useEffect(
    () => {
      if ("geolocation" in navigator) {
        const success = (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          fetch(`http://api.geonames.org/findNearbyPlaceNameJSON?lat=${lat}&lng=${lng}&username=cemcelikgn`)
            .then(response => response.json())
            .then(data => {
              const city = cities.find(city => city.id === data.geonames[0].adminCode1);
              setSelectedCity(city.id)
            })
        };
        const error = (err) => {
          console.warn(`ERROR(${err.code}): ${err.message}`);
        };
        navigator.geolocation.getCurrentPosition(success, error);
      };
    },
    []
  );

  const handleCityChange = (event) => {
    const city = cities.find(city => city.id === event.target.value);
    setSelectedCity(city.id);
  };

  return (
  <div>
    <select
      id="cities"
      value={selectedCity}
      onChange={handleCityChange}
    >
      {cities.map(city =>
      <option value={city.id} key={city.id}>{city.name}</option>
      )}
    </select>
  </div>
  );
};

export default SelectCity;
