import React from "react"
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,} from 'recharts';
import Moment from 'moment';

const tickFormatter = (tick) => Moment(tick).format('HH:mm')

class CustomTooltip  extends React.Component{
    render() {
      const { active } = this.props;
  
      if (active) {
        const { payload } = this.props;

        var barDate = new Date(payload[0].payload.time)
        var dateStr = barDate.toLocaleDateString();
        var hourstr =  barDate.getHours();
        if(hourstr < 10){
          hourstr = "0" + hourstr
        }

        return (
          <div className="custom-tooltip">
            <p className="label">{dateStr + ', ' + hourstr + ":00"}</p>
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
           <BarChart width={600} height={300} data={readings.readings}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="time" tickFormatter={tickFormatter}/>
                <YAxis/>
                <Tooltip content={<CustomTooltip/>}/>
                <Bar dataKey="light" fill="#8884d8"/>
            </BarChart>
       </div>
   )
}

export default ReadingDisplayForm