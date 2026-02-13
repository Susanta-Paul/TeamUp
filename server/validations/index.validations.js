import {body} from "express-validator"

export const registerValidation=[
    body("username").isString().trim().isLowercase().notEmpty().isLength({min: 4}),
    body("email").isEmail().trim().isLowercase().notEmpty().normalizeEmail().isLength({min: 11}),
    body("password").isString().notEmpty().isLength({min: 6})
]

export const loginValidation=[
    body("username").isString().trim().isLowercase().notEmpty().isLength({min: 4}),
    body("password").isString().notEmpty().isLength({min: 6})
]
