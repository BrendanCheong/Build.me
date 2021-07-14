import { useState, useEffect, createContext } from "react";
import moment from "moment";
import { ErrorHandlingNotif } from "../Misc/Error"
import axiosInstance from "../../AxiosInstance";
import BestSeller from "./BestSeller";
import LineChart from "../Charts/LineChart";

export const DashboardData = createContext(null);

const DashboardTab = ( { name }) => {

    const [loading, setLoading] = useState(true);
    const [cardData, setCardData] = useState({});
    const [chartData, setChartData] = useState({});

    useEffect(() => {
        const FetchData = async () => {
            
            try {

                const response = await axiosInstance.get(`/BestSellers/${name}`);
                const FetchedData = response.data[0];
                const cardDataPayload = {

                    ProductName: FetchedData.ProductName,
                    ProductURL: FetchedData.ProductURL,
                    CurrentPrice: FetchedData.CurrentPrice,
                    ProductImg: FetchedData.ProductImg,
                    ProductRating: FetchedData.ProductRating,
                }
                const ChartDataPayload = {
                    time: FetchedData.ProductTime.map((seconds) => {
                        const date = new Date(0);
                        date.setUTCSeconds(seconds);
                        const answer = moment(date).format('MMM Do YYYY');
                        return answer;
                    }),
                    prices: FetchedData.ProductPrices,
                }
                setCardData(cardDataPayload);
                setChartData(ChartDataPayload);
                setLoading(false);
                
            } catch(err) {

                console.error(err);
                ErrorHandlingNotif();
            }
            
        }

        if (loading) {

            FetchData();
        }
    })
    return (
        <>
        <DashboardData.Provider value={{cardData, chartData, name}}>
            <BestSeller/>
            <div className="w-8/12 p-5 bg-white shadow-md h-custom rounded-xl">
                <LineChart time={chartData.time} prices={chartData.prices} name={name}/>
            </div>
        </DashboardData.Provider>
        </>
    )
}

export default DashboardTab
