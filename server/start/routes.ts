/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import '#start/routes/userAuth_routes'
import '#start/routes/userProfile_routes'
import '#start/routes/task_routes'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})
