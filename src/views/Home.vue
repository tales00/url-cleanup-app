<template lang="pug">
main.home
  section.uncleanUrl
    h5 未清理網址
    stack.header(
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
    stack.header(
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
        // console.log([...url.searchParams.keys()]);

        let deleteList = [];
        url.searchParams.forEach((value, key) => {
          // console.log(key, key.indexOf('utm_'));
          if (key.toLowerCase().indexOf('utm_') === 0) {
            deleteList.push(key);
          }
          if (key.toLowerCase().indexOf('fbclid') === 0) {
            deleteList.push(key);
          }
        });
        deleteList.forEach((key) => {
          url.searchParams.delete(key);
        });
        // console.log([...url.searchParams.keys()]);
        // console.log(url.searchParams.toString());
        // console.log(url);
        return url.href;
      } else {
        return '網址格式有誤';
      }
    },
  },
  created() {
    console.log('fullPath:', this.$route.fullPath);
    const urlKeyStart = this.$route.fullPath.indexOf('url=');
    if (urlKeyStart > -1) {
      this.uncleanUrlInput = this.$route.fullPath.substring(urlKeyStart + 4);
      console.log('uncleanUrlInput:', this.uncleanUrlInput);
    }
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
