import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import Middle from '../../components/Middle/Middle';
import Mv from '../../components/Mv/Mv';
import Footer from '../../components/Footer/Footer';

class Home extends Component {

    state = {
        midData: [
            { title: 'HTML', position: '精通', flag: false },
            { title: 'CSS', position: '了解', flag: false },
            { title: 'JS', position: '熟练掌握', flag: false },
            { title: 'NODEJS', position: '精通', flag: false },
            { title: 'LESS', position: '熟练掌握', flag: false },
            { title: 'JQUERY', position: '精通', flag: false },
            { title: 'BOOSTRAP', position: '熟练掌握', flag: false },
            { title: 'GIT', position: '精通', flag: false },
            { title: 'WEBPACK', position: '了解', flag: false },
            { title: 'REACT', position: '精通', flag: false },
            { title: 'AXIOS', position: '了解', flag: false }
        ],
        mvData: [
            {
                "id": 5334103,
                "cover": "http://p1.music.126.net/G09rskU97H10HPPowgUIng==/1426066593488734.jpg",
                "name": "温暖你的冬 录音花絮2",
                "playCount": 61787,
                "briefDesc": null,
                "desc": null,
                "artistName": "欧阳娜娜",
                "artistId": 1087140,
                "duration": 146470,
                "mark": 0,
                "subed": false,
                "artists": [{
                    "id": 1087140,
                    "name": "欧阳娜娜",
                    "alias": ["Nana Ou-yang", "娜比"],
                    "transNames": null
                }]
            }, {
                "id": 10928981,
                "cover": "http://p1.music.126.net/Sacm9rVUjFIagBJ3KLfVHw==/109951164920088043.jpg",
                "name": "BilalTallanma",
                "playCount": 170126,
                "briefDesc": null,
                "desc": null,
                "artistName": "Bilal Enwer",
                "artistId": 1039011,
                "duration": 1455000,
                "mark": 0,
                "subed": false,
                "artists": [{
                    "id": 1039011,
                    "name": "Bilal Enwer",
                    "alias": [],
                    "transNames": null
                }]
            }, {
                "id": 10880673,
                "cover": "http://p1.music.126.net/jvHGykRirEXz1hzqNEnPCA==/109951164240795974.jpg",
                "name": "起风了",
                "playCount": 6033623,
                "briefDesc": "吴青峰热单《起风了》MV公开！",
                "desc": null,
                "artistName": "吴青峰",
                "artistId": 187229,
                "duration": 303000,
                "mark": 0,
                "subed": false,
                "artists": [{
                    "id": 187229,
                    "name": "吴青峰",
                    "alias": ["可人儿", "吴啾咪", "Greeny"],
                    "transNames": null
                }]
            }, {
                "id": 10929612,
                "cover": "http://p1.music.126.net/x9oKLgPzfqKbwExhd1RmRA==/109951164922321089.jpg",
                "name": "덤더럼 (Dumhdurum) | SBS人气歌谣 20/04/19 现场版",
                "playCount": 95710,
                "briefDesc": null,
                "desc": null,
                "artistName": "Apink",
                "artistId": 126277,
                "duration": 226000,
                "mark": 0,
                "subed": false,
                "artists": [{
                    "id": 126277,
                    "name": "Apink",
                    "alias": ["에이핑크", "A pink", "阿粉"],
                    "transNames": ["에이핑크"]
                }]
            }, {
                "id": 10862189,
                "cover": "http://p1.music.126.net/rHAgVJmMnIfFTry6W9tJmw==/109951163962637943.jpg",
                "name": "上学威龙",
                "playCount": 4757901,
                "briefDesc": null,
                "desc": null,
                "artistName": "法老",
                "artistId": 865007,
                "duration": 214000,
                "mark": 0,
                "subed": false,
                "artists": [{
                    "id": 865007,
                    "name": "法老",
                    "alias": [],
                    "transNames": null
                }]
            }, {
                "id": 10862160,
                "cover": "http://p1.music.126.net/H6wSPKjK54lkw0ZJFBIa8Q==/109951163962253077.jpg",
                "name": "bad guy",
                "playCount": 17694915,
                "briefDesc": null,
                "desc": null,
                "artistName": "Billie Eilish",
                "artistId": 11972054,
                "duration": 205000,
                "mark": 0,
                "subed": false,
                "artists": [{
                    "id": 11972054,
                    "name": "Billie Eilish",
                    "alias": ["碧梨", "Billie Eilish Pirate Baird O'Connell"],
                    "transNames": ["比莉·艾利什"]
                }]
            }, {
                "id": 10919322,
                "cover": "http://p1.music.126.net/ZQ-gtRQ9V62nsMV9HKfweg==/109951164771170702.jpg",
                "name": "BTS (방탄소년단) 'Black Swan' Official MV",
                "playCount": 1945495,
                "briefDesc": null,
                "desc": null,
                "artistName": "BTS (防弹少年团)",
                "artistId": 783124,
                "duration": 217000,
                "mark": 0,
                "subed": false,
                "artists": [{
                    "id": 783124,
                    "name": "BTS (防弹少年团)",
                    "alias": ["방탄소년단", "BTS", "Bangtan Boys", "胖蛋", "防弹少年团", "bts 防弹少年团"],
                    "transNames": null
                }]
            }, {
                "id": 5617045,
                "cover": "http://p1.music.126.net/AeqFssNiKB-aKodmx-KhUw==/18793952255574830.jpg",
                "name": "Ablikim-Ablimit ( Talwa Qiz )",
                "playCount": 466199,
                "briefDesc": null,
                "desc": null,
                "artistName": "Ablikim Ablimit",
                "artistId": 12118166,
                "duration": 251030,
                "mark": 0,
                "subed": false,
                "artists": [{
                    "id": 12118166,
                    "name": "Ablikim Ablimit",
                    "alias": null,
                    "transNames": null
                }]
            }, {
                "id": 10929390,
                "cover": "http://p1.music.126.net/2cXJJRroBgy2wULzQ0SQlg==/109951165923968787.jpg",
                "name": "Wheels on the Bus",
                "playCount": 178364,
                "briefDesc": null,
                "desc": null,
                "artistName": "斑马儿歌",
                "artistId": 35229524,
                "duration": 152000,
                "mark": 0,
                "subed": false,
                "artists": [{
                    "id": 35229524,
                    "name": "斑马儿歌",
                    "alias": [],
                    "transNames": null
                }]
            }, {
                "id": 5696012,
                "cover": "http://p1.music.126.net/EknvVEOf8QZos6dwMOWO-w==/109951163053400031.jpg",
                "name": "Uyghur kizi",
                "playCount": 845514,
                "briefDesc": null,
                "desc": null,
                "artistName": "Abdugini Ablikim",
                "artistId": 12038158,
                "duration": 188290,
                "mark": 0,
                "subed": false,
                "artists": [{
                    "id": 12038158,
                    "name": "Abdugini Ablikim",
                    "alias": null,
                    "transNames": null
                }]
            }, {
                "id": 10929614,
                "cover": "http://p1.music.126.net/Rp-IJ6LpijaP1lptAVuCOw==/109951167725323260.jpg",
                "name": "Oh my god | MBC音乐中心 20/04/18 现场版",
                "playCount": 61365,
                "briefDesc": null,
                "desc": null,
                "artistName": "(G)I-DLE",
                "artistId": 14055085,
                "duration": 200000,
                "mark": 0,
                "subed": false,
                "artists": [{
                    "id": 14055085,
                    "name": "(G)I-DLE",
                    "alias": ["(여자)아이들", "Cube新女团", "女孩子", "女孩子们", "여자 아이들", "女娃", "gidle"],
                    "transNames": null
                }]
            }, {
                "id": 10894787,
                "cover": "http://p1.music.126.net/GdOK2X9pAIU3YroZkHHA0w==/109951164417513957.jpg",
                "name": "Phoenix 涅槃 (英雄联盟2019全球总决赛主题曲)",
                "playCount": 5633378,
                "briefDesc": null,
                "desc": null,
                "artistName": "Cailin Russo",
                "artistId": 12334074,
                "duration": 208000,
                "mark": 0,
                "subed": false,
                "artists": [{
                    "id": 12334074,
                    "name": "Cailin Russo",
                    "alias": [],
                    "transNames": null
                }, {
                    "id": 964410,
                    "name": "Chrissy Costanza",
                    "alias": [],
                    "transNames": null
                }, {
                    "id": 1047337,
                    "name": "英雄联盟",
                    "alias": ["英雄联盟", "撸啊撸", "lol", "League of Legends"],
                    "transNames": null
                }]
            }, {
                "id": 10929578,
                "cover": "http://p1.music.126.net/o9Rh84cpIF8BpnGyJTW2gA==/109951165526929399.jpg",
                "name": "Verde",
                "playCount": 20284,
                "briefDesc": null,
                "desc": null,
                "artistName": "J. Balvin",
                "artistId": 309127,
                "duration": 250000,
                "mark": 0,
                "subed": false,
                "artists": [{
                    "id": 309127,
                    "name": "J. Balvin",
                    "alias": ["J Balvin", "j balvin"],
                    "transNames": null
                }, {
                    "id": 999423,
                    "name": "Sky",
                    "alias": ["soft rock /classical band", "soft rock /classical band"],
                    "transNames": null
                }]
            }, {
                "id": 462450,
                "cover": "http://p1.music.126.net/NZSgYJrX1zgOGTP10oqv1g==/7888995930490851.jpg",
                "name": "Counting Sheep (Official Video)",
                "playCount": 6972242,
                "briefDesc": null,
                "desc": null,
                "artistName": "SAFIA",
                "artistId": 986155,
                "duration": 173080,
                "mark": 0,
                "subed": false,
                "artists": [{
                    "id": 986155,
                    "name": "SAFIA",
                    "alias": [],
                    "transNames": null
                }]
            }, {
                "id": 5336769,
                "cover": "http://p1.music.126.net/BRNTmHJI0SilrYPm2t_TMA==/3251255892352165.jpg",
                "name": "小学生广播体操七彩阳光",
                "playCount": 1235198,
                "briefDesc": null,
                "desc": null,
                "artistName": "群星",
                "artistId": 122455,
                "duration": 281920,
                "mark": 0,
                "subed": false,
                "artists": [{
                    "id": 122455,
                    "name": "群星",
                    "alias": ["原声带", "Various Artists", "华语群星"],
                    "transNames": null
                }]
            }
        ]
    }

    // Middle
    changeMid = () => {
        return (i) => {
            // console.log(1)
            let data = this.state.midData;
            data[i].flag = !data[i].flag;

            this.setState({
                midData: data
            })
        }
    }

    render() {
        return (
            <div>
                <Header></Header>
                {/* <Middle {...this.state}></Middle> */}
                <Middle
                    midData={this.state.midData}
                    cg={this.changeMid()}
                ></Middle>
                <Mv
                    mvData={this.state.mvData}
                ></Mv>
                <Footer></Footer>
            </div>
        );
    }
}

export default Home;