import { AppError } from "./AppError";

export class NotFoundError extends AppError {

    constructor(message: string) {

        super(message, 404);

        Object.setPrototypeOf(this, NotFoundError.prototype);

    }

}