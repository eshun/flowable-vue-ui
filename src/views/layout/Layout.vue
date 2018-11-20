<template>
  <el-container :class="classObj" class="app-wrapper">
    <el-aside width="60px" class="aside-container">
      <sidebar/>
      <div v-if="sidebar.opened" class="drawer-bg" @click="handleClickOutside"/>
    </el-aside>
    <el-main class="main-container">
      <navbar/>
      <tags-view/>
      <app-main/>
    </el-main>
  </el-container>
</template>

<script>
import { Navbar, Sidebar, AppMain, TagsView } from './components'
import ResizeMixin from './mixin/ResizeHandler'

export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain,
    TagsView
  },
  mixins: [ResizeMixin],
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    classObj() {
      return {
        sidebarDrawerOpen: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('toggleSideBar')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
  .app-wrapper {
    @include clearfix;
    @include relative;
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 98;
  }
</style>
