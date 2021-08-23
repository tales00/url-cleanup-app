<template lang="pug">
.header
  stack.container(
    gap="0 0.5rem"
  )
    .title stack
    template(v-slot:left)
      .icon
        router-link(:to="{name:'Home'}")
          i.las.la-home
    template(v-slot:right)
      .icon(slot="right")
        i.las.la-bars
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
  .container {
    padding: 0.5rem;
    .title {
      font-size: 1.4rem;
    }
    .icon {
      font-size: 2rem;
    }
    // ::v-deep {}
  }
}
</style>
