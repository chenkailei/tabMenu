import tabs from './tabs.vue';
tabs.install = Vue => Vue.component(tabs.name, tabs); //.name就是开始说的vue文件暴露出来的name名，ldcPagination整个组件
export default tabs;
