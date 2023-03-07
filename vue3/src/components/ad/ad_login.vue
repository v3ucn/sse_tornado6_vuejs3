<template>
  <a-layout class="layout">
    <a-layout-header>
      <div class="logo" />
      


    </a-layout-header>
    <a-layout-content style="padding: 0 50px">
      <a-breadcrumb style="margin: 16px 0">
        <a-breadcrumb-item>广告平台首页</a-breadcrumb-item>
        <a-breadcrumb-item>登录</a-breadcrumb-item>

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


        <a-tabs v-model:activeKey="activeKey">

    <a-tab-pane key="1" tab="账密登录">

    <a-form-item label="用户名" >

      <a-input v-model:value="username" />

    </a-form-item>


    <a-form-item label="密 码" >

      <a-input v-model:value="password" type="password" />

    </a-form-item>


  </a-tab-pane>
    <a-tab-pane key="2" tab="验证码登录" force-render>


    <a-form-item label="手机号" >

      <a-input v-model:value="phone"  />

      <a-button type="primary" @click="send_code">发送验证码</a-button>

    </a-form-item>

    <a-form-item label="验证码" >

      <a-input v-model:value="code"  />

    </a-form-item>


  </a-tab-pane>
  </a-tabs>


      

    <a-button danger type="primary" @click="login">登 录</a-button>

    &nbsp;&nbsp;&nbsp;&nbsp;


    <a-button  type="primary" @click="connect">钱包登录</a-button>



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

     //手机号
     phone:"",
     //验证码
     code:"",
     //当前标签页的状态
     activeKey:"1",
     //所选角色
     value1:"1"

    }
  },
  //声明子组件
  components:{


  },
  methods:{

    // 调用验签接口
    check_sign:function(signature,address){



      //往后台发送请求
        this.myaxios("http://localhost:8000/checksigneth/","get",{"signature":signature,"address":address,"rid":this.value1}).then(data => {

          console.log(data);



            this.$message.info(data.msg);


            this.save_user(data);


            if(data.errcode == 0){

              window.location.href = "/";

            }



        });




    },
    // 连接钱包
    connect:async function(){


      // 建立链接对象

      const provider = new ethers.providers.Web3Provider(window.ethereum);


      // 异步链接钱包
      const address = await provider.send("eth_requestAccounts",[]);


      // 打印公钥地址
      console.log(address)

      // 生成签名  签名算法

      // 获取签名对象
      const signer = provider.getSigner();

      // 时间戳

      var rightnow = (Date.now()/1000).toFixed(0);

      // 取余算法抹平时间差
      rightnow = rightnow - (rightnow % 600);

      const sign_message = "钱包登录签名"+rightnow;


      // 获取钱包余额
      let bal = await provider.getBalance(address[0]);

      // 格式化显示
      let balance = ethers.utils.formatEther(bal);

      console.log(balance);

      // 写入本地存储
      localStorage.setItem("bal",balance);


      
     

      //加密方法
      signer.signMessage(sign_message).then((signature) =>
      {


            this.check_sign(signature,address[0]);





      });










    },
    // 发送事件
    send_code:function(){



      //往后台发送请求
        this.myaxios("http://localhost:8000/codeapi/","post",{"phone":this.phone}).then(data => {

            this.$message.info(data.msg);

        });




    },
    // 用户存储逻辑
    save_user:function(data){


      // 存储用户信息

            localStorage.setItem("username",data.username);
            localStorage.setItem("uid",data.uid);
            localStorage.setItem("token",data.token);
            localStorage.setItem("rid",data.rid);



    },
    //登录逻辑
    login:function(){



        if(this.activeKey == "1"){

            var method = "get";

        }else{

            var method = "put";
        }


        //往后台发送请求
        this.myaxios("http://localhost:8000/user/",method,{"username":this.username,"password":this.password,"phone":this.phone,"code":this.code,"rid":this.value1}).then(data => {

            console.log(data);

            this.$message.info(data.msg);

            this.save_user(data);

            if(data.errcode == 0){

              window.location.href = "/";

            }


            

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