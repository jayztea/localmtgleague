import type {
    PlayerProfile,
    PlayerSummaryStatistics
}
from "../../../types/playerStatistics";


import defaultPlayerAvatar
from "../../../styles/assets/avatars/default-player.png";


import "./PlayerHeader.css";



interface Props {


    player:PlayerProfile;


    summary:PlayerSummaryStatistics;


    onBack:()=>void;


}



export default function PlayerHeader({

    player,

    summary,

    onBack

}:Props){


    return (

        <section className="player-header">


            <div className="player-header-top">


                <button

                    className="player-back-button"

                    onClick={onBack}

                >

                    ← Back

                </button>


            </div>



            <div className="player-profile">


                <div className="player-avatar">


                    <img

                        src={defaultPlayerAvatar}

                        alt="Player profile"

                    />


                </div>



                <div className="player-information">


                    <h1 className="player-name">

                        {
                            player.display_name
                        }

                    </h1>



                    <p className="player-games">

                        {
                            summary.games_played
                        }

                        {" "}

                        Games Played

                    </p>


                </div>


            </div>


        </section>

    );

}