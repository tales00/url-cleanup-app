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
