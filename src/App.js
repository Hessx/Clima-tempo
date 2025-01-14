import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";

const App = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const apiKey = "557f0754d36441329ca4539b4de8ab36";
  const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

  const fetchWeather = async () => {
    if (!city) {
      setError("Por favor, insira o nome de uma cidade!");
      return;
    }

    try {
      const response = await fetch(
        `${apiUrl}?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`
      );
      const data = await response.json();

      if (response.ok) {
        setWeather(data);
        setError("");
      } else {
        setError(data.message || "Erro ao buscar o clima.");
        setWeather(null);
      }
    } catch (err) {
      setError("Erro ao conectar com o servidor.");
      setWeather(null);
    }
  };

  const clearCity = () => {
    setCity("");
    setWeather(null);
    setError("");
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <h1>Clima Tempo</h1>
      <input
        type="text"
        placeholder="Digite o nome da cidade"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={{
          padding: "10px",
          fontSize: "16px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          marginRight: "10px",
        }}
      />
      <button
        onClick={fetchWeather}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          borderRadius: "5px",
          border: "none",
          backgroundColor: "#007BFF",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        Buscar Clima
      </button>
      <button
        onClick={clearCity}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          borderRadius: "5px",
          border: "none",
          backgroundColor: "#FF4D4D",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        Limpar
      </button>

      {error && <p style={{ color: "red", marginTop: "20px" }}>{error}</p>}

      {weather && (
        <div
          style={{
            marginTop: "20px",
            textAlign: "center",
            marginTop: "30px",
          }}
        >
          <h2>
            {weather.name}, {weather.sys.country}
          </h2>
          <p>
            <strong>Temperatura:</strong> {weather.main.temp}°C
          </p>
          <p>
            <strong>Descrição:</strong> {weather.weather[0].description}
          </p>
          <p>
            <strong>Umidade:</strong> {weather.main.humidity}%
          </p>
          <p>
            <strong>Vento:</strong> {weather.wind.speed} km/h
          </p>
        </div>
      )}
    </div>
  );
};

export default App;
