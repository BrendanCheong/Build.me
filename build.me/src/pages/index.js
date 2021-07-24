import Dashboard from "../components/Dashboard";

const Home = () => {

    const username = localStorage.getItem("username") || ""
    return (
        <>
            <div className="flex flex-col items-center justify-center w-screen space-y-10 bg-gray-100" style={{height: "65rem"}}>
                <h1 className="mt-24 text-black lg:text-5xl md:text-3xl sm:text-2xl font-poppins">
                    {`Welcome${" " + username}, to Build.me!`}
                </h1>
                <div className="inline-flex w-screen h-full">
                    <Dashboard/>
                </div>
                
            </div>
        </>
    )
}

export default Home
