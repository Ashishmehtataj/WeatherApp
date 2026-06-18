import React, { useState } from 'react'
import axios from 'axios'
const Weather = () => {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState("");

    const handleCityChange = (event) => {
        setCity(event.target.value)
    }

    const fetchWeather = async () => {
        if (!city.trim()) {
            setError("Please enter a city name");
            setWeather(null);
            return;
        }

        try {
            const URL =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b2ccf23b08fff22241166077cbc4ba75&units=metric`;
            // const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

            const response = await axios.get(URL);

            setWeather(response.data);
            setError("");
        } catch (e) {
            setWeather(null);
            setError("City not found");
        }
    };

    const handleClick = () => {
        fetchWeather();
    }

    return (
        <div className='weather-container' style={{
            textAlign: "center"
        }}>
            <input type="text" placeholder='Enter City name' value={city} onChange={handleCityChange}
                style={{
                    width: "300px",
                    height: "39px",
                    fontSize: "26px",
                    borderRadius: "12px",
                    marginTop: "40px"
                }} />
            <br />
            <br />
            <button onClick={handleClick}
                style={{
                    height: "36px",
                    width: "160px",
                    borderRadius: "16px",
                    fontSize: "20px"
                }}>
                Get Weather</button>
            {error && (
                <p style={{
                    color: "red",
                    marginTop: "60px",
                    fontSize: "30px"
                }}>{error}</p>
            )}
            {weather &&
                <>
                    <div className='weather-info'>
                        <h2 style={{
                            marginTop: "20px",
                            fontSize: "20px"
                        }}>{weather.name}</h2>
                        <p style={{
                            marginTop: "20px",
                            fontSize: "20px"
                        }}>Temp is {weather.main.temp}</p>
                        <p style={{
                            marginTop: "20px",
                            fontSize: "20px"
                        }}>{weather.weather[0].description}</p>
                        <p style={{
                            marginTop: "20px",
                            fontSize: "20px"
                        }}>Wind speed : {weather.wind.speed}</p>
                    </div>
                </>
            }

        </div>
    )
}

export default Weather
