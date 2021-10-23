<template lang="pug">
main.home
  section.uncleanUrl
    h5 未清理網址
    stack(
      gap="0 0.5rem"
      :leftAlignTop="isInputExpand"
      :rightAlignTop="isInputExpand"
    )
      template(v-slot:default)
        .inputArea(v-if="!isInputExpand")
          input(v-model.trim="uncleanUrlInput" placeholder="請輸入欲清理網址")
        .inputArea(v-else)
          textarea(v-model.trim="uncleanUrlInput" placeholder="請輸入欲清理網址")
      template(v-slot:left)
        .icon(:style="{paddingTop: isInputExpand? '12px' : 'unset'}")
          i.las.la-ruler-horizontal
      template(v-slot:right)
        .option(@click="isInputExpand = !isInputExpand" :style="{paddingTop: isInputExpand? '12px' : 'unset'}")
          i.las.la-plus-square.la-lg(v-if="!isInputExpand")
          i.las.la-minus-square.la-lg(v-else)

  section.clearedUrl
    h5 已清理網址
    stack(
      gap="0 0.5rem"
      :leftAlignTop="true"
      :rightAlignTop="true"
    )
      template(v-slot:default)
        .inputArea#clearedUrl
          textarea(v-model="clearedUrl" rows="3" readonly)
      template(v-slot:left)
        .icon
          i.las.la-magic
      template(v-slot:right)
        .option(v-if="isInputUrl")
          i.las.la-smile-wink.la-lg
        .option(v-else)
          i.las.la-frown.la-lg

  OptionBar(
    copyTarget="#clearedUrl"
    :clearedUrl="clearedUrl"
    :active="isOptionBarActive"
  )
  
</template>

<script>
import Stack from '@/components/Stack.vue';
import OptionBar from '@/components/optionBar.vue';
const url_pattern =
  /^(http(s)?:\/\/)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/;

// https%3A%2F%2Fcrossing.cw.com.tw%2Farticle%2F15127%3Futm_source%3Dmedia_others%26utm_medium%3Dsocial%26utm_campaign%3Dmedia_others-social-group
export default {
  name: 'Home',
  components: {
    Stack,
    OptionBar,
  },
  data() {
    return {
      isInputExpand: false,
      uncleanUrlInput: '',
    };
  },
  computed: {
    isInputUrl() {
      return url_pattern.test(this.uncleanUrlInput);
    },
    clearedUrl() {
      if (this.uncleanUrlInput.length == 0) {
        return '';
      } else if (this.isInputUrl) {
        let url = new URL(this.uncleanUrlInput);
        let deleteList = [];
        url.searchParams.forEach((value, key) => {
          // 清除 youtube 除了影片序號與時間戳記之外的所有參數
          // https://www.youtube.com/watch?v=aWv2KjaFqBA&ab_channel=SuiseiChannel&t=99
          // https://www.youtube.com/watch?v=aWv2KjaFqBA&t=99
          if (
            url.hostname.includes('youtube.com') ||
            url.hostname.includes('youtu.be')
          ) {
            if (key.toLowerCase() !== 'v' && key.toLowerCase() !== 't') {
              deleteList.push(key);
            }
          }

          // https://twitter.com/takanashikiara/status/1451693159675744263?s=21
          if (
            url.hostname.includes(twitter.com) &&
            url.pathname.split('/').includes('status') &&
            ['s', 't'].includes(key)
          ) {
            deleteList.push(key);
          }

          // 清除 udn 的 from
          if (url.hostname.includes('https://udn.com/news/')) {
            deleteList.push('from');
          }

          // 清除 ettoday 的 from
          if (url.hostname.includes('https://www.ettoday.net/')) {
            deleteList.push('from');
          }

          // 清除 utm 相關參數
          if (key.toLowerCase().indexOf('utm_') === 0) {
            deleteList.push(key);
          }
          // 清除 gciid
          if (key.toLowerCase() === 'gclid') {
            deleteList.push(key);
          }
          // 清除 fblciid
          if (key.toLowerCase() === 'fbclid') {
            deleteList.push(key);
          }
        });

        // 清理 amazone 產品頁或商品頁網址多餘的資訊
        if (
          url.hostname.includes('amazon.com') ||
          url.hostname.includes('amazon.co.jp')
        ) {
          // https://www.amazon.co.jp/b/ref=LL_BJCC_21_YuruCamp?node=8517075051&pf_rd_r=A4WCERF0E58ECKZXP2RS&pf_rd_p=bce4d981-d8bb-40c8-a32e-9ebead67acb7&pd_rd_r=5853d4ee-7823-4b40-acbd-e1d9185ffa3e&pd_rd_w=2twEO&pd_rd_wg=Tc8bC&ref_=pd_gw_unk
          // https://www.amazon.co.jp/b?node=8517075051
          if (url.searchParams.has('node')) {
            url.href =
              'https://www.amazon.co.jp/b?node=' + url.searchParams.get('node');
          }

          // https://www.amazon.co.jp/SEASON2-%E3%83%9F%E3%83%8B%E3%83%95%E3%82%A3%E3%82%AE%E3%83%A5%E3%82%A2-%E5%90%84%E5%8B%99%E5%8E%9F%E3%81%AA%E3%81%A7%E3%81%97%E3%81%93-Season2-%E5%85%A8%E9%AB%98%E7%B4%8470mm/dp/B08TXWGZ97/358-1070615-8404901?psc=1
          // https://www.amazon.co.jp/dp/B08TXWGZ97/

          const merchPattern = /\/dp\/.{10,}\//;
          if (merchPattern.test(url.pathname)) {
            const [dpCode] = url.pathname.match(merchPattern);
            url.href = url.origin + dpCode;
          }
        }
        //
        deleteList.forEach((key) => {
          url.searchParams.delete(key);
        });

        return url.href;
      } else {
        return '網址格式有誤';
      }
    },
    isOptionBarActive() {
      return url_pattern.test(this.clearedUrl);
    },
  },
  created() {
    const urlKeyStart = this.$route.fullPath.indexOf('text=');
    if (urlKeyStart > -1) {
      const decodeURL = decodeURIComponent(
        this.$route.fullPath.substring(urlKeyStart + 5),
      );
      this.uncleanUrlInput = decodeURL;
    }
    // this.$router.replace('/');
  },
};
</script>

<style lang="scss" scoped>
.home {
  padding: 1rem;
}

.uncleanUrl,
.clearedUrl {
  .inputArea {
    display: flex;
    input,
    textarea {
      flex-grow: 1;
    }
  }
}
</style>
