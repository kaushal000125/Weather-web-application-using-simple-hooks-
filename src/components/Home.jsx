import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import axios from "axios";
import cities from "../Data/in.json";
import SingleCardComponents from "./SingleCardComponent";
import Humidity from "./Humidity";

const Home = () => {
  const [city, setCity] = useState({
    city: "Jaipur",
    lat: "26.9167",
    lng: "75.8667",
    country: "India",
    iso2: "IN",
    admin_name: "Rājasthān",
    capital: "admin",
    population: "3073350",
    population_proper: "3073350",
  });
  const [current, setCurrent] = useState("");
  const [daily, setDaily] = useState("");
  const [selectedCard, setSelectedCard] = useState(0);
  //const [dayIdx, setDayIdx] = useState();

  const WEEKDAYS = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const weekdayIndex = current ? dayjs.unix(current.dt).day() : 0;

  const handleChange = (e) => {
    const selectedCity = cities.filter(
      (city) => city.city === e.target.value
    )[0];
    //console.log("selctedCity=",selectedCity);
    setCity(selectedCity);
    //setCurrent(selectedCity);
    
  };

  const APIKEY = "34480b98aa332da53123a0ac63a4ea9d";
  let lat = city && city.lat ? city.lat : "";
  let long = city && city.lng ? city.lng : "";
  let exclude = "hourly,minutely";
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=${exclude}&units=metric&lang=tr&appid=${APIKEY}`;

  const fetchData = () => {
    axios(url).then((data) => {
      let _daily = data.data.daily;
      // console.log("daily",_daily);
      setDaily(_daily);

      // console.log('data in chooseState',data.data)
    });
    console.log(weekdayIndex);
  };
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [city]);



  const updateCurrent = ()=>{
    console.log("particular day", daily[selectedCard]);
        setCurrent(daily[selectedCard]);
  }
  useEffect(() => {
    updateCurrent();
    // eslint-disable-next-line
  }, [daily, selectedCard]);


  return (
    <>
      <div className="homeWrap">
        {/* LeftSide section where current details shown */}
        
        <div className="weatherSection">
          {!current && <div>Loading...</div>}
          {current && (
            <div className="leftWrap">
              <div className="dateWrap">
                <h2>{WEEKDAYS[weekdayIndex]}</h2>
                <span className="dateDay">
                  {dayjs.unix(current.dt).format("DD MMM YYYY")}
                </span>
                <span className="locationName">
                  {city.city} - {city.admin_name} - {city.country}
                </span>
              </div>
              <div className="weatherContainer">
                <img
                  className="weatherIcon"
                  alt="myit"
                  src={`http://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`}
                />
                <h1 className="weatherTemp">
                  {Math.round(current.temp.max)}°C
                </h1>
                <h3 className="weatherDesc">{current.weather[0].main}</h3>
              </div>
            </div>
          )}
        </div>

        {/* right side section having 3 components */}
        <div className="rightSide">
          {/* seacching city ChooseStateComponent */}
          <div className="stateWrap">
            <select
              className="stateMenu"
              defaultValue={city}
              onChange={handleChange}
            >
              {cities &&
                cities.length > 0 &&
                cities.map((city) => {
                  return (
                    <option
                      key={`${city.population}${city.lat}`}
                      value={city.city}
                    >
                      {city.city} - {city.admin_name}
                    </option>
                  );
                })}
            </select>
          </div>

          {/* WeekInfoCardComponents */} 
           <div className="cardWrap">
            <ul className="cardList">
              {daily && daily.length > 0
                ? daily.map((item, index) => {
                    if (index < 7) {
                      return (
                        <>
                        <SingleCardComponents 
                       className={index === selectedCard ? "active" : ""} onClick={()=>{
                                        setSelectedCard(index)
                                        updateCurrent();
                                    }} item={item} key={index}
                        /> 

                        </>
                      );
                    }
                    return "";
                  })
                : ""}
            </ul>
          </div>
   
         
          <Humidity current={current} />
        </div>
      </div>
    </>
  );
};

export default Home;



// const Weather = () => {
// const [enteredCity,setEnteredCity]=useState();

// const handleChange=(e)=>{
//   const newEnteredCity=cities.filter(
//     (city)=>city.city===e.target.value
//   )[0]
//   setEnteredCity(newEnteredCity);
// }

// const [weather,setWeather]=useState({
//    loading:false,
//    data:{},
//    error:false,
// });

// const toDate=()=>{
//     const date=moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a");
//     return date;
//     };

//     const search=async(event)=>{

//       const apiId='e888b53a2937e2745b7bf70dd71bebfd';
//       let lat = enteredCity && enteredCity.lat ? enteredCity.lat : '';
//       let long = enteredCity && enteredCity.lng ? enteredCity.lng : '';
//       let exclude = 'hourly,minutely';
//       const url =  `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=${exclude}&units=metric&lang=tr&appid=${apiId}`;

//    if(event.key==='Enter'){
//     event.preventDefault();
//     setEnteredCity('');
//     setWeather({...weather,loading:true});

//     await axios.get(url).then((res)=>{
//         console.log('res',res);
//         // const curDate=res.data.dt;
//         // const date=moment(curDate).format("dddd, MMMM Do YYYY, h:mm:ss a");
//         // console.log(date);

//         setWeather({
//             data:res.data,
//             loading:false,
//             error:false,
//           })
//     }).catch((error)=>{
//         setWeather({...weather,data:{},error:true});
//         setEnteredCity('');
//         console.log('error',error);
//     });
//    }
// };

//   return (
//     <div>
//         <h1 className='app-name'>
//             Weather App<span>🌤</span>
//         </h1>

//         <div className='search-bar'>
//            <select
//             type='text'
//             className='city-search'
//             placeholder='Search City...'
//             name='enteredCity'
//             value={enteredCity}
//             onChange={handleChange}
//             onKeyDown={search}
//            >
//             {
//               cities&&cities.length>0 && cities.map((city)=>{
//                 return (
//                   <option key={`${city.population}${city.lat}`} value={city.city}>
//                   {city.city} -  {city.admin_name}
//                   </option>
//                 )
//               })
//             }
//            </select>
//         </div>
//         {weather.loading&&(
//             <>
//             <br />
//             <br />
//              <div className='loader'>
//              <TailSpin color='black'  />
//              </div>
//             </>
//         )}
//         {weather.error&&(
//             <>
//                 <br />
//                 <br />
//                 <span className='error-message'>
//                 {/*  ----------*/}
//                 <span style={{ 'font-size': '20px' }}> Sorry, City not found</span>
//                 </span>
//             </>
//         )}
//         {weather&&weather.data&&weather.data.main&&(
//            <div>

//            <div className='city-name'>
//             <h2>
//                 {weather.data.name}, <span>{weather.data.sys.country}</span>
//             </h2>
//            </div>
//             <div className='date'>
//                <span>{toDate()}</span>
//             </div>
//        <div className='icon-temp'>
//        <img
//               className=""
//               src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`}
//               alt={weather.data.weather[0].description}
//             />
//             {Math.round(weather.data.main.temp)}
//             <sup className="deg">&deg;C</sup>
//        </div>

//           <div className="des-wind">
//             <p>{weather.data.weather[0].description.toUpperCase()}</p>
//             <p>Wind Speed: {weather.data.wind.speed}m/s</p>
//           </div>
//            </div>
//         )}
//     </div>
//   )
// }

// export default Weather
