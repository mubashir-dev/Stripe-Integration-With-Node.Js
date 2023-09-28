import * as bcrypt from "bcrypt";
const SALT_ROUNDS = 10

export async function encrypt(password: string, salt: string) {
    const encryptedPassword = bcrypt.hashSync(password, salt)
    return encryptedPassword;
}

export async function compare(password: string, hashed: string) {
    const isMatched = await bcrypt.compare(password, hashed)
    return isMatched;
}

export async function randomSalt() {
    return await bcrypt.genSalt(SALT_ROUNDS);
}