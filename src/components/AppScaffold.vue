<template lang="pug">
.AppScaffold
  .main(:style="customMainStyle")
    slot
  header(v-if="$slots['header']" :class="{sticky:isHeaderSticky}")
    slot(name="header")
  footer(v-if="$slots['footer']" :class="{sticky:isFooterSticky}")
    slot(name="footer")
  nav(
    v-if="$slots['nav']"
    :class="{active: isMenuActive}"
    :style="{'--navBgColor': navBgColor}"
    @click.self="$emit('menu-close')"
  )
    .slideMenu(
      :style="customMenuStyle"
    )
      slot(name="nav")
</template>

<script>
export default {
  name: 'AppScaffold',
  props: {
    isMenuActive: { type: Boolean, default: false },
    isHeaderSticky: { type: Boolean, default: true },
    isFooterSticky: { type: Boolean, default: false },
    navBgColor: { type: String, default: 'hsla(0, 0%, 10%, 0.5)' },
    menuWidth: { type: String, default: '12rem' },
    menuMaxWidth: { type: String, default: '40vw' },
    menuHeight: { type: String, default: 'auto' },
    menuMaxHeight: { type: String, default: '24rem' },
    mainWidth: { type: String, default: '100%' },
    mainMaxWidth: { type: String, default: '36rem' },
    mainBgColor: { type: String, default: 'none' },
  },
  computed: {
    customMainStyle() {
      return {
        '--mainWidth': this.mainWidth,
        '--mainMaxWidth': this.mainMaxWidth,
        '--mainBgColor': this.mainBgColor,
      };
    },
    customMenuStyle() {
      return {
        '--menuWidth': this.menuWidth,
        '--menuMaxWidth': this.menuMaxWidth,
        '--menuHeight': this.menuHeight,
        '--menuMaxHeight': this.menuMaxHeight,
      };
    },
  },
  mounted() {
    // slots['nav] 有東西的話才建立 isMenuActive 的 watch
    if ('nav' in this.$slots) {
      this.$watch('isMenuActive', function (isActive) {
        const bodyEL = document.querySelector('body');
        const scrollY = Math.floor(window.scrollY);
        if (isActive) {
          bodyEL.style.position = 'fixed';
          bodyEL.style.top = `-${scrollY}px`;
          bodyEL.setAttribute('data-origin-position', scrollY);
        } else {
          const { originPosition } = bodyEL.dataset;
          bodyEL.style.position = '';
          bodyEL.style.top = '';
          window.scrollTo(0, originPosition);
          bodyEL.removeAttribute('data-origin-position');
        }
      });
    }
  },
};
</script>

<style lang="scss" scoped>
.AppScaffold {
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    'header'
    'main'
    'footer';

  min-height: 100vh;
  max-width: 100vw;
}

header {
  grid-area: header;
  &.sticky {
    position: sticky;
    top: 0;
  }
}
footer {
  grid-area: footer;
  &.sticky {
    position: sticky;
    bottom: 0;
  }
}
.main {
  grid-area: main;
  justify-self: center;

  width: var(--mainWidth);
  max-width: var(--mainMaxWidth);
  background-color: var(--mainBgColor);
}

nav {
  // grid-area: 1 / 1 / -1 / -1;
  position: fixed;
  inset: 0;
  max-height: 100vh;
  max-width: 100vw;
  background-color: var(--navBgColor);
  display: flex;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.1s ease-out;
  overflow: hidden;

  .slideMenu {
    // --menuWidth: clamp(12rem, 60vw, 32rem);
    // background-color: white;
    height: 100%;
    width: var(--menuWidth);
    max-width: var(--menuMaxWidth);
    // max-width: 60vw;
    overflow: hidden;
    transform: translateX(-100%);
    transition: transform 0.3s ease-out;
  }
  &.active {
    pointer-events: auto;
    opacity: 1;
    .slideMenu {
      transform: translateX(0);
    }
  }
}
@media (max-width: 900px) and (orientation: Portrait) and (max-aspect-ratio: 480/320) {
  nav {
    flex-direction: column-reverse;
    align-items: center;
    .slideMenu {
      // --menuMaxHeight: clamp(8rem, 40vh, 16rem);
      height: var(--menuHeight);
      max-height: var(--menuMaxHeight);
      width: calc(100vw - 2rem);
      max-width: unset;
      border-radius: 0.4rem 0.4rem 0 0;
      transform: translateY(100%);
    }
  }
}
</style>
