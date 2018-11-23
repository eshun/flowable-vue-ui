<template>
  <div v-if="!item.hidden" class="menu-wrapper">
    <template>
      <menu-item
        :index="resolvePath(item.path)"
        :class="{'submenu-title-noDropdown':!isNest}"
        :icon="item.meta.icon"
        :title="generateTitle(item.meta.title)"
        @toggleRemove="toggleRemove(item)" />
    </template>
  </div>
</template>

<script>
import path from 'path'
import { Message } from 'element-ui'
import { generateTitle } from '@/utils/i18n'
import { isExternal } from '@/utils'
import MenuItem from './MenuItem'
import Item from './Item'
import AppLink from './Link'
import FixiOSBug from './FixiOSBug'

export default {
  name: 'SidebarItem',
  components: { MenuItem, Item, AppLink },
  mixins: [FixiOSBug],
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      onlyOneChild: null
    }
  },
  methods: {
    hasOneShowingChild(children, parent) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item
          return true
        }
      })

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ... parent, path: '', noShowingChildren: true }
        return true
      }

      return false
    },
    resolvePath(routePath) {
      if (this.isExternalLink(routePath)) {
        return routePath
      }
      return path.resolve(this.basePath, routePath)
    },
    isExternalLink(routePath) {
      return isExternal(routePath)
    },
    toggleRemove(item) {
      if (!item.alwaysShow) {
        this.$store.dispatch('removeFavorites', { name: item.name, path: item.path })
      } else {
        Message.error('alwaysShow no unStart')
      }
    },
    generateTitle
  }
}
</script>
