<template>
  <div style="position:relative;">
    <div class="back">
      <Button type="ghost" @click="handleRoute(0)">
            <Icon type="arrow-left-c"></Icon>
            返回聊天室
      </Button>
    </div>
    <div class="box">
    <div class="userInfo">
      <div class="img">
        <img :src="head == ''? defualtHead:imgBaseSrc + head" alt="">
      </div>
    </div>
    <Form  :label-width="80">
        <FormItem label="昵称">
            {{username}}
        </FormItem>
        <FormItem label="生日">
            <Row>
                <Col span="11">
                    {{birthday | timeFormat}}
                </Col>
            </Row>
        </FormItem>
        <FormItem label="性别">
            {{sex==0?'男':'女'}}
        </FormItem>
        <FormItem label="爱好">
            <Tag v-for="(item,index) in like" :key="index" :name="item" closable color="green">{{item}}</Tag>
        </FormItem>
        
        <FormItem label="简介">
            <span>{{intro}}</span>
        </FormItem>
        <FormItem label="查看">
            <Button type="ghost" @click="handleRoute(1)">
                  TA发表的动态
            </Button>
            <Button type="ghost" @click="handleRoute(2)">
                  TA上传的照片
            </Button>
            <Button type="ghost" @click="handleRoute(3)">
                  TA上传的文件
            </Button>
        </FormItem>
    </Form>
  </div>  
</div>
</template>
<script>
import {roomApi,handleUpload} from '@/common/api.js'

export default {
  name: 'userMsgDetail',
  data () {
    return {
      id: 0,
      otherId:0,
      res:'',
      head:'',
      username: '',
      birthday: '',
      sex: '',
      like: [],
      intro: '',
      defualtHead:'../../../static/img/defualt_head.png',
      imgBaseSrc:'',
      routerArr:['/index/room/talk','/room/myDynamic','/room/myAlbum','/room/myFile']
    }
  },
  methods: {
    handleRoute(index){
      let id = this.id
      let otherId = this.otherId
      this.$router.push({ 
            path: this.routerArr[index],
            query:{
              otherId,id
            }
      })
    },
  },
  created(){
      let {otherId,id} = this.$route.query
      this.id = id
      this.otherId = otherId;
      roomApi.getUserMsg({_id:otherId}).then(res => {
        res = res.data
        if(res.code){
          res = res.userMsg
          this.username = res.username
          this.birthday = res.birthday || ''
          this.sex = res.sex || ''
          this.like = res.like || []
          this.intro = res.intro || ''
          this.head = res.head || ''
        }
      })  
  },
  filters: {
    timeFormat: value => {
            if (!value) return ''
            String(value).split('T')
            return String(value).split('T')[0]
          },
  },
  beforeMount(){
    console.log(this.head)
  }
}
</script>
<style scoped>
  .box{
    padding: 60px;
    max-width: 750px;
    position: relative;
    margin: 0 auto;
  }
  .back{
    position: absolute;
    top: 20px;
    left: 0;
    z-index: 1003;
  }
  .userInfo{
    text-align: center;
    margin: 10px 0 80px 0;
  }
  .img{
    height: 100px;
    width: 100px;
    border-radius: 50%;
    display: block;
    /* margin: 10px auto; */
    margin-left: 36px;
    cursor: pointer;
    overflow: hidden;
    position: relative;
  }
  .img img{
    width: 100%;
    min-height: 100%;
  }
  .img input{
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
  }
  .ivu-modal{
    z-index: 1002;
  }
</style>
