import React, { useEffect, useState, useCallback } from "react";
import Descriptions from "./components/Descriptions";
import WeatherDisplay from "./components/WeatherDisplay";
import CityInput from "./components/CityInput";
import { getFormattedWeatherData } from "./weatherService";
import hotBg from "./assets/hotBg.jpg";
import warmBg from "./assets/warmBg.jpg";
import coolBg from "./assets/coolBg.jpg";
import coldBg from "./assets/coldBg.jpg";

const temperatureThresholds = {
  hot: { metric: 35, imperial: 95 },
  warm: { metric: 25, imperial: 77 },
  cool: { metric: 5, imperial: 41 },
};

const App = () => {
  const [city, setCity] = useState("Mumbai");
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState("metric");
  const [bg, setBg] = useState();

  const fetchWeatherData = useCallback(async () => {
    try {
      const data = await getFormattedWeatherData(city, units);
      setWeather(data);

      const temperatureType =
        data.temp >= temperatureThresholds.hot[units]
          ? "hot"
          : data.temp >= temperatureThresholds.warm[units]
          ? "warm"
          : data.temp >= temperatureThresholds.cool[units]
          ? "cool"
          : "cold";

      const bgImages = {
        hot: hotBg,
        warm: warmBg,
        cool: coolBg,
        cold: coldBg,
      };

      setBg(bgImages[temperatureType]);
    } catch (err) {
      alert("Enter a valid city name");
    }
  }, [city, units]);

  useEffect(() => {
    fetchWeatherData();
  }, [fetchWeatherData]);

  const handleCity = (e) => {
    if (e.keyCode === 13) {
      setCity(e.currentTarget.value);
      e.currentTarget.blur();
    }
  };

  const handleUnits = useCallback(() => {
    setUnits((prevUnits) => (prevUnits === "metric" ? "imperial" : "metric"));
  }, []);

  return (
    <div>
      <h1 className="heading" style={{ textAlign: "center"}}>"Reactive Skies: Exploring Weather with React"</h1>  
      <div className="App" style={{ backgroundImage: `url(${bg})` }}>
        <div className="overlay">
          {weather && (
              <div className="container">
                <CityInput handleCity={handleCity} handleUnits={handleUnits} />
                <WeatherDisplay weather={weather} units={units} />
                <Descriptions weather={weather} units={units} />
              </div>
            )}
        </div>
      </div>
      <p className="footer" style={{ textAlign: "center" }}>
        Project @Dipti Sanap
      </p>
    </div >
  );
};

export default App;

