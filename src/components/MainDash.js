import React , { useState, useEffect } from 'react'
import Table from './GridTable';
import RadioBtn from './RadioButton';
import DatePickerComp from './DatePicker';
import StackedAreas from './Linechart';
import Dropdown from './DropdownMenu';

const Agg = ["Interval Aggregation: ", "Hourly", "Daily"];
const Type = ["Type: ", "NeAlias", "NeType"];

export default function MainDash(props){

  const [selectedTimeValue, setSelectedTimeValue] = useState(Agg[1]);
  const [selectedNeValue, setSelectedNeValue] = useState(Type[1]);
  const [selectedDate, setSelectedDate] = React.useState({ from: null, to: null });
 
  const [selectedKpi, setSelectedKpi] = useState("MAX_RX_LEVEL");

   const handleKpiChange = (selectedKpi) => {
    setSelectedKpi(selectedKpi);
  };
  const handleDateChange = ({ from, to }) => {
    setSelectedDate({ from, to });
  };

  const handleTimeChange = (value) => {
    setSelectedTimeValue(value);
  };
  const handleNeChange = (value) => {
    setSelectedNeValue(value);
  };

/*   useEffect(()=> {
    console.log("selectedKPI: " , selectedKpi);
  },[]); */

    
    return(
       
       <div className="MainDash">
            
            <br/>           
            <br/>
            <div style={{ display: 'flex', alignItems: 'center', marginLeft:'100px',  marginBottom: '50px'}}>          
                <RadioBtn state={Agg} onRadioChange={handleTimeChange}/>
                <RadioBtn state={Type} onRadioChange={handleNeChange}/>
                <div style={{ marginLeft: '70px' }} />
                
                <DatePickerComp onDateChange={handleDateChange} />
                <Dropdown handleKpiChange={handleKpiChange} />
               </div>
            <br/>
           

            {selectedNeValue === "NeAlias" && selectedTimeValue === "Hourly" && props.data && props.data.hourlyNeAlias && (
              <React.Fragment>
                {props.data.hourlyNeAlias.length > 0 ? (
                    <StackedAreas data={props.data.hourlyNeAlias.filter((item)=>{
                      const itemDate = new Date(item.dateTimeKey);
                      return (
                        (!selectedDate.from || itemDate >= selectedDate.from) &&
                        (!selectedDate.to || itemDate <= selectedDate.to)
                      );
                    })} state="alias" Group={selectedNeValue} selectedKPI={selectedKpi}/>   
                ) : (
                  <p>Loading . . .</p>
                )}
                

                <Table data={props.data.hourlyNeAlias.filter((item) => {
                  const itemDate = new Date(item.dateTimeKey);
                  return (
                    (!selectedDate.from || itemDate >= selectedDate.from) &&
                    (!selectedDate.to || itemDate <= selectedDate.to) 
                  );
                })}
            state="alias"/>
              </React.Fragment>
            )}

            {selectedNeValue === "NeType" && selectedTimeValue === "Hourly" && props.data && props.data.hourlyNeType &&(
              <React.Fragment>
                {props.data.hourlyNeAlias.length > 0 ? (
                <StackedAreas data={props.data.hourlyNeType.filter((item)=>{
                  const itemDate = new Date(item.dateTimeKey);
                  return (
                    (!selectedDate.from || itemDate >= selectedDate.from) &&
                    (!selectedDate.to || itemDate <= selectedDate.to)
                  );
                 })} state="type" Group={selectedNeValue} selectedKPI={selectedKpi}/>   
                ) : (
                  <p>Loading . . . </p>
                )}

                <Table data={props.data.hourlyNeType.filter((item) => {
                  const itemDate = new Date(item.dateTimeKey);
                  return (
                    (!selectedDate.from || itemDate >= selectedDate.from) &&
                    (!selectedDate.to || itemDate <= selectedDate.to)
                  );
                })} state="type"/> 
              </React.Fragment>
            )}

            {selectedNeValue === "NeAlias" && selectedTimeValue === "Daily" && props.data && props.data.dailyNeAlias && (
              <React.Fragment>
                {props.data.hourlyNeAlias.length > 0 ? (
                <StackedAreas data={props.data.dailyNeAlias.filter((item) => {
                  const itemDate = new Date(item.dateTimeKey);
                  return (
                    (!selectedDate.from || itemDate >= selectedDate.from) &&
                    (!selectedDate.to || itemDate <= selectedDate.to)
                  );
                })} state="alias" Group={selectedNeValue} selectedKPI={selectedKpi}/>              
                ) : (
                  <p>Loading . . . </p>
                )}

                <Table data={props.data.dailyNeAlias.filter((item) => {
                  const itemDate = new Date(item.dateTimeKey);
                  return (
                    (!selectedDate.from || itemDate >= selectedDate.from) &&
                    (!selectedDate.to || itemDate <= selectedDate.to)
                  );
                })} state="alias"/> 
              </React.Fragment>
            )}

            {selectedNeValue === "NeType" && selectedTimeValue === "Daily" && props.data && props.data.dailyNeType && (
              <React.Fragment>
                {props.data.hourlyNeAlias.length > 0 ? (
                <StackedAreas data={props.data.dailyNeType.filter((item) => {
                  const itemDate = new Date(item.dateTimeKey);
                  return (
                    (!selectedDate.from || itemDate >= selectedDate.from) &&
                    (!selectedDate.to || itemDate <= selectedDate.to)
                  );
                })} state="type" Group={selectedNeValue} selectedKPI={selectedKpi}/>        
                ) : (
                  <p>Loading . . . </p>
                )}

                <Table data={props.data.dailyNeType.filter((item) => {
                  const itemDate = new Date(item.dateTimeKey);
                  return (
                    (!selectedDate.from || itemDate >= selectedDate.from) &&
                    (!selectedDate.to || itemDate <= selectedDate.to)
                  );
                })} state="type"/> 
              </React.Fragment>
            )}

            
            <br/> 
        </div>
       
    );
}



