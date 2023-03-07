<template>
  <a-layout class="layout">
    <a-layout-header>
      <div class="logo" />

      <ad_header />
      


    </a-layout-header>
    <a-layout-content style="padding: 0 50px">
      <a-breadcrumb style="margin: 16px 0">

        <a-breadcrumb-item><a href="/">广告平台</a></a-breadcrumb-item>


        <a-breadcrumb-item>广告分类添加</a-breadcrumb-item>

      </a-breadcrumb>
      <div :style="{ background: '#fff', padding: '24px', minHeight: '280px' }">


        <a-form-item label="分类名称" >

      <a-input v-model:value="name" />

    </a-form-item>


        <!-- 循环表单 -->


        <div style="float:left;width:50%;">

          字段标签列表：

          <br />


          <a-form-item  v-for="(item,index) in domains_lable">


          <a-input    

              v-model:value="item.value"

              label="字段标签"

              style="width:60%;margin-right:8px;"

          />


          <a-button danger @click="del_domain(index,0)">删 除</a-button>


        </a-form-item>
          


        </div>


        <div style="float:left;width:50%;">

          字段类型列表：

          <br />
          
          <a-form-item  v-for="(item,index) in domains_form">


          <a-input    

              v-model:value="item.value"

              label="字段类型"

              style="width:60%;margin-right:8px;"

          />


          <a-button danger @click="del_domain(index,1)">删 除</a-button>


        </a-form-item>




        </div>


        <div style="clear:both"></div>





        <a-form-item >


      <a-button type="dashed" style="width: 50%" @click="addDomain(0)">
        <PlusOutlined />
        添加字段标签
      </a-button>

      <a-button type="dashed" style="width: 50%" @click="addDomain(1)">
        <PlusOutlined />
        添加字段类型
      </a-button>


    </a-form-item>


    <a-form-item >
      <a-button type="primary" @click="submit">
        提 交
      </a-button>
    </a-form-item>







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


      // 字段的列表集合
      domains_lable:[],
      domains_form:[],

      // 分类名称
      name:""
  

    }
  },
  //声明子组件
  components:{

    'ad_header':ad_header,



  },
  methods:{


    // 动态添加字段
    addDomain:function(cate){


      // 将新字段添加到动态字段列表中

      if(cate == 0){

      this.domains_lable.push({"value":""});

      }else{

        this.domains_form.push({"value":""});

      }


    },

    // 动态删除
    del_domain:function(index,cate){


        if(cate == 0){


        this.domains_lable.splice(index,1);

      }else{


        this.domains_form.splice(index,1);

      }


    },

    // 提交表单

    submit:function(){


          // 判断是否有字段

          if(this.domains_lable.length == 0){


                this.$message.info("字段标签不能为0");
                return false;

          }

          if(this.domains_form.length == 0){


                this.$message.info("字段类型不能为0");
                return false;

          }



          if(this.domains_lable.length != this.domains_form.length){


                this.$message.info("字段标签和类型不统一");
                  return false;


          }


          // 循环
          for (var i = this.domains_lable.length - 1; i >= 0; i--) {
            
              if(this.domains_lable[i].value == ""){

                  this.$message.info("字段标签值不能为空");
                  return false;

              }

              if(this.domains_form[i].value == ""){

                  this.$message.info("字段类型值不能为空");
                  return false;

              }


          }




          // 取值

            var form_item = [];
            var key_value = {};


            for (var i = this.domains_lable.length - 1; i >= 0; i--) {


              

              key_value[this.domains_lable[i].value] = this.domains_form[i].value
                          
              form_item.push(key_value);

          }



  
    // try{
    //       for (var i = this.domains.length - 1; i >= 0; i--) {
           

    //           form_item.push( JSON.parse(this.domains[i].value));
    //       }

    //     }catch{


    //       this.$message.info("输入的json字段不合法");
    //               return false;

    //     }


          console.log(form_item);

          return false;


          //往后台发送请求
        this.myaxios("http://localhost:8000/ad_cate/","post",{"name":this.name,"fields":JSON.stringify(form_item)}).then(data => {

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