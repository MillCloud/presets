<template>
  <transition name="fade-in" mode="out-in" appear>
    <slot></slot>
  </transition>
</template>

<style lang="scss" scoped>
.fade-in-enter-active,
.fade-in-leave-active {
  @apply transition-all;
}
.fade-in-enter-from,
.fade-in-leave-active {
  @apply opacity-0;
}
</style>
