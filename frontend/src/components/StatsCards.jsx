const StatsCards = ({ title, count, icon }) => {
    return (
            <div className="bg-white shadow rounded p-4 flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-500">{title}</p>
                    <p className="text-xl font-bold">{count}</p>
                </div>
                {icon}
            </div>
    )
}

export default StatsCards