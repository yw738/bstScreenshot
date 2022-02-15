<!--  -->
<template>
  <div id="img_bg" v-if="reload">
    <div class="node_title">{{title}}</div>
    <div class="box" v-html="content"></div>
    <button v-if="show" class="btn" @click="init">开始</button>
  </div>
</template>

<script>
import { get } from '@/api/http.js'
export default {
  data() {
    return {
      content2:
        '<div class="wzinfo">\n <h6>\n  【案情简介】\n </h6>\n <div class="contentspan" style="font-size: 16px;font-family: 仿宋;">\n  <p style="text-indent: 2em">\n   2019年4月15日，陈某某因行政诉讼向云南省普洱市六顺镇法律援助工作站提出法律援助申请。陈某某称其父亲于1952年被抽到洗马河参加水库建设，1959年6、7月份，由于身体原因被安排回家，于1960年1月病故。陈某某认为其父病故是修建水库时因公受伤导致的。现诉求政府及有关部门落实补偿政策给予工伤赔偿、给予国家赔偿。陈某某本人为老年人（60岁），没有文化、不懂法律，现家庭经济收入主要靠子女供养维持生活，无力支付法律服务费，故申请给予法律援助。经审查，法律援助中心决定不予法律援助。\n  </p>\n </div>\n <h6>\n  【不予法律援助原因】\n </h6>\n <div class="contentspan" style="font-size: 16px;font-family: 仿宋;">\n  <p style="text-indent: 2em">\n   六顺镇法律援助工作站按照审查程序，经多方走访、调查后，认为陈某某父亲修建水库时因伤导致死亡的直接证据不足；所申请赔偿事由时间间隔约50余年且证据无法进行调查取证。六顺镇法律援助工作站在向思茅区法律援助中心申报相关情况后，由思茅区法律援助中心于2019年4月20日，向陈某某国家赔偿案作出不予法律援助决定书，并出具《不予法律援助决定书》。\n  </p>\n </div>\n <h6>\n  【法律依据】\n </h6>\n <div class="contentspan" style="font-size: 16px;font-family: 仿宋;">\n  <p style="text-indent: 2em">\n   依据《云南省法律援助条例》第二十三条第（二）项：“被申请人不明确或者申请人提供不出案件有关证据且无法调查取证的”及第（四）项“申请事项已超过法定时效”的规定，对陈某某申请的国家赔偿案作出不予法律援助的决定。\n  </p>\n </div>\n</div>\n',
      content: '',
      title: '',
      reload: true,
      show: true,
    }
  },

  created() {},
  async mounted() {
    // debugger
  },
  methods: {
    async startFn() {
      console.log(get)
      let list = []
      list = await get(
        `https://yn.12348.laway.cn/case/libary/?service_type=0&per_page=110&page=1`
      ).then((res) => res.data.result.data)

      for (let i = 0; i < list.length; i++) {
        let item = list[i]
        let params = await get(
          `https://yn.12348.laway.cn/case/libary/view/${item.id}/`
        ).then((res) => res.data.result.data[0])
        let { content, case_title } = params
        this.content = content
        this.title = case_title
        // return
        await this.stemTime()
        await html2canvas(document.querySelector('#img_bg')).then((canvas) => {
          let src = canvas.toDataURL('image/png')
          console.log(`开始导出_法律援助工作截屏_${i + 1} 图片`)
          this.DownloadBase64Img(src, `法律援助截屏_${i + 1}`)
        })
        // this.reloadFn()
      }
    },
    init() {
      this.show = false
      console.log('2秒后开始！')
      setTimeout(() => {
        console.log('开始~')
        this.startFn()
      }, 2000)
    },
    reloadFn() {
      this.reload = false
      this.$nextTick(() => {
        this.reload = true
      })
    },
    DownloadBase64Img(url, name = 'download') {
      let img = url
      let link = document.createElement('a')
      link.href = img
      link.download = `${name}.png`
      link.click()
    },
    stemTime() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve()
        }, 1000)
      })
    },
  },
}
</script>
<style lang='less' scoped>
#img_bg {
  background: url('./img.png') no-repeat;
  background-size: 100% 100%;
  // border: 1px solid red;
  height: 100vh;
  width: 100vw;
  position: relative;
  left: 0;
  top: 0;
}

.node_title {
  font-size: 0.18rem;
  position: absolute;
  top: 1.04rem;
  padding: 0 0.15rem;
  font-weight: bold;
  line-height: 0.27rem;
  letter-spacing: 0rem;
  background: #fff;
  width: 100vw;
  height: 0.51rem;
  box-sizing: border-box;
}

.box {
  // border: 1px solid red;
  height: 104rem;
  width: 100vw;
  position: absolute;
  top: 1.56rem;
  padding: 0 0.15rem;
  background: #fff;
  box-sizing: border-box;
  // margin: 0.18rem 0;
  &/deep/ h6 {
    transform-origin: 0;
    margin: 0.18rem 0;
  }
  &/deep/ p {
    line-height: 0.249rem !important;
    font-size: 0.16rem !important;
    font-weight: bold;
    color: #3c3c3c;
    letter-spacing: 0.0019rem;
    margin: 0;
    font-family: 仿宋;
    &:nth-of-type(1) {
      margin-top: 0.18rem;
    }
  }
  &/deep/ span {
    font-size: 0.16rem !important;
  }
}

.btn {
  position: fixed;
  width: 1rem;
  height: 1rem;
  left: 0.5rem;
  top: 0.5rem;
}
</style>