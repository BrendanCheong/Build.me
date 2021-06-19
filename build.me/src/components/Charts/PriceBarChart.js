import {useState, useEffect, useContext} from 'react';
import { Bar } from 'react-chartjs-2'; 
import { CompBuildPageData } from '../../pages/Compare_Builds';

const PriceBarChart = () => {

    const {BarGraphZero, BarGraphOne, autoCompleteState0, autoCompleteState1} = useContext(CompBuildPageData)
    const [barChartData, setBarChartData] = useState({});


    useEffect(() => {
        setBarChartData({
            labels: ['CPU','Motherboard','GPU','Memory','PSU','Storage'],
            datasets: [
                {
                    label:autoCompleteState0,
                    backgroundColor: ['#6366F1'],
                    data: BarGraphZero

                },
                {   
                    label:autoCompleteState1,
                    backgroundColor: ['#2DD4BF'],
                    data: BarGraphOne
                    
                }]
        })


    }, [BarGraphZero, BarGraphOne,autoCompleteState1,autoCompleteState0])

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

export default PriceBarChart
