export interface User {
    user_id: number;
    email_address: string;
    password_hash: string;
    account_type_id: number;
    created_date: Date;
}