import type {
    LeaguePlayer
} from "../../types/match";


interface Props {

    players:LeaguePlayer[];

    selected:number[];

    onChange:
        (
            playerIds:number[]
        )=>void;

}



export default function PlayerSelector(
    {
        players,
        selected,
        onChange
    }:Props
){


    function togglePlayer(
        playerId:number
    ){

        if(selected.includes(playerId)){

            onChange(

                selected.filter(
                    id =>
                    id !== playerId
                )

            );

            return;

        }


        onChange(
            [
                ...selected,
                playerId
            ]
        );

    }



    return (

        <div>

            <h2
                className="
                    text-xl
                    font-semibold
                    mb-4
                "
            >
                Select Players
            </h2>


            {

                players.map(

                    player => (

                        <label

                            key={
                                player.player_id
                            }

                            className="
                                flex
                                items-center
                                gap-3
                                border
                                rounded
                                p-3
                                mb-2
                            "

                        >

                            <input

                                type="checkbox"

                                checked={
                                    selected.includes(
                                        player.player_id
                                    )
                                }

                                onChange={()=>

                                    togglePlayer(
                                        player.player_id
                                    )

                                }

                            />


                            <span>

                                {
                                    player.display_name
                                }

                            </span>


                        </label>

                    )

                )

            }


        </div>

    );

}