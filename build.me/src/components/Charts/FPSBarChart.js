import {useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

const FPSBarChart = ({labels, BarGraphLeft, BarGraphRight, nameLeft, nameRight}) => {

    const [barChartData, setBarChartData] = useState({});

    useEffect(() => {
        setBarChartData({
            labels: labels ? labels : ["Avg", "CSGO", "GTAV", "Overwatch", "PUBG", "Fortnite"],
            datasets: [
                {
                    label:!nameLeft ? "Left Side Data Not Found" : nameLeft,
                    backgroundColor: ['#6366F1'],
                    data: BarGraphLeft

                },
                {   
                    label:!nameRight ? "Right Side Data Not Found" : nameRight,
                    backgroundColor: ['#2DD4BF'],
                    data: BarGraphRight
                    
                }]
        })


    }, [BarGraphLeft, BarGraphRight,nameRight, nameLeft, labels])

    return (
        <div className="relative w-8/12 h-full">
            <Bar 
                data={barChartData}
                options={{
                    plugins: {
                        title: {
                                display: false,
                                text: "Compare PC Part Prices",
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
                                beginAtZero: false,
                                font: {
                                    family: 'Arial',
                                    size: 14
                                },
                                color: 'black' // change axis color
                            },
                            title: {
                                display:true,
                                text: 'FPS',
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
                                
                            }
                        },
                        
                    },
                    responsive: true,
                    maintainAspectRatio: false,
                }}
            />
        </div>
    )
}

export default FPSBarChart
