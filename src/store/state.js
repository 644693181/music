import { playMode } from 'common/js/config'
const state = {
    singer: {},
    playing: false,
    fullScreen: false,
    playList: [],
    orderList: [],
    mode: playMode.order,
    currentIndex: -1,
    disc: {},
    topList: []
}
export default state