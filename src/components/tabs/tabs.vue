<template>
  <div>
    <Tabs type="card"
          ref="tabs"
          :value="name"
          @on-click="showname"
          @contextmenu.prevent.native="showMenuBar"
          @on-tab-remove="handleTabRemove">
      <TabPane v-for="(tab, index) in tabs"
               :key="tab.title"
               :label="tab.title"
               :closable="closable"
               :name="index.toString()">
        <slot :name="tab.html"></slot>

        <!-- {{tab.html}} -->
      </TabPane>
    </Tabs>
    <ul v-show="visible"
        :style="{ left: left + 'px', top: top + 'px' }"
        class="contextmenu">
      <li v-if="showFresh"
          @click="refresh">刷新</li>
      <li v-if="showOther"
          @click="closeOther">关闭其他</li>
      <li v-if="showAll"
          @click="closeAll">关闭所有</li>
      <li v-if="showLeft"
          @click="closeLeft">关闭左侧</li>
      <li v-if="showRight"
          @click="closeRight">关闭右侧</li>
    </ul>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  name: "tabs",
  props: {
    closable: {
      default: true
    },
    showFresh: {
      default: false
    },
    showOther: {
      default: true
    },
    showAll: {
      default: true
    },
    showLeft: {
      default: false
    },
    showRight: {
      default: false
    }
  },
  data () {
    return {
      title: "",
      flag: false,
      name: "",
      tabs: [],
      components: [],
      top: 0,
      left: 0,
      index: null,
      visible: false
    };
  },
  components: {

  },
  methods: {
    showname (name) {
      // console.log(name);
      this.$emit("onClick", name);
    },
    // 添加标签
    handleTabsAdd (html, event) {
      var title;
      if (typeof event == "object") {
        title = event.target.innerText;
      } else {
        title = event;
      }
      this.flag = false;
      if (this.tabs.length == 0) {
        this.tabs.push({
          title: title,
          html: html
        });
      } else if (this.tabs) {
        this.tabs.forEach((item, index) => {
          if (item.title == title) {
            this.name = index.toString();
            this.tabs[index] = { title: title, html: html };
            this.$set(this.tabs, index, this.tabs[index]);
            this.flag = true;
          }
        });
        if (!this.flag) {
          this.tabs.push({ title: title, html: html });
          this.name = (this.tabs.length - 1).toString()
          console.log(this.name)
        }
      }
      console.log(this.tabs)
    },
    // 删除标签
    handleTabRemove (res) {
      this.tabs.splice(res, 1);
      this.$emit("onRemove", res);
    },
    // 显示菜单
    showMenuBar (e) {
      this.visible = true;
      let target = e.target; //事件发生的元素
      let nodeList = e.target.parentNode.children; //同级元素集合
      let targetIndex = this.tabIndex(target, nodeList); //调用tabIndex方法，返回值便是元素下标
      this.index = targetIndex - 1;

      const menuMinWidth = 105;
      const offsetLeft = this.$el.getBoundingClientRect().left; // container margin left
      const offsetWidth = this.$el.offsetWidth; // container width
      const maxLeft = offsetWidth - menuMinWidth; // left boundary
      const left = e.clientX - offsetLeft + 15; // 15: margin right

      if (left > maxLeft) {
        this.left = maxLeft;
      } else {
        this.left = left;
      }

      this.top = e.clientY;
      this.visible = true;
    },
    // 获取下标
    tabIndex (target, nodeList) {
      for (let i = 0; i < nodeList.length; i++) {
        if (target === nodeList[i]) {
          return i;
        }
      }
    },
    // 刷新
    refresh () {
      this.visible = false;
    },
    // 关闭其他
    closeOther () {
      this.visible = false;
      var reserved = this.tabs[this.index];
      this.$nextTick(() => {
        this.tabs = [];
        this.tabs[0] = reserved;
        this.name = "0";
      });
    },
    // 关闭所有
    closeAll () {
      this.visible = false;
      this.tabs = [];
    },
    // 关闭左侧
    closeLeft () {
      this.visible = false;
      var count = 0;
      this.tabs.forEach((item, index) => {
        if (index < this.index) {
          count++;
        }
      });
      this.tabs.splice(0, count);
    },
    // 关闭右侧
    closeRight () {
      this.visible = false;
      var count = 0;
      this.tabs.forEach((item, index) => {
        if (index > this.index) {
          count++;
        }
      });
      this.tabs.splice(this.tabs.length - count, count);
    },
    // 关闭菜单
    closeMenu () {
      this.visible = false;
    }
  },
  watch: {
    visible (value) {
      if (value) {
        document.body.addEventListener("click", this.closeMenu);
      } else {
        document.body.removeEventListener("click", this.closeMenu);
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.contextmenu {
  margin: 0;
  background: #fff;
  z-index: 3000;
  position: absolute;
  list-style-type: none;
  padding: 5px 0;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
}
.contextmenu li {
  margin: 0;
  padding: 7px 16px;
  cursor: pointer;
}
.contextmenu li:hover {
  background: #eee;
}
</style>
