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
        .icon
          i.las.la-ruler-horizontal
      template(v-slot:right)
        .option(v-if="!isInputExpand")
          i.las.la-plus-square.la-lg
        .option(v-else)
          i.las.la-minus-square.la-lg
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
// const is_url = url => (/^(http(s)?:\/\/)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/.test(url)? url : false)

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
      return this.isInputUrl
        ? '清理結果'
        : this.uncleanUrlInput.length == 0
        ? '請輸入欲清理網址'
        : '網址格式有誤';
    },
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
