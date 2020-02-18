import Singer from "components/music/singer";
import Recommend from "components/music/recommend";
import Search from "components/music/search";
import Rank from "components/music/rank";
import Music from '@/pages/music'
import singerDetail from 'components/music/singerDetail'
import discList from 'components/music/discList'
import topList from 'components/music/topList'
export default [{
    path: "/music",
    component: Music,
    name: "musicLink",
    redirect: "/recommend",
    children: [
        {
            path: "/recommend",
            component: Recommend,
            name: "RecommendLink",
            children: [{
                path: ':id',
                component: discList,
                name: 'discLink'
            }]
        },
        {
            path: "/singer",
            component: Singer,
            name: "SingerLink",
            children: [{
                path: ':id',
                component: singerDetail,
                name: 'singerDetail'
            }]
        },
        {
            path: "/rank",
            component: Rank,
            name: "RankLink",
            children: [
                {
                    path: ":id",
                    component: topList,

                }
            ]
        },
        {
            path: "/search",
            component: Search,
            name: "SearchLink"
        }
    ]
}];