export interface User {

    user_id: number;

    email_address: string;

    account_type_id: number;

}


export interface LoginResponse {

    token: string;

}