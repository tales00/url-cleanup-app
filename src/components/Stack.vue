<template lang="pug">
.stack(:style="{'--gap': gap}")
  .main #[slot]
  .top(v-if="$slots['top']") #[slot(name="top")]
  .bottom(v-if="$slots['bottom']") #[slot(name="bottom")]
  .left(v-if="$slots['left']" :class="{'center': !leftAlignTop}") #[slot(name="left")]
  .right(v-if="$slots['right']" :class="{'center': !rightAlignTop}") #[slot(name="right")]
  .top-left(v-if="$slots['top-left']") #[slot(name="top-left")]
  .top-right(v-if="$slots['top-right']") #[slot(name="top-right")]
  .bottom-left(v-if="$slots['bottom-left']") #[slot(name="bottom-left")]
  .bottom-right(v-if="$slots['bottom-right']") #[slot(name="bottom-right")]
</template>

<script>
export default {
  name: 'stack',
  props: {
    gap: { type: String, default: 'unset' },
    leftAlignTop: {
      type: Boolean,
      default: false,
    },
    rightAlignTop: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.stack {
  // background: transparent;
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    'top-left    top    top-right'
    'left        main   right'
    'bottom-left bottom bottom-right';
  // column-gap: 0.5rem;
  // row-gap: 0.5rem;
  gap: var(--gap);

  .left {
    grid-area: left;
  }
  .right {
    grid-area: right;
  }
  .main {
    grid-area: main;
  }
  .top {
    grid-area: top;
  }
  .bottom {
    grid-area: bottom;
  }
  .top-left {
    grid-area: top-left;
  }
  .top-right {
    grid-area: top-right;
  }
  .bottom-left {
    grid-area: bottom-left;
  }
  .bottom-right {
    grid-area: bottom-right;
  }

  .main,
  .top,
  .bottom,
  .top-left,
  .top-right,
  .bottom-left,
  .bottom-right {
    // margin: 0.25rem;
    align-self: center;
  }
}
.left,
.right {
  &.center {
    align-self: center;
  }
}
.main {
}
.top {
  font-size: 0.9rem;
}
.bottom {
  font-size: 0.7rem;
}

.stack.center {
  .main {
    grid-column: 1 / -1;
    grid-row: 1 / -1;
    align-self: center;
    justify-self: center;
  }
}
</style>
