import tornado.ioloop
import tornado.web


push_flag = True

from asyncio import sleep


class ServerSentEvent(tornado.web.RequestHandler):

    def __init__(self, *args, **kwargs):
        super(ServerSentEvent, self).__init__(*args, **kwargs)
        self.set_header('Content-Type', 'text/event-stream')
        self.set_header('Access-Control-Allow-Origin', "*")
        self.set_header("Access-Control-Allow-Headers","*")
        # 请求方式
        self.set_header("Access-Control-Allow-Methods","*")

    # 断开连接
    def on_finish(self):
        print("断开连接")
        return super().on_finish()

    async def get(self):
        print("建立链接")
        while True:
            if push_flag:
                print("开始")
                self.write("event: message\n");
                self.write("data:" + "push data" + "\n\n");
                self.flush()
                await sleep(2)



def make_app():
    return tornado.web.Application([
        (r"/sse/data/", ServerSentEvent),
    ])

if __name__ == "__main__":
    app = make_app()
    app.listen(8000)
    print("sse服务启动")
    tornado.ioloop.IOLoop.current().start()
