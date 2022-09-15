import axios from 'axios'

//1 get daily forecast
//2 check last updated 
//3 if LU older then today Date:
//3.1  get daily forecast from api and push to db
//3.11 fetch from db to client 
//else 
// 3.2 return daily forecast (DB) from client 


let startDate = new Date()
let orgDate = startDate.getDate();
let fetchDate = (startDate.getFullYear() + '-' + (startDate.getMonth() + 1) + '-' + startDate.getDate())
console.log(fetchDate);


async function checkAndUpdateDailyForecast() {
    await axios.post('https://shakaserver2.herokuapp.com/everyDayGet',
        { sqlString: 'SELECT * FROM daily_forecast LIMIT 1' })
        .then((response) => {
            let lastDate = (Number(response.data[0].last_updated.substring(8, 10)));

            if (lastDate !== orgDate)
            // for(all beaches)
            //api fetch for (response.data.hours[0])
            //=>
            //into another axios post thet will look like that
            // fetchDetails = response.data.hours[0]
            //sqlString:`INSERT INTO daily_forecast (wave_height,wind_direction,wind_speed,water_temperature,last_updated,beach_id)
            // V ALUES (${fetchDetails.wave_height},${fetchDetails.wind_direction},${fetchDetails.wind_speed},${fetchDetails.water_temperature},'${fetchDate}',///)`
            {
                console.log('adsf');
            } else {
                //axios get forecast as usual
            }

        })
}

