import pgConnection from "../database/database.js";
import { signUpSchema } from "../schemas/01.signup.schemas.js";

export async function signupValidation(req, res, next) {

    const user = req.body;

    const { error } = signUpSchema.validate(user, { abortEarly: false });

    if (error) {
        const errors = error.details.map((detail) => detail.message);
        return res.status(422).send(errors);
    }

    try {

        const isEmailAllreadyInUse = await pgConnection.query("SELECT email FROM users WHERE email = $1;", [user.email]);

        if (isEmailAllreadyInUse.rowCount !== 0) {
            return res.sendStatus(409);
        }

        res.locals.user = user;
        next();

    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}