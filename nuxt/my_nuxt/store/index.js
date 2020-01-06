
export const state = () => ({
  pictureInfo: {
    state: false,
    path: ''
  }
})

export const getters = {

}

export const mutations = {
  SET_PICTUREINFO (state, payload) {
    state.pictureInfo = payload
  }
}

export const actions = {
}
