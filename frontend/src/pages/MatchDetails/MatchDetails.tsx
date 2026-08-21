import {
    useEffect,
    useState
}
from "react";


import {
    useNavigate,
    useParams
}
from "react-router-dom";


import StepHeader
from "../../components/ui/StepHeader";


import {
    getMatchDetails,
    getMatchPermissions,
    deleteMatch
}
from "../../services/matchDetailsService";


import type {
    MatchDetails as MatchDetailsType
}
from "../../types/match";


import "./MatchDetails.css";








export default function MatchDetails(){


    const navigate =
        useNavigate();


    const {
        matchId
    }
    =
    useParams();




    const [
        match,
        setMatch
    ]
    =
    useState<MatchDetailsType | null>(null);




    const [
        loading,
        setLoading
    ]
    =
    useState(true);




    const [
        canManage,
        setCanManage
    ]
    =
    useState(false);




    const [
        deleting,
        setDeleting
    ]
    =
    useState(false);






    useEffect(()=>{


        async function load(){


            try{


                if(!matchId)

                    return;


                const id =
                    Number(matchId);


                const data =

                    await getMatchDetails(
                        id
                    );


                setMatch(
                    data
                );


                const permissions =

                    await getMatchPermissions(
                        id
                    );


                setCanManage(
                    permissions.canManage
                );


            }
            catch(error){


                console.error(
                    error
                );


            }
            finally{


                setLoading(
                    false
                );


            }


        }


        load();


    },[matchId]);








    async function handleDelete(){


        if(!matchId)

            return;


        const confirmed =

            window.confirm(

                "Are you sure you want to delete this match? This will remove it from league statistics and player history."

            );


        if(!confirmed)

            return;


        try{


            setDeleting(
                true
            );


            await deleteMatch(

                Number(matchId)

            );


            alert(

                "Match deleted successfully."

            );


            if(match){


                navigate(

                    `/league/${match.league.league_id}`

                );


            }


        }
        catch(error){


            console.error(

                "Failed to delete match",

                error

            );


            alert(

                "Unable to delete match."

            );


        }
        finally{


            setDeleting(
                false
            );


        }


    }








    if(loading){


        return (

            <div className="match-details-page">

                Loading Match...

            </div>

        );

    }








    if(!match){


        return (

            <div className="match-details-page">

                Match not found.

            </div>

        );

    }








    return (

        <div className="match-details-page">


            <StepHeader

                step={0}

                showStep={false}

                title="Match Details"

                description="Review the recorded match results."

            />




            <button

                className="match-back-button"

                onClick={()=>


                    navigate(

                        `/league/${match.league.league_id}`

                    )


                }

            >

                ← Back to League

            </button>




            {

                canManage &&

                <div className="match-actions">


                    <button

                        className="match-edit-button"

                        onClick={()=>


                            navigate(

                                `/matches/${match.match_id}/edit`

                            )


                        }

                    >

                        Edit Match

                    </button>




                    <button

                        className="match-delete-button"

                        onClick={
                            handleDelete
                        }

                        disabled={
                            deleting
                        }

                    >

                        {

                            deleting

                            ?

                            "Deleting..."

                            :

                            "Delete Match"

                        }

                    </button>


                </div>

            }




            <div className="review-layout">


                <div className="summary-card">


                    <h2>

                        Match Summary

                    </h2>




                    <p>

                        <strong>

                            League:

                        </strong>

                        {" "}

                        {match.league.league_name}

                    </p>




                    <p>

                        <strong>

                            Date:

                        </strong>

                        {" "}

                        {

                            new Date(
                                match.match_date
                            )
                            .toLocaleDateString()

                        }

                    </p>




                    <p>

                        <strong>

                            Players:

                        </strong>

                        {" "}

                        {match.players.length}

                    </p>


                </div>




                <div className="review-results">


                    {

                        match.players.map(player=>(


                            <div

                                key={
                                    player.player_id
                                }

                                className="review-player-card"

                            >


                                <div className="review-placement">

                                    #{player.finish_position}

                                </div>




                                <div className="review-player-content">


                                    <div className="review-player-name">

                                        {
                                            player.display_name
                                        }

                                    </div>




                                    <div className="review-commander">

                                        {
                                            player.commander_name
                                        }

                                    </div>




                                    {

                                        player.secondary_commander_id &&

                                        player.secondary_commander_name &&

                                        <div className="review-secondary-commander">

                                            + {

                                                player.secondary_commander_name

                                            }

                                        </div>

                                    }


                                </div>


                            </div>


                        ))

                    }


                </div>


            </div>


        </div>

    );

}