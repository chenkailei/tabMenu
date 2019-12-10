Tabs Event

onClick 点击事件
返回值为每个 tab 的 name

onRemove 删除标签
被删除的 tab 的 name

在需要添加 tab 的元素添加点击事件，调用方法例：
<li @click="addTab('大张三')">张三</li>
<li @click="addTab">李四</li>

    addTab(event) {
      this.$refs.tabs.handleTabsAdd(event);
    }

事件默认获取元素文本，也可以手动设置文本

_---------------------------_

\*\*menu 配置
showFresh 显示刷新 默认关闭
showOther 显示关闭其他 默认开启
showAll 显示关闭所有 默认开启
showLeft 显示关闭左侧 默认关闭
showRight 显示关闭右侧 默认关闭
