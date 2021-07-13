import LineChart from "./Charts/LineChart"
import moment from "moment";

const Dashboard = () => {

    const testFunc = (seconds) => {
        const date = new Date(0);
        date.setUTCSeconds(seconds);
        const answer = moment(date).format('MMM Do YYYY');
        return answer;
    }
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 lg:p-10">
            <h1 className="text-black lg:text-5xl md:text-3xl sm:text-2xl mb-14 font-poppins">
                Welcome to Build.me!
            </h1>

            {/* <div className="w-6/12 h-4/6 ml-96 pl-52">
                <LineChart/>
            </div> */}
            
        </div>
    )
}

export default Dashboard
