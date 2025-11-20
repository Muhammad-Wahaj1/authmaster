import vine from '@vinejs/vine'

export const createTaskValidator = vine.compile(
    vine.object({
        title: vine.string().trim().minLength(3).maxLength(30).escape()
    })
)
export const updateTaskValidator = vine.compile(
    vine.object({
        title: vine.string().trim().minLength(3).maxLength(30).escape().optional(),
        status: vine.enum(['pending', 'completed'] as const).optional()
    })
)

