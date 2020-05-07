import React, {useState, useEffect} from "react";


export default function History(props) {

  const [lapHistory, setLapHistory] = useState([new Map()]);
  const [currentLapTime, setCurrentLapTime] = useState(0);
  const [prevLapTime, setPrevLapTime] = useState(0);
  const [lapCount, setLapCount] = useState(1);
  const [tableData, setTableData] = useState();


  useEffect(() => {
    if(props.stopwatchIsTiming) {
      setCurrentLapTime(props.currentTime - props.lapTime);
      setLapHistory(lapHistory.set(lapCount,currentLapTime));
    }
  }, [props.currentTime]);


  useEffect(() => {
    if(props.isStopwatchReset) {
      setLapHistory(new Map());
      setCurrentLapTime(0);
      setPrevLapTime(0);
      setLapCount(0);
    }
  },[props.isStopwatchReset]);


  useEffect(() => {
    setPrevLapTime(currentLapTime);
    setLapCount(lapCount + 1);
  }, [props.lapTime]);


  useEffect(() => {
     let historyArray = Array.from(lapHistory.values());
     historyArray = historyArray.reverse();
     let newTableData = historyArray.map((lapTime,lapNumber) => {
       let minutes = Math.floor(lapTime/6000);
       let seconds = Math.floor((lapTime % 6000)/100);
       let centiseconds = Math.floor(lapTime % 100);
       if(seconds < 10) {
         seconds = '0'.concat(seconds);
       } else if(seconds >= 60) {
         seconds = seconds - 60;
         minutes = minutes + 1;
       }
       if(centiseconds < 10) {
         centiseconds = '0'.concat(centiseconds);
       }
       if(minutes < 10) {
         minutes = '0'.concat(minutes);
       }

       return (
         <tr>
           <td>Lap {historyArray.length - lapNumber}</td>
           <td>{minutes}:{seconds}.{centiseconds}</td>
         </tr>
       );
     });
    setTableData(newTableData);
  }, [currentLapTime]);

  if(props.isStopwatchReset) {
    return([]);
  }
  return (
    <div className="container history">
      <table>
        <tbody>
          {tableData}
        </tbody>
      </table>
    </div>
  )
}
