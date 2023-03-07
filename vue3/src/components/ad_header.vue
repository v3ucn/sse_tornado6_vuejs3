<template>
  <div style="color:white;">


    <div v-if="username==''" >
    
    <a href="/reg">注册</a>/<a href="/login">登录</a>

    </div>


    <div v-if="username != ''">
      

      欢迎您: {{ username }}

      &nbsp;&nbsp;&nbsp;

      <a-button danger type="primary" @click="logout">退出</a-button>


      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

     







      



    </div>
      


    


   
  </div>
</template>

<script>


export default {
 data() {
    return {


      username:"",




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

      //跳转
      window.location.href = "/login";


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





  }

}
</script>


<style>




</style>

