import router from '../../router'
import { isNil } from 'lodash'

import { createNewUserFromFirebaseAuthUser } from '../../misc/helpers'
import UsersDB from '../../middelware/api/users-db'

export default {
  /**
   * Callback fired when user login
   */
  login: async ({ state, commit, dispatch }, firebaseAuthUser) => {
    const userFromFirebase = await new UsersDB().read(firebaseAuthUser.uid)
    const user = isNil(userFromFirebase)
      ? await createNewUserFromFirebaseAuthUser(firebaseAuthUser)
      : userFromFirebase
    commit('setUser', user)
    dispatch('questions/getUserQuestions', null, { root: true })
    dispatch('clients/getUserClients', null, { root: true })
    localStorage.setItem('user', JSON.stringify(user))
  },

  /**
   * Callback fired when user logout
   */
  logout: ({ commit }) => {
    commit('setUser', null)
    commit('questions/setQuestions', null, { root: true })
    commit('clients/setClients', null, { root: true })
    localStorage.setItem('user', null)
    const currentRouter = router.app.$route
    if (!(currentRouter.meta && currentRouter.meta.authNotRequired)) {
      router.push('/login')
    }
  }
}
