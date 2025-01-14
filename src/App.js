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
          backgroundColor: "#0054AE",
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
          backgroundColor: "#AE0303 ",
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
            <strong>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="16"
                fill="currentColor"
                class="bi bi-thermometer-low"
                viewBox="0 0 16 16"
              >
                <path d="M9.5 12.5a1.5 1.5 0 1 1-2-1.415V9.5a.5.5 0 0 1 1 0v1.585a1.5 1.5 0 0 1 1 1.415" />
                <path d="M5.5 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0zM8 1a1.5 1.5 0 0 0-1.5 1.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0l-.166-.15V2.5A1.5 1.5 0 0 0 8 1" />
              </svg>
              Temperatura:
            </strong>{" "}
            {weather.main.temp}°C
          </p>
          <p>
            <strong>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="16"
                fill="currentColor"
                class="bi bi-card-heading"
                viewBox="0 0 16 16"
              >
                <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z" />
                <path d="M3 8.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5m0-5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5z" />
              </svg>
              Descrição:
            </strong>{" "}
            {weather.weather[0].description}
          </p>
          <p>
            <strong>
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="16"
                fill="currentColor"
                class="bi bi-moisture"
                viewBox="0 0  16"
              >
                <path d="M13.5 0a.5.5 0 0 0 0 1H15v2.75h-.5a.5.5 0 0 0 0 1h.5V7.5h-1.5a.5.5 0 0 0 0 1H15v2.75h-.5a.5.5 0 0 0 0 1h.5V15h-1.5a.5.5 0 0 0 0 1h2a.5.5 0 0 0 .5-.5V.5a.5.5 0 0 0-.5-.5zM7 1.5l.364-.343a.5.5 0 0 0-.728 0l-.002.002-.006.007-.022.023-.08.088a29 29 0 0 0-1.274 1.517c-.769.983-1.714 2.325-2.385 3.727C2.368 7.564 2 8.682 2 9.733 2 12.614 4.212 15 7 15s5-2.386 5-5.267c0-1.05-.368-2.169-.867-3.212-.671-1.402-1.616-2.744-2.385-3.727a29 29 0 0 0-1.354-1.605l-.022-.023-.006-.007-.002-.001zm0 0-.364-.343zm-.016.766L7 2.247l.016.019c.24.274.572.667.944 1.144.611.781 1.32 1.776 1.901 2.827H4.14c.58-1.051 1.29-2.046 1.9-2.827.373-.477.706-.87.945-1.144zM3 9.733c0-.755.244-1.612.638-2.496h6.724c.395.884.638 1.741.638 2.496C11 12.117 9.182 14 7 14s-4-1.883-4-4.267" />
              </svg>
              Umidade:
            </strong>{" "}
            {weather.main.humidity}%
          </p>
          <p>
            <strong>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="16"
                fill="currentColor"
                class="bi bi-wind"
                viewBox="0 0 16 16"
              >
                <path d="M12.5 2A2.5 2.5 0 0 0 10 4.5a.5.5 0 0 1-1 0A3.5 3.5 0 1 1 12.5 8H.5a.5.5 0 0 1 0-1h12a2.5 2.5 0 0 0 0-5m-7 1a1 1 0 0 0-1 1 .5.5 0 0 1-1 0 2 2 0 1 1 2 2h-5a.5.5 0 0 1 0-1h5a1 1 0 0 0 0-2M0 9.5A.5.5 0 0 1 .5 9h10.042a3 3 0 1 1-3 3 .5.5 0 0 1 1 0 2 2 0 1 0 2-2H.5a.5.5 0 0 1-.5-.5" />
              </svg>
              Vento:
            </strong>{" "}
            {weather.wind.speed} km/h
          </p>
        </div>
      )}
    </div>
  );
};

export default App;
