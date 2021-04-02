import React, { useContext, useEffect, useState } from 'react';
import * as chartjs from 'chart.js';
import { ChartData, Line } from 'react-chartjs-2';
import { DBContext } from './DBConext';
import { Monitoring } from './api/classes';

const chartOptions: Chart.ChartConfiguration = {
    type: 'line',
    data: {
        datasets: [{
            label: "Heap Memory Usage",
            backgroundColor: 'rgba(0, 148, 198, 0.1)',
            borderColor: 'rgba(0, 148, 198, 1)',
            data: [],
            fill: true,
            pointRadius: 0,

        },
        {
            label: "Non Heap Memory Usage",
            backgroundColor: 'rgba(137, 99, 186, 0.1)',
            borderColor: 'rgba(137, 99, 186, 1)',
            data: [],
            fill: true,
            pointRadius: 0,
        }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
            display: true,
            text: "",
            fontColor: "#ccc",
            fontSize: 20,
        },
        legend: {
            align: "start",
            position: "bottom",
            labels: {
                boxWidth: 3,
                usePointStyle: true,
            }
        },
        elements: {
            line: {
                tension: 0
            }
        },
        scales: {
            xAxes: [
                {
                    gridLines: {
                        color: "#363636",
                    },
                    ticks: {
                        fontColor: "#a3a7a9",
                        maxTicksLimit: 10,
                        maxRotation: 0
                    },
                    type: "time",
                    time: {
                        parser: "HH:mm",
                        unit: "second",
                        unitStepSize: 5,
                        displayFormats: {
                            millisecond: "HH:mm:ss",
                            second: "HH:mm:ss",
                            minute: "HH:mm",
                            hour: "HH:mm"
                        },

                    }
                }
            ],
            yAxes: [
                {

                    gridLines: {
                        color: "#363636",
                    },
                    ticks: {
                        fontColor: "#a3a7a9",
                        callback: (value, idx, vlaues) => {
                            return `${value} MB`
                        },


                    }
                }
            ],
        },
    }
};

const MemoryChart = (props) => {
    const [memoryUsage, setMemoryUsage] = useState<{ heap: {x:number,y:number}[], nonHeap: {x:number,y:number}[] }>({heap:[],nonHeap:[]});
    const [memoryWarnning, setMemoryWarnning] = useState(false);
    const { monitorContext: { monitor, pause } } = useContext(DBContext);


    useEffect(() => monitor.listen(
        Monitoring.DataTypeName.memory,
        memoryData => {
            if(pause) return;
            const usage = {
                heap: {
                    x: Date.now(),
                    y: memoryData.heapMemoryUsage.used,
                },
                nonHead: {
                    x: Date.now(),
                    y: memoryData.nonHeapMemoryUsage.used,
                } 
            };
            
            if(memoryUsage.heap.length > 40) { // NOTE(YB):we need a constant to indecate how many points we want the chart to hold
                memoryUsage.heap.shift();
                memoryUsage.nonHeap.shift();
            }
            if(usage.heap.y > 1000) setMemoryWarnning(true);
            setMemoryUsage({
                heap:[...memoryUsage.heap,usage.heap],
                nonHeap:[...memoryUsage.nonHeap,usage.nonHead]
            });
        },
        1000
    ), [monitor, pause]);

    const data: ChartData<chartjs.ChartData> = {
        datasets: [{
            label: "Heap Memory Usage",
            backgroundColor: 'rgba(0, 148, 198, 0.1)',
            borderColor: 'rgba(0, 148, 198, 1)',
            data: memoryUsage.heap,
            fill: true,
            pointRadius: 0,

        },
        {
            label: "Non Heap Memory Usage",
            backgroundColor: 'rgba(137, 99, 186, 0.1)',
            borderColor: 'rgba(137, 99, 186, 1)',
            data: memoryUsage.nonHeap,
            fill: true,
            pointRadius: 0,
        }
        ]
    };

    const options: chartjs.ChartOptions =  {
        responsive: true,
        maintainAspectRatio:false,
        title:{
            display:memoryWarnning,
            text:"Warnning Approaching Max Memory",
            fontColor:"rgba(236, 70, 70,0.9)",
            fontSize:20,
        },
        legend:{
            align:"start",
            position:"bottom",
            
            labels:{
                fontSize:15,
                boxWidth:3,
                usePointStyle:true,
            }
        },
        animation:{
            duration:0
        },
        elements: {
            line:{
                tension:0
            }
        },
        
        scales: {
            xAxes: [
                { 
                    gridLines: {
                        color: "#363636",
                    },
                    ticks: {
                        fontColor: "#a3a7a9",
                        maxTicksLimit:10,
                        maxRotation:0
                    },
                    type: "time",
                    time: {
                        parser: "HH:mm",
                        unit: "second",
                        unitStepSize: 5,
                        displayFormats: {
                            millisecond: "HH:mm:ss",
                            second: "HH:mm:ss",
                            minute: "HH:mm",
                            hour: "HH:mm"
                        },
                        
                    }
                }
            ],
            yAxes: [
                {
                    
                    gridLines: {
                        color: "#363636",
                    },
                    ticks:{
                        fontColor: "#a3a7a9",
                        callback:(value,idx,vlaues) => {
                            const tick = Math.round(+value / 1024 / 1024 / 1024)
                            return `${tick} MB`
                        },


                    }
                }
            ],
        },
    };

    const style: React.CSSProperties = {
        gridArea: props.gridArea,
    }

    return (
        <div className="memory-chart" style={style}>
            <h3 className="memory-chart__header">java instance memory usage</h3>
            <Line data={data} options={options} height={350}/>
        </div>
    )
}

export default MemoryChart
