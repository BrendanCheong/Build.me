import { Doughnut } from 'react-chartjs-2'; 
import { useState, useEffect, useCallback } from 'react';


const BudgetDonut = (props) => {

    const [chartData, setChartData] = useState({})

    const chart = useCallback(() => {
        setChartData({
            labels:props.labelArray, // this needs data -> Array
            datasets: [{

                backgroundColor: props.ColorArray,
                data:props.dataSetArray // according to each part, what is the percentage? Has to be 100%, -> Array
            }],
        })
    },[props])

    useEffect(() => {
        chart()
    }, [props,chart])

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
