<template>
  <a-layout class="layout">
    <a-layout-header>
      <div class="logo" />

      <ad_header />
      


    </a-layout-header>
    <a-layout-content style="padding: 0 50px">
      <a-breadcrumb style="margin: 16px 0">
        <a-breadcrumb-item>广告平台</a-breadcrumb-item>
        <a-breadcrumb-item>广告物料管理</a-breadcrumb-item>

      </a-breadcrumb>
      <div :style="{ background: '#fff', padding: '24px', minHeight: '280px' }">



        <a-upload

    @change="fileupload"
      :before-upload="beforeUpload"
  >
    <a-button>
      <upload-outlined></upload-outlined>
      物料上传
    </a-button>
  </a-upload>


        <table>
                   
                  <thead>
                    
                    <tr>
                      
                      <td>物料文件名</td><td>物料内容</td><td>操作</td>

                    </tr>

                  </thead>


                 <tbody>
                   

                      <tr v-for="(item,index) in goods">


                        <td> {{ item.filename }} </td>

                        <td>  


                          <img v-if="item.type == 'img'"  :src="'http://localhost:8000/static/uploads/1/'+item.filename"    />



                        </td>

                        


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

      //物料列表
      goods:[],
      // 定义总片数
      shardCount:0,
      // 定义成功数
      finished:0

     

    }
  },
  //声明子组件
  components:{

    'ad_header':ad_header


  },
  methods:{

    
    beforeUpload:function(file){

        return false;

    },
    //物料上传
    fileupload:function(file){


          //计算分片个数

          var file_size = file.file.size;

          console.log(file_size);

          // 定义阈值

          var shardSize = 1024 * 100;

          // 向上取整
          this.shardCount = Math.ceil(file_size / shardSize);


          console.log(this.shardCount);


          for (var i=0;i<this.shardCount;++i){


          // 切的起始位置

          var start = i * shardSize;

          // 切的结束位置

          var end = Math.min(file_size,start+shardSize);

            // 进行切片操作

            var tinyfile = file.file.slice(start,end);


            // 分片上传

// 声明表单
          let data = new FormData();

          //添加文件
          data.append("file",tinyfile);
 data.append("filename",file.file.name);
 data.append("count",i);



          //声明新的axios实体
          const axiosnew = this.axios.create({withCredentials:false});

          //发起请求
          axiosnew({method:"POST",url:"http://localhost:8000/ad_goods_shard/",data:data}).then(data =>{


                this.$message.info(data.data.msg);

                if(data.data.errcode == 0){

                    this.get_goods();

                    // 进行分片计数的累加
                    this.finished += 1;

                }


              // 触发合并
              if(this.finished == this.shardCount){


                    // 进行请求后端合并接口


              }

        
            }); 


          }


          


          /* // 声明表单 */
          /* let data = new FormData(); */

          /* //添加文件 */
          /* data.append("file",file.file); */

          /* //声明新的axios实体 */
          /* const axiosnew = this.axios.create({withCredentials:false}); */

          /* //发起请求 */
          /* axiosnew({method:"POST",url:"http://localhost:8000/ad_goods/",data:data}).then(data =>{ */


          /*       this.$message.info(data.data.msg); */

          /*       if(data.data.errcode != 0){ */

          /*           this.get_goods(); */

          /*       } */

             
          /* }); */


    },
    //获取物料列表
    get_goods:function(){


      //往后台发送请求
        this.myaxios("http://localhost:8000/ad_goods/","get").then(data => {

            console.log(data);

            if(data.errcode!=0){

              this.$message.info(data.msg);

            }

            this.goods = data.data;

        });

    }

   


  },
  created(){


      this.get_goods();

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
