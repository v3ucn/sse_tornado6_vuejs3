<template>
  <a-layout class="layout">
    <a-layout-header>
      <div class="logo" />
      


    </a-layout-header>
    <a-layout-content style="padding: 0 50px">
      <a-breadcrumb style="margin: 16px 0">
        <a-breadcrumb-item>广告平台首页</a-breadcrumb-item>
        <a-breadcrumb-item>注册</a-breadcrumb-item>
      </a-breadcrumb>
      <div :style="{ background: '#fff', padding: '24px', minHeight: '280px' }">


<a-form-item label="后台角色" >

        <a-select

      v-model:value="value1"
      style="width: 120px"

    >
      <a-select-option value="1">商户后台</a-select-option>
      <a-select-option value="2">流量后台</a-select-option>
      <a-select-option value="3" >运营后台</a-select-option>
    </a-select>

  </a-form-item>


    

    <a-form-item label="用户名" >

      <a-input v-model:value="username" />

    </a-form-item>


    <a-form-item label="密 码" >

      <a-input v-model:value="password" type="password" />

    </a-form-item>


    <a-button danger type="primary" @click="reg">注 册</a-button>




    </div>
    </a-layout-content>
    <a-layout-footer style="text-align: center">
      在线广告平台
    </a-layout-footer>
  </a-layout>
</template>

<script>

import { ethers } from 'ethers';


export default {
 data() {
    return {

     //用户名
     username:"",
     //密码
     password:"",

     //所选角色
     value1:"1"


    }
  },
  //声明子组件
  components:{


  },
  methods:{


    //注册逻辑
    reg:function(){



        //往后台发送请求
        this.myaxios("http://localhost:8000/user/","post",{"username":this.username,"password":this.password,"rid":this.value1,}).then(data => {

            console.log(data);

            this.$message.info(data.msg);

        });


    }


   


  },
  created(){





  }

}


</script>
<style>
.site-layout-content {
  min-height: 280px;
  padding: 24px;
  background: #fff;
}
#components-layout-demo-top .logo {
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
}
.ant-row-rtl #components-layout-demo-top .logo {
  float: right;
  margin: 16px 0 16px 24px;
}

[data-theme='dark'] .site-layout-content {
  background: #141414;
}
</style>