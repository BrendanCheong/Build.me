import Card from "../components/Public Builds/Card";
import UnCard from "../components/Public Builds/UnCard"

const Public_Builds = () => {

    const normal = "90vh"
    const short = "80vh"

    return (
        <div className="flex flex-col w-screen h-screen">
            <div className="flex w-full h-full p-4 text-center bg-gray-100 sm:space-x-2 lg:flex-row xl:flex-row lg:justify-evenly">
                <Card height={normal}/>
                <Card height={normal}/>
                <UnCard type={"GPU"} short={true}/>
            </div>
            <div className="flex w-full h-full p-4 text-center bg-gray-100 sm:space-x-2 lg:flex-row xl:flex-row lg:justify-evenly">
                <Card height={short}/>
                <UnCard type={"CPU"} short={false}/>
                <Card height={short}/>
            </div>
        </div>
    )
}

export default Public_Builds
