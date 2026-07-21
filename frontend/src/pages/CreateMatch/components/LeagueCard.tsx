import React from "react";


interface League {

    league_id:number;

    league_name:string;

}


interface LeagueCardProps {

    league:League;

    selected:boolean;

    onSelect:(league:League)=>void;

}



const LeagueCard = ({
    league,
    selected,
    onSelect

}:LeagueCardProps)=>{


    return (

        <div

            onClick={()=>onSelect(league)}

            style={{

                border:selected
                    ? "2px solid blue"
                    : "1px solid gray",

                borderRadius:"8px",

                padding:"20px",

                cursor:"pointer",

                width:"250px",

                textAlign:"center"

            }}

        >

            <h3>
                {league.league_name}
            </h3>


            <div

                style={{

                    height:"120px",

                    background:"#eee",

                    display:"flex",

                    alignItems:"center",

                    justifyContent:"center",

                    marginTop:"15px"

                }}

            >

                League Image

            </div>


        </div>

    );

};


export default LeagueCard;