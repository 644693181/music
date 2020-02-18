import axios from 'axios'
import { Base64 } from 'js-base64'
export default class Song {
    constructor({
        id,
        mid,
        singer,
        name,
        album,
        duration,
        image,
        url
    }) {
        this.id = id
        this.mid = mid
        this.singer = singer
        this.name = name
        this.album = album
        this.duration = duration
        this.image = image
        this.url = url
    }

    async getLrc(mid) {
        if (this.lrcStr) {
            return this.lrcStr
        }
        await axios.post('music/getlrc', { mid }).then(res => {
            this.lrcStr = Base64.decode(res.data.lyric)
            // console.log('lrc:' + this.lrcStr)
        }).catch(err => console.log(err))
        return this.lrcStr
    }


}

export function createSong(songs) {
    return new Song({
        id: songs.id,
        mid: songs.mid,
        singer: songs.singer[0].name,
        name: songs.name,
        album: songs.album.name,
        duration: songs.interval,
        image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${songs.album.mid}.jpg?max_age=2592000`,
        // url: `http://dl.stream.qqmusic.qq.com/${songs.url}`
        url: ``
    })
}
export async function wantSongList(songList) {
    const that = this;
    let songs = [];
    let mid = [];
    let purl = [];
    songList.forEach(song => {
        // console.log(song.songInfo.mid);
        mid.push(song.mid);
        songs.push(createSong(song));
    });
    purl = await getpurl(mid);
    for (let i = 0; i < songs.length; i++) {
        if (!purl[i].purl) {
            songs[i].canPlay = false;
        }
        songs[i].url = `http://dl.stream.qqmusic.qq.com/${purl[i].purl}`;
    }
    // console.log(songs)
    return songs;

    async function getpurl(mid) {
        let purl = [];
        await axios.post("/music/getsong", { mid }).then(res => {
            purl = res.data.req_0.data.midurlinfo;
            // console.log(purl)
        });
        return purl;
    }
}