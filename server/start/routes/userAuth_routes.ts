import router from '@adonisjs/core/services/router'
import UsersController from '#controllers/users_controller'
import { middleware } from '#start/kernel'


router.group(() => {
  router.post('/register', [UsersController, 'store'])
  router.post('/login', [UsersController, 'login'])
  router.post('/forgot-password', [UsersController, 'forgotPassword'])
  router.post('/reset-password/:token', [UsersController, 'resetPassword'])
  router.patch('/password', [UsersController, 'updatePassword']).use(middleware.auth({ guards: ['api'] }))
  router.post('/logout', [UsersController, 'logout']).use(middleware.auth({ guards: ['api'] }))
})
  .prefix('/users')

