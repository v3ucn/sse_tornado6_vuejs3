<template>
  <a-layout class="layout">
    <a-layout-header>
      <div class="logo" />

      <ad_header />
      


    </a-layout-header>
    <a-layout-content style="padding: 0 50px">
      <a-breadcrumb style="margin: 16px 0">
        <a-breadcrumb-item>广告平台</a-breadcrumb-item>
        <a-breadcrumb-item>角色管理</a-breadcrumb-item>

      </a-breadcrumb>
      <div :style="{ background: '#fff', padding: '24px', minHeight: '280px' }">


        <a-select

      v-model:value="value1"
      style="width: 120px"

      @change="handleChange"
    >
      <a-select-option value="desc">倒序</a-select-option>
      <a-select-option value="asc">正序</a-select-option>
    </a-select>

        <table>
                   
                  <thead>
                    
                    <tr>
                      
                      <td>角色id</td><td>角色名称</td><td>操作</td>

                    </tr>

                  </thead>


                 <tbody>
                   

                      <tr v-for="(item,index) in roles">


                        <td> {{ item.id }} </td>

                        <td>  <a :href="'/ad_roleshow?id='+item.id"> {{ item.name }} </a> </td>

                        


                      <td> 

                        <a-button danger type="primary" @click="del_user">删 除</a-button> 

                      </td>
                        


                      </tr>



                 </tbody>


                 </table>


                 <a-pagination @change="page_change" v-model:pageSize="size" v-model:current="page" :total="total" show-less-items />


    </div>
    </a-layout-content>
    <a-layout-footer style="text-align: center">
      在线广告平台
    </a-layout-footer>
  </a-layout>
</template>

<script>

import ad_header from './ad_header';


export default {
 data() {
    return {

      //每页条数
      size:2,
      //当前页
      page:1,
      // 所有数据个数
      total:0,
      //角色列表
      roles:[],
      value1:"desc"

     

    }
  },
  //声明子组件
  components:{

    'ad_header':ad_header


  },
  methods:{

    // 排序变化
    handleChange:function(value){

          this.value1 = value;

          this.get_roles();

    },
    // 分页变化
    page_change:function(page, pageSize){



          this.page = page;

          this.get_roles();


    },
    //获取角色
    get_roles:function(){


      //往后台发送请求
        this.myaxios("http://localhost:8000/role/","get",{"page":this.page,"order":this.value1}).then(data => {

            console.log(data);

            if(data.errcode!=0){

              this.$message.info(data.msg);

            }

            // 返回当前用户的多角色列表中是否具备超级管理员角色

            this.roles = data.data;

            this.total = data.total

        });

    }

   


  },
  created(){


    this.get_roles();



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