<template>


<a-layout class="layout">
    <a-layout-header>
      <div class="logo" />

      <a href="/reg">注册</a>/<a href="/login">登录</a>

    </a-layout-header>
    <a-layout-content style="padding: 0 50px">
      <a-breadcrumb style="margin: 16px 0">
        <a-breadcrumb-item>广告平台</a-breadcrumb-item>
        <a-breadcrumb-item>首页</a-breadcrumb-item>

      </a-breadcrumb>
      <div :style="{ background: '#fff', padding: '24px', minHeight: '280px' }">


      <div>

    

    <a-form-item label="用户名" >

        <a-input  v-model:value="username"  />

    </a-form-item>


    <a-form-item label="密码" >

        <a-input type="password"  v-model:value="password"  />

    </a-form-item>


    <a-form-item  >

        <a-button @click="reg"  type="primary">注 册</a-button>

    </a-form-item>


</div>



      


    

    <div id="rabbit_box"></div>
    </div>
    </a-layout-content>
    <a-layout-footer style="text-align: center">
      视频社交平台
    </a-layout-footer>
  </a-layout>



</template>

<script>
    

export default {

    data(){


        return {

            // 用户名
            username:"",
            // 密码
            password:"",
            msg:"你好，这里是vue3.0"


        }


    },

    // 函数声明
    methods:{


            //注册函数
            reg:function(){


                if(this.username == ""){


                        this.$message.info("用户名不能为空");

                        return;

                }


                // 请求tornado后端接口 注册

                this.myaxios("http://localhost:8000/user/","post",{"username":this.username,"password":this.password}).then(data => {

                        console.log(data)

            
                        this.$message.info(data.msg);

                        

                });




            }



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
