import {useState, useEffect, useCallback} from 'react';
import { Bar } from 'react-chartjs-2'; //there is also pie and bar


const PriceBarChart = (props) => {

    const [barChartData, setBarChartData] = useState({});

    const chart = useCallback(() => {
        setBarChartData({
            labels: ['CPU','Motherboard','GPU','Memory','PSU','Storage'],
            datasets: [
                {
                    label:'Number 1',
                    backgroundColor: ['#6366F1'],
                    data: props.BarGraphData.first

                },
                {   
                    label:'Number 2',
                    backgroundColor: ['#2DD4BF'],
                    data: props.BarGraphData.second
                    
                }]
        })

    },[props])

    useEffect(() => {
        chart()
        console.log('re-rendering!')
        console.log(barChartData)

    }, [props,chart])

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
                                beginAtZero: false,
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
