import { Doughnut } from 'react-chartjs-2'; 
import { useState, useEffect } from 'react';


const BudgetDonut = (props) => {

    const [chartData, setChartData] = useState({})

    const chart = () => {
        setChartData({
            labels:['CPU','Motherboard','GPU','Memory','PSU','Storage','Remaining'],
            datasets: [{

                backgroundColor:['#159dfb', '#c83955', '#FFD166', '#17d993', '#9CFFFA', '#2BD9FE', '#623CEA', '#DFB2F4', '#D36135', '#EF476F '],
                data:[20,17,35,8,10,5,5] // according to each part, what is the percentage? Has to be 100%, it must be an Array
            }],
        })
    }

    useEffect(() => {
        chart()
    }, [])

    return (
        <div className="ml-10 w-custom h-custom">
            <Doughnut
                data={chartData}
                options={{
                    responsive: true,
                    maintainAspectRatio: false, // boolean to false to follow TailwindCss dimensions
                    plugins: {
                        legend: {
                            display: true,
                            position: "top",
                            align:"center",
                            fullWidth: true,
                            labels: {
                                padding: 10,
                                font: {
                                    size: 16, // change font size here
                                },
                                color:'black' // change font color here
                            }
                        },
                    },
                    elements: {
                        arc: {
                            borderColor: '#ffffff'
                        }
                    }
                }}
            />
        </div>
    )
}

export default BudgetDonut
