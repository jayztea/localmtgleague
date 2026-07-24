interface Props{


    previousStep?:()=>void;


    nextStep?:()=>void;


    cancelMatch?:()=>void;


    nextLabel?:string;


    disableNext?:boolean;


}





export default function StepNavigation({


    previousStep,


    nextStep,


    cancelMatch,


    nextLabel="Next →",


    disableNext=false


}:Props){





    return(


        <div className="create-match-actions">





            {

            previousStep &&


                <button


                    className="cm-button cm-button-secondary"


                    onClick={previousStep}


                >


                    ← Back


                </button>

            }







            {

            cancelMatch &&


                <button


                    className="cm-button cm-button-danger"


                    onClick={cancelMatch}


                >


                    Cancel Match


                </button>

            }







            {

            nextStep &&


                <button


                    className="cm-button cm-button-primary"


                    onClick={nextStep}


                    disabled={disableNext}


                >


                    {nextLabel}


                </button>

            }






        </div>


    );


}