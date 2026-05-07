export type ErrorInfo = {
    img: string
    title: string
    text: string
}

export type DefaultStatusCode = string

export const Error = ({
    statusCode
}: { statusCode: DefaultStatusCode }) => {

    const statusCodeMap: Record<DefaultStatusCode, ErrorInfo> = {
        "404": {
            img: "https://res.cloudinary.com/essencialdev-cloudinary/image/upload/v1773799872/404_ufkja3.svg",
            title: "Ops! :(",
            text: "Não foi possível encontrar essa página"
        }
    };

    const defaultError: ErrorInfo = {
        img: "https://res.cloudinary.com/essencialdev-cloudinary/image/upload/v1773799872/404_ufkja3.svg",
        title: "Erro",
        text: "Algo deu errado"
    };

    const { img, title, text } = statusCodeMap[statusCode] ?? defaultError;

    return (
        <div className="min-h-dvh flex flex-row justify-center items-center w-full bg-zinc-100 dark:bg-zinc-900 font-inter px-8">
            <section className="w-full flex flex-col justify-center items-center lg:flex-row max-w-5xl gap-8">
                <img className="w-full max-w-md lg:max-w-lg" src={img} alt={title} />

                <div className="w-full text-center lg:text-left flex flex-col justify-center">
                    <h1 className="text-3xl md:text-5xl font-extrabold text-[--primary-blue-color] dark:text-blue-400 leading-normal mb-4">
                        {title}
                    </h1>

                    <p className="text-lg md:text-xl text-[--primary-blue-color] dark:text-blue-400 leading-normal">
                        {text}
                    </p>
                </div>
            </section>
        </div>
    )
}