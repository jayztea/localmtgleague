import {
    useAuth
}
from "../auth/AuthContext";



export default function Dashboard() {


    const {
        user,
        logout
    }
    =
    useAuth();



    return (

        <div className="p-8">


            <h1 className="text-3xl">

                Commander Dashboard

            </h1>


            <p>

                Welcome:
                {" "}
                {user?.email_address}

            </p>


            <button

                className="border px-4 py-2 mt-4"

                onClick={logout}

            >

                Logout

            </button>


        </div>

    );

}