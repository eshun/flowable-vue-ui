<template>
  <div class="product-category-list-wrapper">
    <div class="sidebar-product-category-group">
      <div v-for="item in getHasChild" class="sidebar-product-category-group-item">
        <h5>{{ getTitle(item) }}</h5>
        <ul>
          <li v-for="child in item.children">
            <app-link :to="item.path + '/' +child.path">
              {{ getTitle(child) }}
            </app-link>
            <span class="sidebar-icon-star-wrapper">
              <i v-if="checkStart(child)" class="el-icon-star-on" @click="toggleUnStart(child,item)"></i>
              <i v-else class="el-icon-star-off" @click="toggleStart(child,item)"></i>
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Message } from 'element-ui'
import { childToParent } from '@/utils/'
import { getI18nTitle } from '@/utils/i18n'
import AppLink from './Link'

export default {
  name: 'dialog-menus',
  components: { AppLink },
  data() {
    return {
      routers: []
    }
  },
  computed: {
    ...mapGetters([
      'permission_routers',
      'sidebar'
    ]),
    getNoChild() {
      return this.permission_routers.filter(item => !item.children && !item.hide)
    },
    getHasChild() {
      return this.permission_routers.filter(item => item.children && !item.hide)
    }
  },
  mounted() {
    this.routers = childToParent(this.sidebar.favorites)
  },
  methods: {
    getTitle(item) {
      if (item.meta && item.meta.title) {
        return getI18nTitle(item.meta.title)
      } else if (item.name) {
        return getI18nTitle(item.name)
      } else if (item.children && item.children.length > 0) {
        const child = item.children[0]
        if (child.meta && child.meta.title) {
          return getI18nTitle(child.meta.title)
        } else if (child.name) {
          return getI18nTitle(child.name)
        }
      }
      return item.path
    },
    checkStart(item) {
      if (this.routers && item) {
        console.log(this.routers, item.name)
        const index = this.routers.findIndex(r => {
          if (item.name) {
            return r.name === item.name
          } else {
            return r.path === item.path
          }
        })
        if (index > -1) {
          return true
        } else {
          return false
        }
      }
    },
    toggleStart(item, parent) {
      // path meta name
      const path = parent.path + '/'+item.path
      this.$store.dispatch('addFavorites', {name: item.name, path, meta: item.meta})
    },
    toggleUnStart(item, parent) {
      if (!item.alwaysShow) {
        const path = parent.path + '/'+item.path
        this.$store.dispatch('removeFavorites', {name: item.name, path, meta: item.meta})
      } else {
        Message.error('alwaysShow no unStart')
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .product-category-list-wrapper {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    .sidebar-product-category-group {
      .sidebar-product-category-group-item {
        float: left;
        margin-bottom: 10px;
        h5 {
          line-height: 40px;
          height: 40px;
          color: #000;
          font-size: 14px;
          padding: 0 10px;
          font-weight: 600;
          margin: 0;
        }
        ul {
          list-style: none;
          margin: 0;
          padding: 0;
          li {
            margin: 0;
            padding: 0;
            display: flex;
            a {
              text-decoration: none;
              font-size: 12px;
              display: block;
              line-height: 35px;
              height: 35px;
              padding-left: 10px;
              padding-right: 30px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              flex: 1 0 auto;
              width: 120px;
              overflow: hidden;
            }
            .sidebar-icon-star-wrapper {
              padding: 10px;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
</style>
