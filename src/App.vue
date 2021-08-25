<template lang="pug">
AppScaffold(
  :mainBgColor="'hsl(0, 0%, 92%)'"
  :isFooterSticky="true"
)
  template(v-slot:header)
    HeaderBar
  template(v-slot:footer)
    FooterBar
  router-view
</template>

<script>
import AppScaffold from '@/components/AppScaffold.vue';
import HeaderBar from './components/HeaderBar.vue';
import FooterBar from './components/FooterBar.vue';

export default {
  name: 'app',
  components: {
    AppScaffold,
    HeaderBar,
    FooterBar,
  },
};
</script>

<style lang="scss" scoped></style>
