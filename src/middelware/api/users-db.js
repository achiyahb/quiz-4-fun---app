import GenericDB from './generic-db'

export default class UsersDB extends GenericDB {
  constructor() {
    super('b2bUsers')
  }

  // Here you can extend UserDB with custom methods
}
