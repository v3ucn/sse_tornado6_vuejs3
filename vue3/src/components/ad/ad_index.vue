<template>
  <a-layout class="layout">
    <a-layout-header>
      <div class="logo" />

      <ad_header />
      


    </a-layout-header>
    <a-layout-content style="padding: 0 50px">
      <a-breadcrumb style="margin: 16px 0">
        <a-breadcrumb-item>广告平台</a-breadcrumb-item>
        <a-breadcrumb-item>首页</a-breadcrumb-item>

      </a-breadcrumb>
      <div :style="{ background: '#fff', padding: '24px', minHeight: '280px' }">


        这里是首页


        <ul>
          
          <li v-for="(item,index) in talklist" >{{ item }}</li>

        </ul>

        <a-textarea
      v-model:value="value1"
      placeholder="请输入您想说的话"
      auto-size
    />

     <a-button  type="primary" @click="send">发 送</a-button>


        <div id="rabbit_box"></div>


    </div>
    </a-layout-content>
    <a-layout-footer style="text-align: center">
      在线广告平台
    </a-layout-footer>
  </a-layout>
</template>

<script>

import ad_header from './ad_header';

import 'rabbit-widget/lib/rabbit.css';

var rabbit_init = require('rabbit-widget');


export default {
 data() {
    return {

     value1:"",
     ws:null,
     target_id:0,
     // 聊天记录
     talklist:[],

     // 短线锁
     lock:false,

    }
  },
  //声明子组件
  components:{

    'ad_header':ad_header


  },
  methods:{

    // 断线重连机制
    reconnect:function(){

          var that = this;


          if (that.lock){

              return;

          }

          that.lock = true;

          // 定时任务

          setTimeout(

                function(){

                  that.init_websocket()
                  that.lock = false;

                },5000);

    },
    // 发送聊天

    send:function(){


          // 构建参数

          if(this.target_id == 0){

            this.target_id = 1;

          }

          var data = {"from_id":localStorage.getItem("uid"),"target_id":this.target_id,"content":this.value1};


          data = JSON.stringify(data);

          console.log(data);

          this.ws.send(data)





    },
    init_websocket:function(){


        // 建立一个websocket实例

        var ws = new WebSocket("ws://localhost:8000/ws/?uid="+localStorage.getItem("uid"));

        this.ws = ws;

        var that = this;

        // 建立链接后调用
        ws.onopen = function(){

                console.log("链接建立成功");


              //ws.send("Vue.js_send_msg")

        }

        // 获取信息后调用
        ws.onmessage = function(evt){


              var data = JSON.parse(evt.data);

              console.log(data);

              that.target_id = data["target_id"];


              that.talklist.push(data["content"]);



        }

        // 链接关闭后

        ws.onclose = function(){


              console.log("链接已经关闭");

              that.reconnect();

        }


    }

   


  },
  created(){


    this.$nextTick(() => {
    console.log("页面加载完啦~")

    rabbit_init();
})


    this.init_websocket();


     //往后台发送请求
        // this.myaxios("http://localhost:5000/post?id=123","put",{"username":"vue"}).then(data => {

        //     console.log(data);

        // });


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