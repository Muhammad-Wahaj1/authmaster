import vine from '@vinejs/vine'

export const createUserValidator = vine.compile(
  vine.object({
    username: vine.string().trim().minLength(3).maxLength(15),
    email: vine.string().trim().email(),
    password: vine.string().minLength(6)
  })
)

export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().trim().email(),
    password: vine.string().minLength(6)
  })
)

export const updateUserValidator = vine.compile(
  vine.object({
    username: vine.string().trim().minLength(3).maxLength(15).optional(),
    email: vine.string().trim().email().optional()
  })
)

export const forgotPasswordValidator = vine.compile(
  vine.object({
   email: vine.string().trim().email()
  })
)

export const resetPasswordValidator = vine.compile(
  vine.object({
   password: vine.string().minLength(6)
  })
)

