import { createHmac } from "crypto";

export const passwordHash = (password) => {
    return createHmac('sha256', password).digest('hex');
}
