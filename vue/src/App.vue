<template>
  <div id="app">
    <app-header></app-header>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import Header from "./components/layout/Header";

  export default {
    name: 'app',
    components: {
      appHeader: Header,
    },
    data() {
      return {}
    }
  }
</script>

<style lang="scss">
  .fade-enter-active,
  .fade-leave-active {
    transition-duration: 0.3s;
    transition-property: opacity;
    transition-timing-function: ease;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0
  }
</style>
