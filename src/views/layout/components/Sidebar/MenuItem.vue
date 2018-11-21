<template>
  <li
    :style="[paddingStyle, itemStyle, { backgroundColor }]"
    :class="{
      'is-active': active,
      'is-disabled': disabled
    }"
    class="el-menu-item"
    role="menuitem"
    tabindex="-1"
    @click="handleClick"
    @mouseenter="onMouseEnter"
    @focus="onMouseEnter"
    @blur="onMouseLeave"
    @mouseleave="onMouseLeave"
  >
    <app-link :to="index">
      <svg-icon v-if="icon" :icon-class="icon"/>
      <span v-if="title" v-text="title"/>
    </app-link>
    <span v-if="showToolbar" class="sidebar-toolbar">
      <span class="sidebar-icon-box" @click.stop="onRemoveItem">
        <i class="el-icon-close"/>
      </span>
      <span class="sidebar-icon-box sidebar-icon-box-drag">
        <i class="el-icon-rank"/>
      </span>
    </span>
  </li>
</template>
<script>
import draggable from 'vuedraggable'
import AppLink from './Link'
import Menu from 'element-ui/packages/menu/src/menu-mixin'
import Emitter from 'element-ui/src/mixins/emitter'

export default {
  name: 'MenuItem',

  componentName: 'MenuItem',

  components: { AppLink, draggable },

  mixins: [Menu, Emitter],

  props: {
    index: {
      type: String,
      required: true
    },
    route: {
      type: [String, Object],
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      showToolbar: false
    }
  },
  computed: {
    active() {
      return this.index === this.rootMenu.activeIndex
    },
    hoverBackground() {
      return this.rootMenu.hoverBackground
    },
    backgroundColor() {
      return this.rootMenu.backgroundColor || ''
    },
    activeTextColor() {
      return this.rootMenu.activeTextColor || ''
    },
    textColor() {
      return this.rootMenu.textColor || ''
    },
    mode() {
      return this.rootMenu.mode
    },
    itemStyle() {
      const style = {
        color: this.active ? this.activeTextColor : this.textColor
      }
      if (this.mode === 'horizontal' && !this.isNested) {
        style.borderBottomColor = this.active
          ? (this.rootMenu.activeTextColor ? this.activeTextColor : '')
          : 'transparent'
      }
      return style
    },
    isNested() {
      return this.parentMenu !== this.rootMenu
    }
  },
  mounted() {
    this.parentMenu.addItem(this)
    this.rootMenu.addItem(this)
  },
  beforeDestroy() {
    this.parentMenu.removeItem(this)
    this.rootMenu.removeItem(this)
  },
  methods: {
    onMouseEnter() {
      if (this.mode === 'horizontal' && !this.rootMenu.backgroundColor) return
      this.$el.style.backgroundColor = this.hoverBackground
      this.showToolbar = true
    },
    onMouseLeave() {
      if (this.mode === 'horizontal' && !this.rootMenu.backgroundColor) return
      this.$el.style.backgroundColor = this.backgroundColor
      this.showToolbar = false
    },
    handleClick() {
      if (!this.disabled) {
        this.dispatch('ElMenu', 'item-click', this)
        this.$emit('click', this)
      }
    },
    onRemoveItem() {
      if (!this.disabled) {
        this.$emit('toggleRemove', this.index)
      }
    }
  }
}
</script>
