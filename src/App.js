import './App.css';
import React, {useEffect,useState } from 'react';
function App() {
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function(postion){
      setLat(postion.coords.latitude);
      setLong(postion.coords.longitude);
    });

    fetch (`${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`)
    .then(res => res.json())
    .then(result =>{
      setData(result)
      console.log(data)
    })
  }, [lat, long]);
  
  function getWeather(){
    fetch (`${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`)
    .then(res => res.json())
    .then(result =>{
      setData(result)
      console.log(data)
    })
  }
  return (
    <>
      <div className="App">
      {(typeof data.main != 'undefined') ? (
        <div>
          <h1>CITY NAME: {data.name}</h1>
          <h1>TEMPERATURE: {data.main.temp}</h1>
          <h1>SUNRISE: {data.sys.sunrise}</h1>
          <h1>SUNSET: {data.sys.sunset}</h1>
          <h1>DESCRIPTION: {data.weather[0].description}</h1>
        </div>
      ): (
        <div>
          <button onClick={getWeather}>Submit</button>
        </div>
      )}
      </div>
    </>
  );
}

export default App;
