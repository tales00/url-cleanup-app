<template lang="pug">
AppScaffold(
  :mainBgColor="'hsl(0, 0%, 92%)'"
)
  template(v-slot:header)
    HeaderBar(
      :installBtnShow="installBtnShow"
      @doInstall="doInstall"
    )
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
  data() {
    return {
      installBtnShow: false,
      isStandalone: false,
      isInstalled: false,
      deferredPrompt: undefined,
    };
  },
  methods: {
    async doInstall() {
      console.log('doInstall');
      this.deferredPrompt.prompt();
      const { outcome } = await this.deferredPrompt.userChoice;
      console.log(`User response to the install prompt: ${outcome}`);
      if ('accepted' === outcome) {
        this.deferredPrompt = null;
        this.installBtnShow = false;
      }
      if ('dismissed' === outcome) {
        this.installBtnShow = true;
      }
    },
  },
  created() {
    this.isStandalone = window.matchMedia('(display-mode: standalone)').matches;
  },
  mounted() {
    window.addEventListener('appinstalled', () => {
      this.isInstalled = true;
    });
    window.addEventListener('beforeinstallprompt', (evn) => {
      // Prevent the mini-infobar from appearing on mobile
      evn.preventDefault();
      // Stash the event so it can be triggered later.
      this.deferredPrompt = evn;
      // Update UI notify the user they can install the PWA
      this.installBtnShow = true;
      // Optionally, send analytics event that PWA install promo was shown.
      console.log(`'beforeinstallprompt' event was fired.`);
    });
  },
};
</script>

<style lang="scss" scoped></style>
