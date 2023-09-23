import Joi from "joi"

export const userSchema = Joi.object({
    name: Joi.string().required().messages({
        "string.required": "Name is required",
    }),
    email: Joi.string().email({
        minDomainSegments: 2
    }).required().messages({
        "string.required": "Email is required",
        "string.email": "Email format is invalid",
    }),
    password: Joi.string()
        .pattern(
            new RegExp(
                "(?=[A-Za-z0-9]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,}).*$"
            )
        )
        .min(8)
        .required()
        .messages({
            "string.required": "Password is required",
            "string.min": "Password must contain minimum 8 characters",
            "string.pattern.base": "Password must contain minimum 8 characters, one uppercase, one lowercase, and one number",
        }),
})


export const orderSchema = Joi.object({
    customer_name: Joi.string().required().messages({
        "string.required": "Customer name is required",
    }),
    customer_email: Joi.string().required().messages({
        "string.required": "Customer email is required",
    }),
    customer_phone: Joi.string().required().messages({
        "string.required": "Customer phone is required",
    }),
    organization_name: Joi.string().required().messages({
        "string.required": "Organization name is required",
    }),
    organization_website: Joi.string().required().messages({
        "string.required": "Organization address is required",
    }),
    width: Joi.number().required().messages({
        "number.required": "Width is required",
    }),
    length: Joi.number().required().messages({
        "number.required": "Length is required",
    }),
    height: Joi.number().required().messages({
        "number.required": "Height is required",
    }),
    quantity: Joi.number().required().messages({
        "number.required": "Quantity is required",
    }),
    description: Joi.string().required().messages({
        "string.required": "Description is required",
    })
})

