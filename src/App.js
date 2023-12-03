import './App.css';
import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Infodialog from './components/InfoBox';
import MainDash from'./components/MainDash';
import axios from 'axios';
import { fromUnixTime } from 'date-fns';

function App() {
  const [data,setData] = useState({ hourlyNeType: [], hourlyNeAlias: [], dailyNeType: [], dailyNeAlias: [] });

  useEffect(() => {
    axios.get('https://localhost:7093/api/fetch/allAggregatedData')
    .then(res => {
      const responseData = res.data;
      //console.log("response: " , responseData);
      // Assuming responseData is an array of arrays
      if (Array.isArray(responseData) && responseData.length === 4) {
        const [hourlyNeType, hourlyNeAlias, dailyNeType, dailyNeAlias] = responseData;

        console.log(hourlyNeAlias)
      
        setData({
          hourlyNeType,
          hourlyNeAlias,
          dailyNeType,
          dailyNeAlias,
        });
      }
        
      }).catch(err => {
             console.log(err) 
        })
      }, []);

  return (
  <div className="App">
    <div className="AppGlass"> 
       <Sidebar/>
       <MainDash data={data}/>
       <Infodialog/>
    </div>
  </div>
  );
}

export default App;
