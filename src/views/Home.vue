<template>
  <div class="homePage pageBackground">
    <h1>换肤功能</h1>
    <Button style="background:rgba(58, 95, 157, 1);color:white" @click="ChanageTheme(1)">蓝色</Button>&nbsp;&nbsp;
    <Button style="background:rgba(209, 62, 57, 1);color:white" @click="ChanageTheme(2)">红色</Button>&nbsp;&nbsp;
    <Button style="background:rgba(86, 177, 252, 1);color:white" @click="ChanageTheme(3)">天蓝色</Button>&nbsp;&nbsp;
    <Button style="background:rgba(255, 183, 0, 1);color:white" @click="ChanageTheme(4)">黄色</Button>&nbsp;&nbsp;
    <br><br><br><br>
    <h1>YsUI自定义组件</h1>
    <YsButton>默认按钮</YsButton>&nbsp;&nbsp;
    <YsButton type="primary">主要按钮</YsButton>&nbsp;&nbsp;
    <YsButton type="info">信息按钮</YsButton>&nbsp;&nbsp;
    <YsButton type="success">成功按钮</YsButton>&nbsp;&nbsp;
    <YsButton type="warning">警告按钮</YsButton>&nbsp;&nbsp;
    <YsButton type="error">错误按钮</YsButton>
    <br /><br />
    <!-- 带图标的按钮 -->
    <YsButton icon="icon-circle-plus-outline">我是带图标的</YsButton>&nbsp;&nbsp;
    <YsButton icon="icon-edit" type="error">我是左侧带图标的</YsButton>&nbsp;&nbsp;
    <YsButton icon="icon-delete" type="success" iconPositon="right">我是右侧带图标的</YsButton>
    <br><br>
    <!-- loading 按钮 -->
    <YsButton type="primary" loading>禁用loading按钮</YsButton>&nbsp;&nbsp;
    <YsButton disabled>禁用按钮</YsButton>

    <br><br><br><br>
    <h1>基于IView组件封装</h1>
    <YSButtonIv type="primary">测试组件</YSButtonIv>
    <br><br><br><br>


    <h1>IView组件</h1>
    <Button type="primary">Primary</Button>
    <br><br>
    <Input v-model="value" placeholder="Enter something..." style="width: 300px" /><br><br>
    <Input search placeholder="Enter something..." style="width: 300px" /><br><br>
    <RadioGroup v-model="phone">
      <Radio label="apple">
        <Icon type="logo-apple"></Icon>
        <span>Apple</span>
      </Radio>
      <Radio label="android">
        <Icon type="logo-android"></Icon>
        <span>Android</span>
      </Radio>
      <Radio label="windows">
        <Icon type="logo-windows"></Icon>
        <span>Windows</span>
      </Radio>
    </RadioGroup><br><br>
    <CheckboxGroup v-model="fruit">
      <Checkbox label="香蕉"></Checkbox>
      <Checkbox label="苹果"></Checkbox>
      <Checkbox label="西瓜"></Checkbox>
    </CheckboxGroup><br><br>
    <iSwitch size="large">
      <span slot="open">开</span>
      <span slot="close">关</span>
    </iSwitch>&nbsp;&nbsp;
    <iSwitch true-color="#13ce66" false-color="#ff4949" />&nbsp;&nbsp;
    <iSwitch size="small" />
    <br><br>
    <Select v-model="model1" style="width:200px">
      <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
    </Select><br><br>
    <DatePicker type="date" placeholder="Select date" style="width: 200px"></DatePicker>
    <br><br>
  </div>
</template>

<script>
  export default {
    name: 'Home',
    components: {},
    data() {
      return {
        phone: 'apple',
        fruit: ['苹果'],
        cityList: [{
            value: 'New York',
            label: 'New York'
          },
          {
            value: 'London',
            label: 'London'
          },
          {
            value: 'Sydney',
            label: 'Sydney'
          },
          {
            value: 'Ottawa',
            label: 'Ottawa'
          },
          {
            value: 'Paris',
            label: 'Paris'
          },
          {
            value: 'Canberra',
            label: 'Canberra'
          }
        ],
        model1: ''
      }
    },
    methods: {
      ChanageTheme(id) {
        let themeName = "";
        switch (id) {
          case 1:
            themeName = "lan-theme";
            break;
          case 2:
            themeName = "red-theme";
            break;
          case 3:
            themeName = "tlan-theme";
            break;
          case 4:
            themeName = "yellow-theme";
            break;
        };
        document.getElementById('app').className = themeName;
      }
    },
    mounted() {
      this.ChanageTheme(4);
    },
  }
</script>
<style lang="less" scoped>
  .homePage {
    width: 100%;
    padding: 16px;
  }
</style>