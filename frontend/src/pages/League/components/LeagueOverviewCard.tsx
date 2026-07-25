interface Props{

    title:string;

    value:string | number;

}

export default function LeagueOverviewCard({

    title,

    value

}:Props){

    return(

        <div className="league-overview-card">

            <div className="league-overview-label">

                {title}

            </div>

            <div className="league-overview-value">

                {value}

            </div>

        </div>

    );

}