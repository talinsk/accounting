<template>
  <transition name="fade">
    <div v-if="shown" :class="[$style.context]" :style="styles">
      <div
        v-for="item in items"
        :key="item.text"
        :class="[$style.contextitem]"
        @click="onClick(item)"
      >
        <font-awesome-icon :icon="['fas', item.icon]" />
        {{ item.text }}
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data () {
    return {
      items: [],
      shown: false,
      xPos: 0,
      yPos: 0
    }
  },
  methods: {
    onClick (item) {
      item.action()
      this.onClose()
    },
    onShow ({ items, caller }) {
      this.shown = true
      this.items = items
      this.setPosition(caller)
    },
    onClose () {
      this.shown = false
      this.items = []
    },
    setPosition (caller) {
      const computed = caller.getBoundingClientRect()
      this.xPos = computed.left
      this.yPos = computed.top
    }
  },
  computed: {
    styles () {
      return {
        top: `${this.yPos}px`,
        left: `${this.xPos + 30}px`
      }
    }
  },
  mounted () {
    this.$context.EventBus.$on('show', this.onShow)
    this.$context.EventBus.$on('close', this.onClose)
  },
  beforeDestroy () {
    this.$context.EventBus.$off('show', this.onShow)
    this.$context.EventBus.$off('close', this.onClose)
  }
}
</script>

<style module lang="scss">
.context {
  position: absolute;
  padding: 8px;
  border-radius: 3px;
  box-shadow: 0 0 12px rgba(54, 54, 54, 0.5);
  font-weight: bold;
  font-size: 16px;
  color: rgb(119, 119, 119);
  cursor: pointer;
  line-height: 2;

  .contextitem {
    &:hover {
      color: rgb(61, 61, 61);
    }
  }
}

.context:after {
  content: '';
  position: absolute;
  border: 10px solid transparent;
  border-right: 10px solid rgb(255, 255, 255);
  left: -17px;
  bottom: 50px;
}

:global(.fade-enter-active), :global(.fade-leave-active) {
  transition: opacity 1s;
}

:global(.fade-enter), :global(.fade-leave-to) {
  opacity: 0;
}
</style>
