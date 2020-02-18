import * as types from './mutation-types'
export const selectPlay = ({ commit }, { list, index }) => {
    commit(types.SET_CURRENTINDEX, index)
    commit(types.SET_PLAYLIST, list)
    commit(types.SET_ORDERLIST, list)
    commit(types.SET_PLAYING_STATE, true)
    commit(types.SET_FULLSCREEN, true)
}