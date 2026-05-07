export const Loader = () => {
    return (
        <div
            className="
                relative h-11 w-11
            "
        >
            <div 
                className="
                    h-11 w-11 bg-[--primary-blue-color]
                    rounded-full absolute
                    animate-moveRight
                "
            ></div>
            <div
                className="
                    h-11 w-11 bg-blue-600
                    rounded-full absolute
                    animate-moveLeft
                "
            ></div>
        </div>
    )
}