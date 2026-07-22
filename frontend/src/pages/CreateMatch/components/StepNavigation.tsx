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



            <button


                className="cm-button cm-button-secondary"


                onClick={previousStep}


                disabled={!previousStep}


            >


                ← Back


            </button>





            <button


                className="cm-button cm-button-danger"


                onClick={cancelMatch}


                disabled={!cancelMatch}


            >


                Cancel Match


            </button>






            <button


                className="cm-button cm-button-primary"


                onClick={nextStep}


                disabled={disableNext}


            >


                {nextLabel}


            </button>



        </div>


    );


}