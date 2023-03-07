import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router/index'


import axios from 'axios'
import qs from 'qs'


import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';



//通过请求头传递token
axios.defaults.headers.common["token"] = localStorage.getItem("token");

//封装请求
const myaxios = function(url,type,data={}){

	return new

	Promise((resolve) => {


		//添加token
		data["token"] = localStorage.getItem("token");

		//判断
		if(type==="get" || type === "delete"){


			axios({

				method:type,
				url:url,
				params:data
			}).then((result) => {

					resolve(result.data);

			});


		}else{


			axios({

				method:type,
				url:url,
				data:qs.stringify(data)
			}).then((result) => {

					resolve(result.data);

			});



		}


	});



}

const app = createApp(App)



app.config.globalProperties.myaxios = myaxios;
app.config.globalProperties.axios = axios;

app.use(router);
app.use(Antd);

app.mount('#app')