<template>
  <div style="color:white;">


    <div v-if="username==''" >
    
    <a href="/ad_reg">注册</a>/<a href="/ad_login">登录</a>

    </div>


    <div v-if="username != ''">
      

      欢迎您: {{ username }}

      &nbsp;&nbsp;&nbsp;

      <a-button danger type="primary" @click="logout">退出</a-button>


      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

      <!--模块入口-->

      <a v-if="is_admin" href="/ad_role_manage/"> 角色管理 </a>

      &nbsp;&nbsp;|&nbsp;&nbsp;

      <a  href="/ad_merchant_upload/"> 商户资质上传 </a>

      &nbsp;&nbsp;|&nbsp;&nbsp;

      <a  href="/ad_cate_add/"> 广告分类添加 </a>

      &nbsp;&nbsp;|&nbsp;&nbsp;

      <a  href="/ad_goods_manage/"> 广告物料管理 </a>







      



    </div>
      


    


   
  </div>
</template>

<script>


export default {
 data() {
    return {


      username:"",
      // 钱包余额
      bal:0,
      //角色
      rid:0,
      //是否超级管理员
      is_admin:0



    }
  },
  //声明子组件
  components:{


  },
  methods:{


    // 获取用户信息
    //获取用户信息
    get_info:function(){


        //往后台发送请求
        this.myaxios("http://localhost:8000/userinfo/","get").then(data => {

            console.log(data);

            // 返回当前用户的多角色列表中是否具备超级管理员角色

            this.is_admin = data.is_admin;

        });


    },
  
    //退出方法
    logout:function(){

      //删除保存的用户信息
      localStorage.removeItem("username");
      localStorage.removeItem("token");
      localStorage.removeItem("uid");
      localStorage.removeItem("rid");
      localStorage.removeItem("bal");

      //跳转
      window.location.href = "/ad_login";


    },
        //封装判断是否登录
        is_login:function(){


            //判断用户是否登录
            if(localStorage.getItem("username") == null){


                  this.username = '';
                  this.uid = '';

            }else{


                  this.username = localStorage.getItem("username");
                  this.uid = localStorage.getItem("uid");
                  this.bal = localStorage.getItem("bal");

            }



        }
   


  },
  created(){


    this.is_login();


    this.get_info();





  }

}
</script>


<style>




</style>

