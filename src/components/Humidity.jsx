import React from 'react'

const Humidity = (props) => {
    const current=props.current;
    console.log("current",current);
  return (
    <>
    {current ? (
      <div className="humidityWrap">
        <div className="humidityData">
          <div className="title">HUMIDITY </div>
          <div className="value">{current.humidity} %</div>
        </div>
        <div className="humidityData">
          <div className="title">WIND </div>
          <div className="value">
            {Math.round(current.wind_speed)} km/h
          </div>
        </div>
        <div className="humidityData">
          <div className="title">PRESSURE</div>
          <div className="value">{current.pressure} hPa</div>
        </div>
      </div>
    ) : (
      ""
    )}
  </>
  )
}

export default Humidity
