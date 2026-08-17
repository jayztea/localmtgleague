import {
    useState
}
from "react";



import {
    useNavigate
}
from "react-router-dom";



import {
    createFeedback
}
from "../../services/feedbackService";



import type {
    FeedbackType
}
from "../../types/feedback";



import "./SubmitFeedback.css";



const feedbackTypes: {
    value: FeedbackType;
    label: string;
}[] = [

    {
        value: "BUG",
        label: "Something isn't working"
    },

    {
        value: "FEATURE_REQUEST",
        label: "Feature request"
    },

    {
        value: "CONFUSION",
        label: "Something is confusing"
    },

    {
        value: "OTHER",
        label: "Other"
    }

];



export default function SubmitFeedback(){

    const navigate =
        useNavigate();



    const [
        feedbackType,
        setFeedbackType
    ] =
    useState<FeedbackType>(
        "FEATURE_REQUEST"
    );



    const [
        message,
        setMessage
    ] =
    useState("");



    const [
        isSubmitting,
        setIsSubmitting
    ] =
    useState(false);



    const [
        error,
        setError
    ] =
    useState("");



    const [
        success,
        setSuccess
    ] =
    useState(false);



    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ){

        event.preventDefault();


        setError(
            ""
        );


        if(
            !message.trim()
        ){

            setError(
                "Please enter your feedback."
            );

            return;

        }


        try{

            setIsSubmitting(
                true
            );


            await createFeedback({

                feedback_type:
                    feedbackType,

                message:
                    message.trim()

            });


            setSuccess(
                true
            );


            setMessage("");

        }
        catch(error){

            console.error(
                "Failed to submit feedback:",
                error
            );


            setError(
                "We couldn't submit your feedback. Please try again."
            );

        }
        finally{

            setIsSubmitting(
                false
            );

        }

    }



    function handleBack(){

        navigate(
            -1
        );

    }



    return(

        <div className="submit-feedback-page">


            <div className="submit-feedback-container">


                <button

                    type="button"

                    className="submit-feedback-back-button"

                    onClick={
                        handleBack
                    }

                >

                    ← Back

                </button>



                <div className="submit-feedback-card">


                    <div className="submit-feedback-header">

                        <h1>

                            Submit Feedback

                        </h1>


                        <p>

                            Help us improve Local Magic League.
                            Let us know what's working,
                            what's confusing, or what you'd
                            like to see next.

                        </p>

                    </div>



                    {
                        success &&

                        <div

                            className="submit-feedback-success"

                            role="status"

                        >

                            <strong>

                                Thanks for your feedback!

                            </strong>


                            <span>

                                Your feedback has been submitted
                                successfully.

                            </span>


                            <button

                                type="button"

                                onClick={()=>navigate(
                                    "/dashboard"
                                )}

                            >

                                Return to Dashboard

                            </button>

                        </div>

                    }



                    {
                        !success &&

                        <form

                            className="submit-feedback-form"

                            onSubmit={
                                handleSubmit
                            }

                        >


                            <div className="submit-feedback-field">


                                <label htmlFor="feedback-type">

                                    Feedback Type

                                </label>


                                <select

                                    id="feedback-type"

                                    value={
                                        feedbackType
                                    }

                                    onChange={
                                        event =>
                                            setFeedbackType(
                                                event.target.value as FeedbackType
                                            )
                                    }

                                    disabled={
                                        isSubmitting
                                    }

                                >

                                    {
                                        feedbackTypes.map(
                                            type => (

                                                <option

                                                    key={
                                                        type.value
                                                    }

                                                    value={
                                                        type.value
                                                    }

                                                >

                                                    {
                                                        type.label
                                                    }

                                                </option>

                                            )
                                        )
                                    }

                                </select>


                            </div>



                            <div className="submit-feedback-field">


                                <label htmlFor="feedback-message">

                                    Your Feedback

                                </label>


                                <textarea

                                    id="feedback-message"

                                    value={
                                        message
                                    }

                                    onChange={
                                        event =>
                                            setMessage(
                                                event.target.value
                                            )
                                    }

                                    placeholder="Tell us what you think..."

                                    maxLength={
                                        5000
                                    }

                                    rows={
                                        8
                                    }

                                    disabled={
                                        isSubmitting
                                    }

                                />


                                <div className="submit-feedback-character-count">

                                    {
                                        message.length
                                    }
                                    /5000

                                </div>


                            </div>



                            {
                                error &&

                                <div

                                    className="submit-feedback-error"

                                    role="alert"

                                >

                                    {
                                        error
                                    }

                                </div>

                            }



                            <button

                                type="submit"

                                className="submit-feedback-submit-button"

                                disabled={
                                    isSubmitting ||
                                    !message.trim()
                                }

                            >

                                {
                                    isSubmitting
                                        ? "Submitting..."
                                        : "Submit Feedback"
                                }

                            </button>


                        </form>

                    }


                </div>


            </div>


        </div>

    );

}