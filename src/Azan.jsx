import React, { useEffect, useState } from "react";
import Dropdown from "./components/dropdown";
import logo from "./logo/prayer.png";
import axios from "axios";
import moment from "moment";

const Azan = () => {
  const [prayerData, setPrayerdata] = useState([]);
  var [date, setDate] = useState(new Date());
  const [temp, setTemp] = useState("");
  const today = new Date();
  const day = (today.getDate() < 10 ? "0" : "") + today.getDate();
  const month = (today.getMonth() < 10 ? "0" : "") + (today.getMonth() + 1);
  const year = today.getFullYear();

  // console.log(prayerData);

  //function for connvert time 24hr to 12hr format
  const newPrayertime = (name) => {
    let Hour = name ? name.split(" ")[0].split(":")[0] % 12 : null;

    const Minutes = name ? name.split(" ")[0].split(":")[1] : null;

    if (name.split(" ")[0].split(":")[0] % 12 === 0) {
      Hour = 12;
    }

    var data = Hour + ":" + Minutes;
    return data;
  };

  //adding two  time
  function timeConvert1(data) {
    var minutes = data % 60;
    var newMinutes = minutes.toString();

    //appending zero in one digit number
    if (newMinutes.length == 1) {
      newMinutes = "0" + newMinutes;
    } else {
      newMinutes = minutes;
    }

    var hours = (data - minutes) / 60;
    return hours + ":" + newMinutes;
  }
  // console.log(prayerData.Fajr);

  var fajrIkamath = prayerData.Fajr ? newPrayertime(prayerData.Fajr) : null;
  var Fajrikamath = timeConvert1(
    moment.duration(fajrIkamath).asMinutes() +
      moment.duration("0:20").asMinutes()
  );

  var duhrIkamath = prayerData.Dhuhr ? newPrayertime(prayerData.Dhuhr) : null;
  var Duhrikamath = timeConvert1(
    moment.duration(duhrIkamath).asMinutes() +
      moment.duration("0:20").asMinutes()
  );

  var asrIkamath = prayerData.Asr ? newPrayertime(prayerData.Asr) : null;
  var Arsikamath = timeConvert1(
    moment.duration(asrIkamath).asMinutes() +
      moment.duration("0:15").asMinutes()
  );

  var maghribIkamath = prayerData.Maghrib
    ? newPrayertime(prayerData.Maghrib)
    : null;
  var Maghribikamath = timeConvert1(
    moment.duration(maghribIkamath).asMinutes() +
      moment.duration("0:03").asMinutes()
  );

  var ishaIkamath = prayerData.Isha ? newPrayertime(prayerData.Isha) : null;
  var Ishaikamath = timeConvert1(
    moment.duration(ishaIkamath).asMinutes() +
      moment.duration("0:20").asMinutes()
  );
  // console.log(Fajrikamath);
  useEffect(() => {
    axios
      .get(
        `https://api.aladhan.com/v1/calendarByCity?city=kozhikode&country=india&method=1&month=${month}&year=${year}`
      )
      .then((res) => {
        var Length = res.data.data.length;

        for (var i = 0; i < Length; i++) {
          if (day === res.data.data[i].date.gregorian.day) {
            setPrayerdata(res.data.data[i].timings);
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      });

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=11.2588&lon=75.7804&appid=d5585182e54fc20c0ba1a8ea4b72bd36`
      )
      .then(function (res) {
        const temp = res.data.main.temp;
        const celcius = Math.floor(temp - 273.15);
        setTemp(celcius);
      })
      .catch(function (error) {
        console.log(error);
      });

    var timer = setInterval(() => setDate(new Date()), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  }, [year, month, day]);

  return (
    <div className="azan">
      <div className="displaybox">
        <div className="time">
          <img src={logo} alt="logo" />
          <p className="d-font l-space f-16">
            {date.toLocaleTimeString().split(" ")[0]}
          </p>
          <p className="d-font">{date.toLocaleTimeString().split(" ")[1]}</p>
        </div>

        <div className="date-E">
          <p>date</p>

          <p className="d-font l-space">
            Temp :<span className="d-font l-space">{temp}°C</span>
          </p>
        </div>

        <div className="date-A">
          <p className="demo">month</p>
          <p className="d-font l-space">{date.toLocaleDateString()}</p>
        </div>
        <div className="center">
          <Dropdown />
        </div>

        <table style={{ position: "relative" }}>
          <tbody>
            <tr>
              <td></td>
              <td className="text-center m-font">ബാങ്ക് </td>
              <td className="text-center m-font">ഇക്കാമത് </td>
              <td></td>
            </tr>
            <tr>
              <td className="m-font">സുബ്ഹി </td>
              <td className="text-center d-font">
                {prayerData.Fajr ? newPrayertime(prayerData.Fajr) : null}
              </td>
              <td className="text-center d-font">{Fajrikamath}</td>
              <td className="text-right a-font">الفجر</td>
            </tr>
            <tr>
              <td className="m-font">ളുഹ്റ് </td>
              <td className="text-center d-font">
                {prayerData.Dhuhr ? newPrayertime(prayerData.Dhuhr) : null}
              </td>
              <td className="text-center d-font">{Duhrikamath}</td>
              <td className="text-right a-font">الظهر</td>
            </tr>
            <tr>
              <td className="m-font">അസർ </td>
              <td className="text-center d-font">
                {prayerData.Asr ? newPrayertime(prayerData.Asr) : null}
              </td>
              <td className="text-center d-font">{Arsikamath}</td>
              <td className="text-right a-font">العصر</td>
            </tr>
            <tr>
              <td className="m-font">മഗ്‌രിബ്‌ </td>
              <td className="text-center d-font ">
                {prayerData.Maghrib ? newPrayertime(prayerData.Maghrib) : null}
              </td>
              <td className="text-center d-font">{Maghribikamath}</td>
              <td className="text-right a-font">المغرب</td>
            </tr>
            <tr>
              <td className="m-font">ഇഷ്ഹാ </td>
              <td className="text-center d-font">
                {prayerData.Isha ? newPrayertime(prayerData.Isha) : null}
              </td>
              <td className="text-center d-font">{Ishaikamath}</td>
              <td className="text-right a-font">العشاء</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Azan;
