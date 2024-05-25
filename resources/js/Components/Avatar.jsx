import { useEffect, useState } from "react";

export default function Avatar({
    src,
    alt,
    className,
    size = "md",
}) {
    const [error, setError] = useState(false);

    let sizeClass = "h-8 w-8";

    if (size === "sm") {
        sizeClass = "h-6 w-6";
    }

    if (size === "lg") {
        sizeClass = "h-10 w-10";
    }

    useEffect(() => {
        if (!src) {
            setError(true);
        }
    }, [src]);

    return (
        <>
            {!error && (
                <img
                    className={`inline-block ${sizeClass} rounded-full ring-1 ring-gray-800 ${className}`}
                    src={src}
                    alt={alt}
                    onError={() => setError(true)}
                />
            )}
            {error && (
                <div
                    className={`inline-block ${sizeClass} rounded-full ring-1 ring-gray-800 flex items-center justify-center font-bold ${className}`}
                    style={{ backgroundColor: stringToColor(alt) }}
                >{`${alt.split(" ")[0][0]}${alt.split(" ")[1][0]}`}</div>
            )}
        </>
    );
}

function stringToColor(string) {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
}
