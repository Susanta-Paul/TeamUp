import {body} from "express-validator"


export const userProfileUpdateValidation=[
    body("fullname").trim().notEmpty().isString(),
    body("city").optional({values: 'falsy'}).trim().notEmpty().isString(),
    body("state").optional({values: 'falsy'}).trim().notEmpty().isString(),
    body("country").optional({values: 'falsy'}).trim().notEmpty().isString(),
    body("skills").optional({values: "falsy"}).isArray(),
    body("skills.*").optional({values: "falsy"}).trim().isString(),
    body("interests").optional({values: "falsy"}).isArray(),
    body("interests.*").optional({values: "falsy"}).trim().isString(),
    body("goal").trim().notEmpty().isString().isIn(["Hackathon", "Study Buddy", "Co-Founder"])
]

export const userChangePasswordValidation=[
    body("oldPassword").trim().notEmpty().isString().isLength({min: 6}),
    body("newPassword").trim().notEmpty().isString().isLength({min: 6})
]