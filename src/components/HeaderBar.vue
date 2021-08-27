<template lang="pug">
stack.header(gap="0 0.5rem")
  //- template(v-slot:default)
    .title stack
  template(v-slot:left)
    .icon
      router-link(:to="{name:'Home'}")
        i.las.la-home
  template(v-slot:right)
    .links
      router-link(:to="{name:'Usage'}")
        i.las.la-question-circle.la-lg
        | 說明
      router-link(:to="{name:'About'}")
        i.las.la-info-circle.la-lg
</template>

<script>
import Stack from '@/components/Stack.vue';
// import { mapMutations } from 'vuex';

export default {
  name: 'headerBar',
  components: {
    Stack,
  },
  // methods: {
  //   ...mapMutations(['toggleMenu']),
  // },
};
</script>

<style lang="scss" scoped>
.header {
  background-color: hsl(0, 0%, 94%);
  border-bottom: 1px solid hsl(0, 0%, 80%);
  padding: 0.5rem;
  .icon {
    font-size: 1.4rem;
  }
  // ::v-deep {}
  .links {
    display: flex;
    justify-content: flex-end;
    font-size: 0.8rem;

    & > a {
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
