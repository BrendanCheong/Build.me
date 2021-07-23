import State from "../components/Public Builds/State";

const Public_Builds = () => {

    const normal = "90vh"
    const short = "80vh"

    return (
        <div className="flex flex-col w-screen h-screen">
            <div className="flex w-full h-full p-4 text-center bg-gray-100 sm:space-x-2 lg:flex-row xl:flex-row lg:justify-evenly">
                <State type={"CPU"} short={true} height={normal}/>
                <State type={"GPU"} short={true} height={normal}/>
                <State type={"Motherboard"} short={true} height={normal}/>
            </div>
            <div className="flex w-full h-full p-4 text-center bg-gray-100 sm:space-x-2 lg:flex-row xl:flex-row lg:justify-evenly">
                <State type={"Memory"} short={false} height={short}/>
                <State type={"PSU"} short={false} height={short}/>
                <State type={"Storage"} short={false} height={short}/>
            </div>
        </div>
    )
}

export default Public_Builds
