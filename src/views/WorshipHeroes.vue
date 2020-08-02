<!--  -->
<template>
  <div class="bgcolor-fff lazyloaded section">
    <div class="box hidden-xs">
      <div class="ly clearfix">
        <img src="/images/Heroes/picture/pic.jpg" width="71" height="77" />
      </div>
    </div>
    <div class="bgimg">
      <div class="container">
        <div class="chang_b">
          <div class="xianhua" v-if="switchName.xianhua_num">
            <img src="/images/Heroes/picture/pic1.png" width="525" height="148" />
          </div>
          <div class="gongan">
            <div class="dianzhu" v-if="switchName.dianzhu_num">
              <img id="m3_img" src="/images/Heroes/picture/lazhu.png" width="155" height="123" />
              <div id="m3_swf_container"></div>
            </div>
            <div class="jingjiu" v-if="switchName.jingjiu_num">
              <img src="/images/Heroes/picture/pic8.png" width="155" height="123" />
            </div>
          </div>
          <div class="jingli" v-if="switchName.jingli_num">
            <img id="m5_img" src="/images/Heroes/picture/jingli.gif" width="102" height="155" />
            <div id="m5_swf_container"></div>
          </div>
          <div class="jugong" v-if="switchName.jugong_num">
            <img id="m6_img" src="/images/Heroes/picture/jugong.gif" width="102" height="155" />
            <div id="m6_swf_container"></div>
          </div>

          <transition name="fade">
            <div class="coi_p" id="jidian_op_tips_container" v-if="tips">
              <div class="coi" id="jidian_op_tips_jingjiu">{{tipsText}}</div>
            </div>
          </transition>
        </div>
        <div id="musicbox" class="yin">
          <audio id="audio" loop="loop" autoplay="true">
            <source src="/music/ylzg.mp3" type="audio/mp3" />
          </audio>
          <span id="MusicCtl" :class="{ muted : isMuted }" @click="playMusic"></span>
        </div>
        <div>
          <ul class="clearfix">
            <li @click="show('xianhua_num')">
              <a>献 花</a>
              <span id="xianhua_num">{{xianhua_num}}</span>
            </li>
            <li class="io" @click="show('dianzhu_num')">
              <a>点 烛</a>
              <span id="dianzhu_num">{{dianzhu_num}}</span>
            </li>
            <li class="io1" @click="show('jingjiu_num')">
              <a>敬 酒</a>
              <span id="jingjiu_num">{{jingjiu_num}}</span>
            </li>
            <li class="io2" @click="show('jingli_num')">
              <a>敬 礼</a>
              <span id="jingli_num">{{jingli_num}}</span>
            </li>
            <li class="io3" @click="show('jugong_num')">
              <a>鞠 躬</a>
              <span id="jugong_num">{{jugong_num}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getRecode, editRecode } from '@/api/heroes';
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      switchName: { xianhua_num: false, dianzhu_num: false, jingjiu_num: false, jingli_num: false, jugong_num: false },
      recordUre: {},
      showValue: '',
      status: null,
      isMuted: false,
      tips: false,
      tipsText: '',
      form: {
        id: '',
        title: '',
        description: '',
        content: '',
      },
    };
  },
  computed: {
    ...mapGetters(['xianhua_num', 'dianzhu_num', 'jingjiu_num', 'jingli_num', 'jugong_num']),
  },
  created() {
    this.getHeroesRecode();
  },
  mounted() {},
  methods: {
    show(value) {
      this.showValue = value;
      if (sessionStorage.getItem(value)) {
        this.tipsText = sessionStorage.getItem(value);
        this.tips = true;
        let times = setTimeout(() => {
          this.tips = false;
          clearInterval(times);
        }, 1000);
      } else {
        this.recordUre[value] += 1;
        this.editHeroesRecode();
      }
    },
    getHeroesRecode() {
      let base64 = require('js-base64').Base64;
      // let token = base64.decode("dG9rZW4gNTU0MzE3NTJkM2NmMmQxYmM5N2JlOTllMGYwYzRjNzQyNjU0NWEwMQ==");
      let data = {};
      // let config = {
      //   headers: {
      //     Authorization: token,
      //   },
      // };
      getRecode(data, config).then((response) => {
        let result = response.data;
        this.form['id'] = result.id;
        this.form['title'] = result.files.record.filename;
        this.form['description'] = result.description;
        this.form['content'] = result.files.record.content;
        this.recordUre = JSON.parse(this.form['content']);
        this.$store.dispatch('LocalReload', this.recordUre);
      });
    },
    editHeroesRecode() {
      this.form['content'] = JSON.stringify(this.recordUre);
      let files = {};
      files[this.form.title] = { content: this.form.content };
      let data = {
        description: this.form.description,
        public: true,
        files: files,
      };
      let base64 = require('js-base64').Base64;
      // let token = base64.encode("");
      let token = base64.decode('dG9rZW4gNTU0MzE3NTJkM2NmMmQxYmM5N2JlOTllMGYwYzRjNzQyNjU0NWEwMQ==');
      /**
       * 添加header
       */
      let headers = {
        headers: {
          // 'Content-Type': 'application/json;charset=UTF-8',
          Authorization: token,
        },
      };
      editRecode(data, headers).then((response) => {
        console.log(response.status);
        if (response.status == 200) {
          this.status = 200;
          let result = response.data;
          this.form['id'] = result.id;
          this.form['title'] = result.files.record.filename;
          this.form['description'] = result.description;
          this.form['content'] = result.files.record.content;
          this.recordUre = JSON.parse(this.form['content']);
          this.$store.dispatch('LocalReload', this.recordUre);
          this.switchName[this.showValue] = true;
          if (this.showValue === 'jingli_num') {
            this.switchName.jugong_num = false;
          }
          if (this.showValue === 'jugong_num') {
            this.switchName.jingli_num = false;
          }
          let msg = { xianhua_num: '献花', dianzhu_num: '点烛', jingjiu_num: '敬酒', jingli_num: '敬礼', jugong_num: '鞠躬' };
          sessionStorage.setItem(this.showValue, `你已经${msg[this.showValue]}了`); // 存储数据
        }
      });
    },
    playMusic() {
      this.isMuted = !this.isMuted;
      var audio = document.getElementById('audio');
      if (this.isMuted == true) {
        //停止
        audio.pause();
      } else {
        //播放(继续播放)
        audio.play();
      }
    },
  },
  components: {},
};
</script>

<style scoped>
* {
  box-sizing: content-box;
  margin: 0;
  padding: 0;
  word-break: break-all;
}
.box {
  width: 100%;
  height: auto;
  background: url('/images/Heroes/bg_1.jpg') no-repeat center top;
  margin: 0 auto;
}
.ly {
  max-width: 1000px;
  margin: 0 auto;
  text-align: right;
}
.ly img {
  margin-right: 24px;
  float: right;
}
.ly img::after {
  clear: both;
}

.bgimg {
  background: url('/images/Heroes//wmls-bg.jpg') no-repeat scroll center 0;
  width: 100%;
  height: 773px;
  position: relative;
  z-index: 0;
}
.container {
  position: absolute;
  bottom: 1%;
  left: 50%;
  transform: translate(-50%, -2%);
}
.chang_b {
  width: 682px;
  height: 242px;
  position: relative;
}
.xianhua {
  width: 525px;
  height: 128px;
  top: 0;
  margin: 10px auto;
  padding: 0 8px 0 0;
}
img {
  max-width: 100%;
  height: auto;
  border: none;
  box-sizing: border-box;
}
.gongan {
  width: 155px;
  height: 123px;
  top: 0;
  margin: 0 auto;
  padding: 0 8px 0 0;
}
.dianzhu {
  width: 155px;
  height: 100px;
  top: 60px;
  position: absolute;
}
.jingjiu {
  width: 155px;
  height: 57px;
  position: absolute;
  top: 60px;
}
.jingli {
  width: 99px;
  height: 220px;
  position: absolute;
  top: 60px;
  left: 50%;
  margin: 0 auto;
  margin-left: -55px;
}
.jugong {
  width: 110px;
  height: 220px;
  margin: 0 auto;
  position: absolute;
  top: 60px;
  left: 50%;
  margin-left: -55px;
}
.coi_p {
  bottom: 50%;
  width: 50%;
  height: 18%;
  margin: 0 auto;
  background: url('/images/Heroes//bg7.png') no-repeat;
  line-height: 31px;
  text-align: center;
  color: #fff;
  font-size: 14px;
  position: absolute;
  left: 50%;
  margin-left: -76px;
  top: 190px;
}
.coi {
  width: 153px;
  height: 31px;
  margin: 0 auto;
  background: url('/images/Heroes//bg7.png') no-repeat;
  line-height: 31px;
  text-align: center;
  color: #fff;
  font-size: 14px;
  position: absolute;
  top: 0px;
  left: 0px;
}
.yin {
  position: absolute;
  right: 0;
  bottom: 22%;
  max-width: 69px;
  height: 69px;
}

#MusicCtl {
  display: block;
  width: 60px;
  height: 60px;
  cursor: pointer;
  background: url(/images/Heroes/player.png) 0 0;
}

#MusicCtl.muted {
  background: url('/images/Heroes/player.png') -60px 0;
}

ul {
  padding: 0;
  margin: 0;
  list-style: none;
  background: url('/images/Heroes/bg1.png') no-repeat;
  background-size: 100% 100%;
}
li {
  float: left;
  border-right: 1px solid #555557;
  background: url('/images/Heroes/bg2.png') no-repeat 8px 4px;
  color: #c70000;
  margin: 0 2%;
  width: calc(100% / 5 - 4.15%);
}
li a {
  font-family: 'Microsoft yahei';
  color: #010101;
  font-size: 16px;
  display: block;
  cursor: pointer;
  margin-left: 40%;
}
li span {
  margin-left: 40%;
}
li.io {
  background: url('/images/Heroes/bg3.png') no-repeat 8px 4px;
}
li.io1 {
  background: url('/images/Heroes//bg41.png') no-repeat 0 14px;
}
li.io2 {
  background: url('/images/Heroes//bg5.png') no-repeat 8px 4px;
}
li.io3 {
  border-right: none;
  background: url('/images/Heroes//bg6.png') no-repeat 8px 4px;
}
.site-main {
  display: block;
}

.lazyloaded {
  opacity: 1;
  transition: opacity 1s cubic-bezier(0.77, 0, 0.175, 1);
}
.section {
  background: url('/images/main/bg-2.png');
}
.bgcolor-fff {
  background-color: #fff;
}
/*iPad */
@media (max-width: 750px) {
  .chang_b {
    width: 100%;
  }
  .xianhua {
    width: 100%;
  }
  li {
    margin: 0;
    padding: 0;
    display: table-cell;
    text-align: center;
    width: 4.3rem;
    background: url(/images/Heroes/bg2.png) no-repeat 0 4px;
  }
  ul {
    width: 22rem;
    margin: 0 auto;
    display: table;
  }
  li a {
    font-family: 'Microsoft yahei';
    color: #010101;
    display: block;
    cursor: pointer;
    margin-left: 45%;
  }
}
</style>