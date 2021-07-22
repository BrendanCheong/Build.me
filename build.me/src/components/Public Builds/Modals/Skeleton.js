import LoadingCard from "./LoadingCard"

const Skeleton = () => {
    return (
        <>
            <section className="flex flex-col w-screen p-5 bg-white space-y-7 h-4/6" id="Skeleton Loading">
                <div className="w-48 h-16 text-xl bg-gray-200 rounded-sm animate-pulse font-roboto">
                    <h2 className="ml-5 text-transparent">Loading...</h2>
                </div>
                <div className="flex flex-row items-center space-x-5">
                    <LoadingCard/>
                    <LoadingCard/>
                    <LoadingCard/>
                    <LoadingCard/>
                    <LoadingCard/>
                </div>
            </section>
        </>
    )
}

export default Skeleton
