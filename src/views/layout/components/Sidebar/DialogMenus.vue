<template>
  <div class="product-category-list-wrapper">
    <div class="sidebar-product-category-group">
      <div class="sidebar-product-category-group-item" v-for="item in getHasChild">
        <h5>弹性计算</h5>
        <ul>
          <li v-for="child in item.children">
            <a href="https://ecs.console.aliyun.com" title="云服务器 ECS">
              云服务器 ECS
            </a>
            <span class="sidebar-icon-star-wrapper">
              <i class="el-icon-star-off"></i>
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: "dialog-menus",
    computed: {
      ...mapGetters([
        'permission_routers',
        'sidebar'
      ]),
      getNoChild() {
        return this.permission_routers.filter(item => !item.children)
      },
      getHasChild() {
        return this.permission_routers.filter(item => item.children)
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
