<template>
  <div :style="asideWidth" class="scrollbar-wrapper" @mouseenter="handleClickOutside" @mouseleave="handleClickOutside">
    <!--<div class="menu-wrapper">-->
    <!--<svg-icon icon-class="list" />-->
    <!--<span v-text="generateTitle('allMenus')" />-->
    <!--<span class='sidebar-toolbar'>-->
    <!--<span class='sidebar-icon-box'>-->
    <!--<i class='el-icon-more' />-->
    <!--</span>-->
    <!--</span>-->
    <!--</div>-->
    <el-scrollbar>
      <el-menu
        :show-timeout="200"
        :default-active="$route.path"
        :collapse="isCollapse"
        mode="vertical"
        background-color="#202a37"
        text-color="#FFFFFF"
        active-text-color="#01CEA2"
      >
        <draggable
          :options="{handle:'.sidebar-icon-box-drag'}"
          :list="permission_routers"
          element="div"
          class="draggable-wrapper"
          @end="dragEnd">
          <sidebar-item v-for="route in permission_routers" :key="route.path" :item="route" :base-path="route.path"/>
        </draggable>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import draggable from 'vuedraggable'
import { generateTitle } from '@/utils/i18n'
import SidebarItem from './SidebarItem'

export default {
  components: { SidebarItem, draggable },
  computed: {
    ...mapGetters([
      'permission_routers',
      'sidebar'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    },
    asideWidth() {
      return {
        width: this.sidebar.opened ? '300px' : '64px'
      }
    }
  },
  methods: {
    handleClickOutside(e) {
      if (e.type === 'mouseenter') {
        this.$store.dispatch('toggleSideBar', true)
      } else if (e.type === 'mouseleave') {
        this.$store.dispatch('toggleSideBar', false)
      }
    },
    dragEnd: evt => {
      console.log(evt)
    },
    generateTitle
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
