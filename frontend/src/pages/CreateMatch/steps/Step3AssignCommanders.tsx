import React from "react";


import CommanderSelector
from "../components/CommanderSelector";


import type {
    CreateMatchState
}
from "../types";



interface Props {


    matchState:CreateMatchState;


    setMatchState:
    React.Dispatch<
        React.SetStateAction<CreateMatchState>
    >;


    nextStep:()=>void;


    previousStep:()=>void;


}



export default function Step3AssignCommanders({

    matchState,

    setMatchState,

    nextStep,

    previousStep


}:Props){





function updateCommander(

    playerId:number,

    commanderId:number

){


    setMatchState({

        ...matchState,

        players:

        matchState.players.map(player=>


            player.player_id === playerId

            ?

            {

                ...player,

                selected_commander_id:
                    commanderId

            }


            :

            player


        )


    });


}






function commanderAdded(

    playerId:number,

    commander:any

){


    setMatchState({

        ...matchState,


        players:

        matchState.players.map(player=>


            player.player_id === playerId

            ?

            {

                ...player,


                commanders:[

                    ...player.commanders,

                    commander

                ],


                selected_commander_id:
                    commander.commander_id


            }


            :

            player


        )


    });


}






return (

<div

style={{

padding:"40px"

}}

>


<h1>
(3) Assign Commanders
</h1>


<p>
Select a commander for each player.
</p>




{

matchState.players.map(player=>(


<div

key={
player.player_id
}

style={{

display:"flex",

gap:"40px",

marginBottom:"20px"

}}

>


<div>

{
player.display_name
}

</div>



<CommanderSelector


player={player}


selectedCommanderId={
player.selected_commander_id
}


onChange={
updateCommander
}


onCommanderAdded={
commanderAdded
}


/>


</div>


))


}





<div

style={{

marginTop:"40px",

display:"flex",

justifyContent:"space-between"

}}

>


<button

onClick={previousStep}

>

← Back

</button>



<button

disabled={

matchState.players.some(

player=>
!player.selected_commander_id

)

}


onClick={nextStep}

>

Next →

</button>


</div>


</div>

);


}