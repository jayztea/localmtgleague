import api from "./api";

import { Dashboard } from "../types/dashboard";

export async function getDashboard() {

    const response =
        await api.get<Dashboard>(
            "/dashboard"
        );

    return response.data;

}