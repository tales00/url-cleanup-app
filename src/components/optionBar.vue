<template lang="pug">
section.options(:class="{active}")
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
export default {
  name: 'optionBar',
  props: {
    clearedUrl: { type: String, default: '' },
    active: { type: Boolean, default: false },
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
  }
}
</style>
