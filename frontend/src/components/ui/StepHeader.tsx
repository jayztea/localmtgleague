interface Props{

    step:number;

    title:string;

    description:string;

}

export default function StepHeader({

    step,

    title,

    description

}:Props){

    return(

        <div className="step-header">

            <div className="step-title">

                ({step}) {title}

            </div>

            <div className="step-description">

                {description}

            </div>

        </div>

    );

}