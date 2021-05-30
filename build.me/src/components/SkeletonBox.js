
const SkeletonBox = () => {
    return (
        <div className="justify-between min-h-screen bg-gradient-to-br from gray-300-to-gray-400">
            <div className="w-56 bg-white rounded shadow-2xl">
                <div className="h-20 bg-gray-200 rounded-tl rounded-tr animate-pulse"></div>
                <div className="p-5">
                    <div className="h-6 mb-4 bg-gray-200 rounded-sm animate-pulse"></div>
                    {/** content */}
                    <div className="grid grid-cols-3 gap-1">
                        <div className="h-6 col-span-2 mb-4 bg-gray-200 rounded-sm animate-pulse"></div>
                        <div className="h-6 mb-4 bg-gray-200 rounded-sm animate-pulse"></div>
                        <div className="h-6 col-span-3 mb-4 bg-gray-200 rounded-sm animate-pulse"></div>
                        <div className="h-6 mb-4 bg-gray-200 rounded-sm animate-pulse"></div>
                        <div className="h-6 row-span-3 mb-4 bg-gray-200 rounded-sm animate-pulse"></div>
                        <div className="h-6 row-span-2 mb-4 bg-gray-200 rounded-sm animate-pulse"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SkeletonBox;

