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
        { !loading && 
            <DashboardData.Provider value={{cardData, chartData, name}}>
                <BestSeller/>
                <div className="w-8/12 p-5 bg-white shadow-md h-custom rounded-xl">
                    <LineChart time={chartData.time} prices={chartData.prices} name={name}/>
                </div>
            </DashboardData.Provider>
        }
        { loading &&
            <div className="flex flex-col items-center justify-center w-full h-full">
                <svg className="w-56 h-56 transition duration-300 animate-spin" fill="none" stroke="#6366F1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
            </div>
        }
        </>
    )
}

export default DashboardTab
