import React from "react"
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';
import Moment from 'moment';
import Styled from "styled-components";

const tickFormatter = (tick) => Moment(tick).format('HH:mm')

const CenterDiv = Styled.div`
text-align: center;
`;

const BorderDiv = Styled.div`
    display: inline-block;
    width:98%;
    border-style: solid;
    border-width: 3px;
    border-radius: 2px;
    padding: 25px;
    border-color: #ecfc0d;
`;

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

function LightGraph(readings){
   return(
       <BorderDiv>
           <CenterDiv><h3>Light</h3></CenterDiv>
          <ResponsiveContainer width="100%" aspect={16.0/8.0} >
           <BarChart data={readings.readings.readings}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="time" tickFormatter={tickFormatter}/>
                <YAxis/>
                <Tooltip content={<CustomTooltip/>}/>
                <Bar dataKey="light" fill="#8884d8"/>
            </BarChart>
          </ResponsiveContainer>
       </BorderDiv>
   )
}

export default LightGraph