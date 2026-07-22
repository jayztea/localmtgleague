import {

useState

}
from "react";


import {

useNavigate

}
from "react-router-dom";


import {

useAuth

}
from "../auth/AuthContext";




export default function Login(){


const {

login,

register

}
=
useAuth();



const navigate =
useNavigate();



const [mode,setMode] =
useState<
"login"|"register"
>(
"login"
);



const [email,setEmail] =
useState("");



const [password,setPassword] =
useState("");



const [displayName,setDisplayName] =
useState("");



const [error,setError] =
useState("");







async function handleSubmit(

e:React.FormEvent

){


e.preventDefault();


try{


setError("");



if(mode==="login"){


await login(

email,

password

);


}
else{


await register(

email,

password,

displayName

);


}



navigate(
"/dashboard"
);



}
catch(error){


console.error(error);


setError(

mode==="login"

?

"Invalid email or password."

:

"Unable to create account."

);


}



}







return (

<div className="min-h-screen flex items-center justify-center">


<form

onSubmit={handleSubmit}

className="space-y-4"

>


<h1 className="text-2xl">

{

mode==="login"

?

"MTG League Login"

:

"Create Account"

}

</h1>




{error &&

<div>

{error}

</div>

}




{

mode==="register" &&


<input

className="border p-2"

placeholder="Display Name"

value={displayName}

onChange={
e=>
setDisplayName(
e.target.value
)
}

/>


}





<input

className="border p-2"

placeholder="Email"

value={email}

onChange={
e=>
setEmail(
e.target.value
)
}

/>






<input

className="border p-2"

type="password"

placeholder="Password"

value={password}

onChange={
e=>
setPassword(
e.target.value
)
}

/>






<button

className="border px-4 py-2"

type="submit"

>

{

mode==="login"

?

"Login"

:

"Create Account"

}

</button>






<button

type="button"

className="underline"

onClick={()=>{

setMode(

mode==="login"

?

"register"

:

"login"

);

}}

>

{

mode==="login"

?

"Create Account"

:

"Back to Login"

}


</button>



</form>


</div>


);


}