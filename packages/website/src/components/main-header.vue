<!--
 * @Author: Lvhz
 * @Date: 2021-10-27 09:42:39
 * @Description: Description
-->
<template>
  <div class="header-wrapper">
    <header class="header" ref="header">
      <div class="container">
        <h1>
          <router-link to="/">
            <!-- logo -->
            <slot>
              <div id="logo">
                <!-- <img src="../assets/images/element-logo.svg"  alt="logo" class="nav-logo"/> -->
                <img src="../assets/images/element-logo-small.svg" alt="small-logo" class="nav-logo" />
                <img src="../assets/images/element-logo-small.svg" alt="small-logo" class="nav-logo-small" />
                <span>组件库</span>
              </div>
            </slot>
          </router-link>
        </h1>
        <!-- 导航 -->
        <ul class="nav">
          <li class="nav-item">
            <router-link active-class="active" :to="`/component`">
              {{ langConfig.components }}
            </router-link>
          </li>
          <!-- 之前的文章路由 -->
          <!-- <li class="nav-item">
            <router-link active-class="active" :to="`/article`">
              {{ langConfig.article }}
            </router-link>
          </li> -->
          <!-- <li class="nav-item">
            <router-link active-class="active" :to="`/test`">
              测试
            </router-link>
          </li> -->
          <li class="nav-item">
            <a-dropdown>
              <a class="ant-dropdown-link" @click.prevent>
                文章
                <DownOutlined />
              </a>
              <template #overlay>
                <a-menu @click="menuClickHandler">
                  <a-menu-item v-for="item in articleTypeList" :key="'/' + item.type">
                    <a active-class="active">{{ item.name }}</a>
                  </a-menu-item>
                  <!-- <a-menu-item key="/algorithm">
                    <a active-class="active">算法</a>
                  </a-menu-item>
                  <a-menu-item key="2">
                    <a active-class="active">插件使用</a>
                  </a-menu-item>
                  <a-menu-item key="3">3rd menu item</a-menu-item> -->
                </a-menu>
              </template>
            </a-dropdown>
          </li>
          <!-- <li class="nav-item">
            <router-link active-class="active" :to="`/contribution`">
              贡献
            </router-link>
          </li> -->
          <!--
          <li class="nav-item">
            <a active-class="active" @click="initDB">初始化数据库</a>
          </li> -->
        </ul>
      </div>
    </header>
  </div>
</template>

<script>
import componentConfig from "../i18n/component.json";
import { CommonApi, ArticleApi } from "@api";
import { DownOutlined } from '@ant-design/icons-vue';
import { ref, onMounted } from 'vue';

export default {
  components: { DownOutlined },
  setup() {
    const articleTypeList = ref([])
    const getArticleType = async () => {
      const list = await ArticleApi.getArticleType()
      articleTypeList.value = list.data || []
    }
    onMounted(() => {
      getArticleType()
    })

    return { articleTypeList }
  },
  computed: {
    langConfig() {
      return componentConfig["header"];
    },
  },
  methods: {
    initDB() {
      CommonApi.initDB();
    },
    menuClickHandler(e) {
      const key = e.key || '/'
      this.$router.push(key)
    }
  },
};
</script>

<style lang="scss" scoped>
.header-wrapper {
  height: 80px;
}
#logo{
  span{
    width: auto;
    font-size: 18px;
    color: #409eff;
    transform: translateY(-3px);
  }
}
.header {
  height: 80px;
  background-color: #fff;
  color: #fff;
  top: 0;
  left: 0;
  width: 100%;
  line-height: 80px;
  z-index: 100;
  position: relative;

  .container {
    height: 100%;
    box-sizing: border-box;
    border-bottom: 1px solid #dcdfe6;
  }

  .nav-lang-spe {
    color: #888;
  }

  h1 {
    margin: 0;
    float: left;
    font-size: 32px;
    font-weight: normal;

    a {
      color: #333;
      text-decoration: none;
      display: block;
    }

    span {
      font-size: 12px;
      display: inline-block;
      width: 34px;
      height: 18px;
      border: 1px solid rgba(255, 255, 255, 0.5);
      text-align: center;
      line-height: 18px;
      vertical-align: middle;
      margin-left: 10px;
      border-radius: 3px;
    }
  }

  .nav {
    float: right;
    height: 100%;
    line-height: 80px;
    background: transparent;
    padding: 0;
    margin: 0;
    &::before,
    &::after {
      display: table;
      content: "";
    }
    &::after {
      clear: both;
    }
  }

  .nav-gap {
    position: relative;
    width: 1px;
    height: 80px;
    padding: 0 20px;

    &::before {
      content: "";
      position: absolute;
      top: calc(50% - 8px);
      width: 1px;
      height: 16px;
      background: #ebebeb;
    }
  }

  .nav-logo,
  .nav-logo-small {
    vertical-align: sub;
  }

  .nav-logo-small {
    display: none;
  }

  .nav-item {
    margin: 0;
    float: left;
    list-style: none;
    position: relative;
    cursor: pointer;

    &.nav-algolia-search {
      cursor: default;
    }

    &.lang-item,
    &:last-child {
      cursor: default;
      span {
        opacity: 0.8;
      }

      .nav-lang {
        cursor: pointer;
        display: inline-block;
        height: 100%;
        color: #888;

        &:hover {
          color: #409eff;
        }
        &.active {
          font-weight: bold;
          color: #409eff;
        }
      }
    }

    a {
      text-decoration: none;
      color: #1989fa;
      opacity: 0.5;
      display: block;
      padding: 0 22px;

      &.active,
      &:hover {
        opacity: 1;
      }

      &.active::after {
        content: "";
        display: inline-block;
        position: absolute;
        bottom: 0;
        left: calc(50% - 15px);
        width: 30px;
        height: 2px;
        background: #409eff;
      }
    }
  }
}

.nav-dropdown {
  margin-bottom: 6px;
  padding-left: 18px;
  width: 100%;

  span {
    display: block;
    width: 100%;
    font-size: 16px;
    color: #888;
    line-height: 40px;
    transition: 0.2s;
    padding-bottom: 6px;
    user-select: none;

    &:hover {
      cursor: pointer;
    }
  }

  i {
    transition: 0.2s;
    font-size: 12px;
    color: #979797;
    transform: translateY(-2px);
  }

  .is-active {
    span,
    i {
      color: #409eff;
    }
    i {
      transform: rotateZ(180deg) translateY(3px);
    }
  }

  &:hover {
    span,
    i {
      color: #409eff;
    }
  }
}

.nav-dropdown-list {
  width: auto;
}

@media (max-width: 850px) {
  .header {
    .nav-logo {
      display: none;
    }
    .nav-logo-small {
      display: inline-block;
    }
    .nav-item {
      margin-left: 6px;

      &.lang-item,
      &:last-child {
        margin-left: 10px;
      }

      a {
        padding: 0 5px;
      }
    }
    .nav-theme-switch,
    .nav-algolia-search {
      display: none;
    }
  }
}

@media (max-width: 700px) {
  .header {
    .container {
      padding: 0 12px;
    }
    .nav-item {
      a {
        font-size: 12px;
        vertical-align: top;
      }

      &.lang-item {
        height: 100%;

        .nav-lang {
          display: flex;
          align-items: center;

          span {
            padding-bottom: 0;
          }
        }
      }
    }
    .nav-dropdown {
      padding: 0;
      span {
        font-size: 12px;
      }
    }
    .nav-gap {
      padding: 0 8px;
    }
    .nav-versions {
      display: none;
    }
  }
}
</style>
