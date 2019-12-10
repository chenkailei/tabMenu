<template>
  <div id="app">
    <tabs ref="tabs">
      <template slot="test">
        <div :is='test'></div>
      </template>
      <template slot="test2">
        <div :is='test2'></div>
      </template>
    </tabs>
    <ul>
      <li @click="addTab('test','大张三')">张三</li>
      <li @click="addTab('test2','大理')">李四</li>
      <li @click="addTab">王五</li>
    </ul>
  </div>
</template>

<script>
import Vue from "vue";
import tabs from "./components/tabs/tabs";
import test from "./components/test";
import test2 from "./components/test2";
export default {
  name: "app",
  components: {
    tabs,
    test,
    test2
  },
  data () {
    return {
      test: test,
      test2: test2
    };
  },
  methods: {
    addTab (html, event) {
      this.testDom = html
      console.log(event)
      this.$refs.tabs.handleTabsAdd(html, event);
    }
  }
};
</script>

<style></style>
