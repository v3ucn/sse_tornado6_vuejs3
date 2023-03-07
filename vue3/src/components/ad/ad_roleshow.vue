<template>
  <a-layout class="layout">
    <a-layout-header>
      <div class="logo" />

      <ad_header />
      


    </a-layout-header>
    <a-layout-content style="padding: 0 50px">
      <a-breadcrumb style="margin: 16px 0">

        <a-breadcrumb-item><a href="/">广告平台</a></a-breadcrumb-item>


        <a-breadcrumb-item>角色授权</a-breadcrumb-item>

      </a-breadcrumb>
      <div :style="{ background: '#fff', padding: '24px', minHeight: '280px' }">


        <a-checkbox-group v-model:value="rid_uids" :options="all_uids" @change="change" />


    </div>
    </a-layout-content>
    <a-layout-footer style="text-align: center">
      在线广告平台
    </a-layout-footer>
  </a-layout>
</template>

<script>

import ad_header from './ad_header';
import ad_bread from './ad_bread';


export default {
 data() {
    return {

      //角色id
      rid:0,
      // 所有用户id
      all_uids:[],
      // 当前角色对应用户id
      rid_uids:[],
      // 对应关系
      user_dict:{}

     

    }
  },
  //声明子组件
  components:{

    'ad_header':ad_header,
    'ad_bread':ad_bread,



  },
  methods:{

    // 角色用户发生变化
    change:function(checked){

        //把用户名替换为用户id

        let uids = [];

        for(let i=0;i<checked.length;i++){

            uids.push(this.user_dict[checked[i]]);

        }

        console.log(uids);


         this.myaxios("http://localhost:8000/userrole/","delete",{"rid":this.rid,"uids":uids+""}).then(data => {

              this.$message.info(data.msg);


        });


    },
    // 获取用户id
    get_uids:function(){



      //往后台发送请求
        this.myaxios("http://localhost:8000/userrole/","post",{"rid":this.rid}).then(data => {

            console.log(data);

            if(data.errcode!=0){

              this.$message.info(data.msg);

            }

            // 返回当前用户的多角色列表中是否具备超级管理员角色

            this.all_uids = data.all_uids;
            this.rid_uids = data.rid_uids;
            this.user_dict = data.user_dict;

            console.log(this.all_uids)


        });


    },
    //获取角色
    get_roles:function(){


      //往后台发送请求
        this.myaxios("http://localhost:8000/role/","get").then(data => {

            console.log(data);

            if(data.errcode!=0){

              this.$message.info(data.msg);

            }

            // 返回当前用户的多角色列表中是否具备超级管理员角色

            this.roles = data.data;

        });

    }

   


  },
  created(){


    // 接收url传递的角色id
    this.rid = this.$route.query.id;


    console.log(this.rid);


    this.get_uids();

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