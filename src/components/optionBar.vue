<template lang="pug">
section.options(:class="{active}")
  .optionsContainer
    .option(@click="share")
      i.las.la-share.la-lg
      | 分享
    .option#copy(:data-clipboard-target="copyTarget")
      i.las.la-copy.la-lg
      | 複製
    a.option(:href="clearedUrl" target="_blank")
      i.las.la-external-link-alt.la-lg
      | 開啟
    .option(@click="showQrcode = !showQrcode")
      i.las.la-qrcode.la-lg
      | QRcode

section.qrcode(:class="{active}")
  QrcodeVue(
    renderAs="svg"
    v-if="showQrcode"
    :value="clearedUrl"
    size="180"
    margin="5"
  )

</template>

<script>
import ClipboardJS from 'clipboard';
import QrcodeVue from 'qrcode.vue';
export default {
  name: 'optionBar',
  components: {
    QrcodeVue,
  },
  props: {
    copyTarget: { type: String, default: '' },
    clearedUrl: { type: String, default: '' },
    active: { type: Boolean, default: false },
  },
  data() {
    return {
      showQrcode: false,
    };
  },
  methods: {
    share() {
      if ('share' in navigator) {
        navigator
          .share({
            text: this.clearedUrl,
          })
          .then(() => console.log('成功！'))
          .catch((error) => console.log('發生錯誤', error));
      }
    },
  },
  mounted() {
    new ClipboardJS('#copy');
  },
};
</script>

<style lang="scss" scoped>
.options {
  &:not(.active) {
    opacity: 0;
    pointer-events: none;
  }
  transition: opacity 0.3s ease-out;
  margin-top: 1.5rem;
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

    .option {
      cursor: pointer;
      display: block;
      color: hsl(202, 17%, 20%);
    }
  }
}
.qrcode {
  &:not(.active) {
    opacity: 0;
    pointer-events: none;
  }
  transition: opacity 0.3s ease-out;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: center;
}
</style>
