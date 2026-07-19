interface Props {

    title:string;

    value:string | number;

}



export default function StatCard(
    {
        title,
        value
    }:Props
) {

    return (

        <div className="border rounded-lg p-4 shadow-sm">

            <p className="text-gray-500 text-sm">

                {title}

            </p>


            <p className="text-3xl font-bold">

                {value}

            </p>

        </div>

    );

}