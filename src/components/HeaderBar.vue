<template lang="pug">
stack.header(gap="0 0.5rem")
  template(v-slot:default)
    .title Url cleanup app
  template(v-slot:left)
    .icon
      router-link(:to="{name:'Home'}")
        img.logo(src="@/assets/logo.png")
  template(v-slot:right)
    .links
      .install(v-if="installBtnShow" @click="$emit('doInstall')")
        i.las.la-cloud-download-alt.la-lg
        | 安裝
      router-link(:to="{name:'Usage'}")
        i.las.la-question-circle.la-lg
        | 說明
      router-link(:to="{name:'About'}")
        i.las.la-info-circle.la-lg
</template>

<script>
import Stack from '@/components/Stack.vue';

export default {
  name: 'headerBar',
  props: {
    installBtnShow: { type: Boolean, default: false },
  },
  components: {
    Stack,
  },
};
</script>

<style lang="scss" scoped>
.header {
  background-color: hsl(0, 0%, 94%);
  border-bottom: 1px solid hsl(0, 0%, 80%);
  padding: 0.5rem;
  .title {
    font-size: 1.2rem;
  }
  .icon {
    font-size: 1.4rem;

    img {
      display: block;
    }
    .logo {
      width: 2rem;
    }
  }
  // ::v-deep {}
  .links {
    display: flex;
    justify-content: flex-end;
    font-size: 0.8rem;

    & > a,
    .install {
      display: block;
      padding: 0.2rem 0.4rem;
      border: 1px solid transparent;
      border-radius: 0.4rem;
      &.router-link-active {
        background-color: hsl(0, 0%, 91%);
        border-color: hsl(0, 0%, 86%);
      }
    }
  }
}
</style>
