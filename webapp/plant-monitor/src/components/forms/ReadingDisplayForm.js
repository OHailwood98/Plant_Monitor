import React from "react"
import PropTypes from 'prop-types'
import {BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,} from 'recharts';

const data = [
    {deviceID: "47", light: 1, moisture:32, temperature: 14, time:"00:00", name:"09/05/2020, 00:00"},
    {deviceID: "47", light: 5, moisture:32, temperature: 16, time:"01:00", name:"09/05/2020, 01:00"},
    {deviceID: "47", light: 10, moisture:32, temperature: 17, time:"02:00", name:"09/05/2020, 02:00"},
    {deviceID: "47", light: 50, moisture:32, temperature: 18, time:"03:00", name:"09/05/2020, 03:00"},
    {deviceID: "47", light: 75, moisture:32, temperature: 18, time:"04:00", name:"09/05/2020, 04:00"},
];

class CustomTooltip  extends React.Component{
    render() {
      const { active } = this.props;
  
      if (active) {
        const { payload, label } = this.props;
        return (
          <div className="custom-tooltip">
            <p className="label">{payload[0].payload.name}</p>
            <p className="label">Light: {payload[0].payload.light}</p> 
          </div>
        );
      }
  
      return null;
    }
  };

function ReadingDisplayForm(readings){
   return(
       <div>
           <BarChart width={600} height={300} data={data}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="time"/>
                <YAxis/>
                <Tooltip content={<CustomTooltip/>}/>
                <Bar dataKey="light" fill="#8884d8"/>
            </BarChart>
       </div>
   )
}

export default ReadingDisplayForm