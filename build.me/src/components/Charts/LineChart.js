import {useState, useEffect, useContext} from 'react';
import  { Line } from 'react-chartjs-2';

const LineChart = () => {

    const [lineChartData, setLineChartData] = useState({});

    useEffect(() => {
        setLineChartData({
            labels: ["15/12/2020", "16/12/2020","25/12/2020", "28/12/2020", "05/01/2021","09/01/2021", "13/01/2021", "24/02/2021"],
            datasets : [
                    {

                    label: "CPU",
                    data: [509.00, 509.00, 450.00, 450.00, 375.00,375.00, 460.00, 489.00],
                    fill: false,
                    borderColor:"#6366F1",
                    backgroundColor: '#8B5CF6',

                }
            ],
        })
    },[])

    return (
        <>
            <Line
                data={lineChartData}
                options={{
                    plugins: {
                        title: {
                                display: true,
                                text: "3-Monthly Price Trends",
                                postion: 'top',
                                font: {
                                    family: 'Arial',
                                    size: 24
                                }
                            },
                        legend: { 
                            display: true,
                            position: "top",
                            align: "center",   
                            labels: {
                                font: {
                                    family: 'Arial',
                                    size: 14
                                },
                                color: 'black' // change legend text color
                            }

                        }
                    },
                    scales: {
                        yAxes:{
                            ticks: {
                                callback: function (value,index,values) {
                                    return 'S$ ' + value.toFixed(2);
                                },
                                beginAtZero: false,
                                font: {
                                    family: 'Arial',
                                    size: 14
                                },
                                color: 'black' // change axis color
                            },
                            title: {
                                display:false,
                                text: 'Total Price per Part',
                                font: {
                                    family:'Arial',
                                    size: 20,
                                },
                                color:'black' // change axis color
                            },
                            grid: {
                                
                                color: '#94A3B8', // change grid y color
                                borderWidth: 1,
                                
                            }
                        },
                        xAxes:{
                            ticks:{
                                beginAtZero: true,
                                font: {
                                    family: 'Arial',
                                    size: 14
                                },
                                color: 'black' //change color
                            },
                            grid: {
                                
                                color: '#94A3B8', // change grid x color
                                borderWidth: 1,
                                
                            },
                        },
                        
                    },
                    responsive: true,
                    maintainAspectRatio: false,
                }}
            />
        </>
    )
}

export default LineChart
