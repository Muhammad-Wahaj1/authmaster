import router from '@adonisjs/core/services/router'
import UsersController from '#controllers/users_controller'
import { middleware } from '#start/kernel'

router.group(() => {
  router.get('/', [UsersController, 'index'])
  router.get('/:id', [UsersController, 'show'])
  router.put('/:id', [UsersController, 'update'])
  router.delete('/:id', [UsersController, 'destroy'])
})
  .prefix('/users')
  .use(middleware.auth({ guards: ['api'] }))   