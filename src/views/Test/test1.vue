<template>
  <div class="testBox">
    <p>
      <YsIcon type="md-arrow-back" size="32" @click.native="$router.go(-1)" />
    </p>
    <br>
    <h1>YS-UI组件库组件</h1>
    <YsButton size="small">默认</YsButton>&nbsp;&nbsp;&nbsp;&nbsp;
    <YsButton>默认</YsButton>&nbsp;&nbsp;&nbsp;&nbsp;
    <YsButton size="large">默认</YsButton>
    <br><br>
    <YsButton type="primary" size="small">主按钮</YsButton>&nbsp;&nbsp;&nbsp;&nbsp;
    <YsButton type="primary">主按钮</YsButton>&nbsp;&nbsp;&nbsp;&nbsp;
    <YsButton type="primary" size="large">主按钮</YsButton>
    <br><br>
    <YsButton type="dashed" size="small">虚线按钮</YsButton>&nbsp;&nbsp;&nbsp;&nbsp;
    <YsButton type="dashed">虚线按钮</YsButton>&nbsp;&nbsp;&nbsp;&nbsp;
    <YsButton type="dashed" size="large">虚线按钮</YsButton>
    <br><br>
    <YsButton type="text" size="small">文字按钮</YsButton>&nbsp;&nbsp;&nbsp;&nbsp;
    <YsButton type="text">文字按钮</YsButton>&nbsp;&nbsp;&nbsp;&nbsp;
    <YsButton type="text" size="large">文字按钮</YsButton>
    <br><br>
    <YsButton type="success" size="small">Success</YsButton>&nbsp;&nbsp;&nbsp;&nbsp;
    <YsButton type="success">Success</YsButton>&nbsp;&nbsp;&nbsp;&nbsp;
    <YsButton type="success" size="large">Success</YsButton>
    <br><br><br>
    <YsInput placeholder="请输入内容" style="width: 300px" /><br><br>
    <YsInput search placeholder="请输入内容" style="width: 300px" /><br><br>

    <br><br><br><br>
    <h1>平台基础数据获取</h1>
    <div class="contentBox">
      <YsButton type="primary" @click="getData(1)">获取请求头信息</YsButton><br><br>
      <p>
        请求头信息：{{commData}}
      </p>
      <YsButton type="primary" @click="getData(2)">获取菜单列表信息</YsButton><br><br>
      <p>
        菜单列表信息：{{menuList}}
      </p>
      <YsButton type="primary" @click="getData(3)">获取按钮列表信息</YsButton><br><br>
      <p>
        按钮列表信息：{{butList}}
      </p>
      <br><br><br><br>
      <h1>接口服务调用测试</h1>
      <YsButton type="primary" @click="getAPIData">获取接口数据</YsButton><br><br>
      <p>
        接口请求数据：{{apiData}}
      </p>
    </div>
  </div>
</template>
<script>
  import {
    mapGetters,
    mapActions
  } from "vuex";
  import {
    ys_SysAction
  } from "ys-utils-js";
  export default {
    data() {
      return {
        commData: null,
        menuList: null,
        butList: null,
        apiData: [],
      }
    },
    computed: {
      ...mapGetters(['getCommData', 'getMenuList', 'getBtnPermission']),
    },
    methods: {
      ...mapActions(['SpringTestDeptView_queryTestDept', 'SpringTestDeptView_saveTestDept']),
      getData(i) {
        switch (i) {
          case 1:
            this.commData = this.getCommData;
            break;
          case 2:
            this.menuList = this.getMenuList;
            break;
          case 3:
            this.butList = this.getBtnPermission;
            break;
        }
      },
      async handleList() {
        try {
          const result = await ys_SysAction.getMessages();
        } catch (error) {
          console.log(error);
        }
      },
      // 获取接口数据
      getAPIData() {
        // 获取部门信息
        this.SpringTestDeptView_queryTestDept({
          testDeptInfo: {
            dept_id: "0000000002"
          }
        }).then((result) => {
          let {
            data,
            msg,
            scode,
            status
          } = result;
          if (status === "ok") {
            this.apiData.push(data);
          } else {
            this.apiData.push({
              message: msg,
              scode: scode
            })
          }
        }).catch(err => {
          console.log(err);
        })

        // 新增部门
        setTimeout(() => {
          this.SpringTestDeptView_saveTestDept({
            testDeptInfo: {
              dept_name: "10001",
              dept_type: 1,
              dept_dsc: "bangtest"
            },
          }).then((result) => {
            let {
              data,
              msg,
              scode,
              status
            } = result;
            if (status === "ok") {
              this.apiData.push(data);
            } else {
              this.apiData.push({
                message: msg,
                scode: scode
              })
            }
          }).catch(err => {
            console.log(err);
          })
        }, 1500);
      },

    },
  }
</script>
<style lang="less" scoped>
  .testBox {
    height: 100%;
    width: 100%;

    &>i {
      color: #c9c9c9;
      cursor: pointer;

      &:hover {
        color: tint(#c9c9c9, 50%);
      }

      &:active {
        color: shade(#c9c9c9, 5%);
      }
    }

    .contentBox {
      padding: 20px;
      color: white;

      &>p {
        font-size: 18px;
      }
    }

  }
</style>