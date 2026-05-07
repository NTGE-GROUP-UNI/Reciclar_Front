//BORING AVATARS
import Avatar from "boring-avatars"

//HOOKS
import { useAvatar } from "../../../hooks/avatar/useAvatar"
import { useUser } from "../../../hooks/user/useUser";

export const Profile = () => {

    const { payload } = useAvatar((state) => state);
    const { displayName } = useUser((state) => state);

    return (
        <div
            className="
                md:flex flex-col gap-4 hidden
                justify-center items-center
            "
        >
            <div
                className="
                grid place-items-center
                relative
            "
            >
                <Avatar
                    height={80}
                    width={80}
                    colors={payload.colors}
                    name={payload.name}
                    variant="marble"
                    className="
            shadow-md rounded-full
        "
                />

                <span
                    className="
                    absolute text-2xl font-bold text-zinc-50 top-[50%]
                    left-[50%] -translate-x-[50%] -translate-y-[50%]
                "
                >
                    {displayName.slice(0, 2)}
                </span>
            </div>

            <h1
                className="
                    text-xl ${themeStyles.name}
                    font-medium leading-normal
                    transition-colors duration-300
                    text-zinc-200
                "
            >
                {displayName}
            </h1>
        </div>
    )
}