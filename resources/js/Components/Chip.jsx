
export default function Chip({ type = "default", children }) {
    const colorClass = {
        default:
            "bg-gray-100 text-gray-800 border border-gray-400",
        success:
            "bg-green-100 text-green-800 border border-green-400",
        info: "bg-blue-100 text-blue-800 border border-blue-400",
        warning:
            "bg-yellow-100 text-yellow-800 dark:bg-gray-700 border border-yellow-400",
        error: "bg-red-100 text-red-800 dark:bg-gray-700 border border-red-400",
    }[type];

    return (
        <span
            className={`font-medium me-2 px-2.5 py-0.5 rounded-full ${colorClass}`}
        >
            {children}
        </span>
    );
}
