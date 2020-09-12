import _ from 'lodash'
import { observable, computed, action } from 'mobx'

class Common {
  @observable private _user: pwsp.AnyObject = null!

  @computed get user(): pwsp.AnyObject {
    return this._user
  }

  @action setUser = (user: pwsp.AnyObject) => {
    if (user) {
      this._user = user
    }
  }
}

export default new Common()
