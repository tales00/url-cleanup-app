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
          input(v-model.trim="uncleanUrlInput")
        .inputArea(v-else)
          textarea(v-model.trim="uncleanUrlInput")
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
        .inputArea
          textarea(v-model="clearedUrl" readonly)
      template(v-slot:left)
        .icon
          i.las.la-magic
      template(v-slot:right)
        .option(v-if="isInputUrl")
          i.las.la-smile-wink.la-lg
        .option(v-else)
          i.las.la-frown.la-lg

  section.options
    .optionsContainer
      .option
        i.las.la-share.la-lg
        | 分享
      .option
        i.las.la-copy.la-lg
        | 複製
      .option
        i.las.la-external-link-alt.la-lg
        | 開啟
      .option
        i.las.la-qrcode.la-lg
        | QRcode

</template>

<script>
import Stack from '@/components/Stack.vue';
const url_pattern =
  /^(http(s)?:\/\/)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/;

export default {
  name: 'Home',
  components: {
    Stack,
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
        return '請輸入欲清理網址';
      } else if (this.isInputUrl) {
        let url = new URL(this.uncleanUrlInput);
        let deleteList = [];
        url.searchParams.forEach((value, key) => {
          // console.log(key, key.indexOf('utm_'));
          if (
            url.hostname.includes('youtube.com') ||
            url.hostname.includes('youtu.be')
          ) {
            if (key.toLowerCase() !== 'v' && key.toLowerCase() !== 't') {
              deleteList.push(key);
            }
          }
          if (key.toLowerCase().indexOf('utm_') === 0) {
            deleteList.push(key);
          }
          if (key.toLowerCase() === 'fbclid') {
            deleteList.push(key);
          }
        });
        deleteList.forEach((key) => {
          url.searchParams.delete(key);
        });
        if (
          url.hostname.includes('amazon.com') ||
          url.hostname.includes('amazon.co.jp')
        ) {
          const matchs = url.pathname.match(/\/dp\/.{10,}\//);
          if (Array.isArray(matchs)) {
            const [dpCode] = matchs;
            url.href = url.origin + dpCode;
          }
        }
        return url.href;
      } else {
        return '網址格式有誤';
      }
    },
  },
  created() {
    const urlKeyStart = this.$route.fullPath.indexOf('url=');
    if (urlKeyStart > -1) {
      this.uncleanUrlInput = this.$route.fullPath.substring(urlKeyStart + 4);
    }
    this.$router.replace('/');
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
.options {
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  .optionsContainer {
    background-color: hsl(202, 58%, 82%);
    display: flex;
    align-items: center;
    justify-content: space-around;
    // font-size: 1.6rem;
    width: clamp(20rem, 90vw, 30rem);
    padding: 0.8rem;
    border-radius: 1rem;
    box-shadow: 0.2rem 0.2rem 1rem hsla(195, 5%, 15%, 0.278);
  }
}
</style>
