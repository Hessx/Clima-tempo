import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import cidades from "./100cidades";

const App = () => {
  const [city, setCity] = useState(null); // Alterando para armazenar o objeto completo da cidade
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const apiKey = "557f0754d36441329ca4539b4de8ab36";
  const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href =
    "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap";

  const fetchWeather = async () => {
    if (!city) {
      setError("Por favor, insira o nome de uma cidade!");
      return;
    }

    try {
      const response = await fetch(
        `${apiUrl}?q=${city.label}&appid=${apiKey}&units=metric&lang=pt_br` // Usando city.label para passar o nome da cidade
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
    setCity(null);
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

      <Autocomplete
        disablePortal
        options={cidades}
        variant="outlined"
        getOptionLabel={(option) => option.label} // Garantir que o Autocomplete mostre o label correto
        sx={{
          width: 300,
          display: "block",
          justifyContent: "center",
          marginLeft: "auto",
          marginRight: "auto",
          alignItems: "center",
          textAlign: "center",
          marginBottom: "20px",
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Escolha sua Cidade"
            variant="outlined"
            sx={{
              margin: "auto",
              width: "100%",
              borderRadius: "8px",
              textAlign: "center",
              backgroundColor: "transparent",
              boxShadow: "none",
              "& .MuiInputBase-root": {
                color: "#fff",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#fff",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#fff",
              },
              "& .MuiFormLabel-root": {
                color: "#fff",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#fff",
              },
            }}
          />
        )}
        value={city}
        onChange={(e, newValue) => setCity(newValue)}
      />

      <button
        onClick={fetchWeather}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          borderRadius: "5px",
          border: "none",
          backgroundColor: "#007BFF",
          color: "#e6e5e5",
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
          color: "#e6e5e5",
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
            color: "#e6e5e5",
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
