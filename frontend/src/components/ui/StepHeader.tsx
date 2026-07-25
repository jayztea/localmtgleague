interface Props{

    step:number;

    title:string;

    description:string;

    showStep?:boolean;

}


export default function StepHeader({

    step,

    title,

    description,

    showStep = true

}:Props){


    return(

        <div className="step-header">


            <div className="step-title">


                {
                    showStep &&

                    (
                        <>
                            ({step}){" "}
                        </>
                    )
                }


                {title}


            </div>



            <div className="step-description">


                {description}


            </div>


        </div>

    );

}