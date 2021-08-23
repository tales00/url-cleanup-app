<template lang="pug">
AppScaffold
  template(v-slot:header)
    HeaderBar
  router-view
</template>

<script>
import AppScaffold from '@/components/AppScaffold.vue';
import HeaderBar from './components/HeaderBar.vue';
export default {
  name: 'app',
  components: {
    AppScaffold,
    HeaderBar,
  },
};
</script>
<style lang="scss" scoped></style>
