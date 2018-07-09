<template>
  <div>
      <div class="main alb_main">
        <div class="alb_nav">
          <Button type="primary" @click="handleAddAlbmu()">
              <Icon type="arrow-up-c"></Icon>
              发表动态
          </Button>
        </div>
        <div class="wrap">
          <div class="abl_item" v-for="(item,index) in dynamicList" :key="index">
            <div class="abl_body">
              <div class="alb_userInfo">
                <img :src="item.head == ''?defualtHead:imgBaseSrc + item.head">
                <div>
                  <p>{{item.username}}</p>
                  <p><span>{{item.time | timeFormat}}</span> 发表</p>
                </div>
              </div>
              <h3>{{item.txt}}</h3>
              <!-- <div class="contant">{{item.txt}}</div> -->
              <div class="imgWrap">
                <div class="imgItem" v-for="(itemc,index1) in item.pciture" :key="index1">
                    <div><img :src="imgBaseSrc + itemc"></div>
                </div>
                
              </div>
            </div>
            <div class="comment">
              <p><Icon type="chatbox-working"></Icon> 评论</p>
                <div class="commentItem" v-for='(ite,idx) in item.commentList' :key="idx">
                  <img :src="ite.head == ''?defualtHead:imgBaseSrc + ite.head">
                  <div>
                    <p><span>{{ite.username || ite.userName}}：</span>{{ite.txt}}</p>
                    <p style="font-size:12px;"><span>{{ite.time | timeFormat}} </span>发布</p>
                  </div>
                </div>
            </div>
            <div class="mycomment">
              <Input v-model="mycomment[index]" icon="edit" placeholder="我也说一句" style="width: 100%" @on-enter="handleAddComment(index)" ></Input>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import {dynamicApi,commentApi} from '@/common/api.js'
export default {
  name: 'userMsgDetail',
  data () {
    return {
      myId:0,
      mycomment:[],
      username:'',
      defualtHead:'../../../static/img/defualt_head.png',
      head:'',
      dynamicList:[],
      imgBaseSrc:'http://localhost:8889',
    }
  },
  methods: {
    handleAddAlbmu(){
      let id = this.myId
      let username = this.username
      let head = this.head
      this.$router.push({
        path:'/index/room/addDynamic',
        query: {id,username,head}
      })
    },
    handleAddComment(index){
      return this.$Message.error('评论不能为空！');
      if(this.mycomment[index].length <= 0){
        return this.$Message.info('评论不能为空！');
      }
      if(this.isAdd){
        return this.$Message.info('您评论太频繁了，请稍后再试！');
      }
      commentApi.addComment({
        id:this.dynamicList[index]._id,
        txt:this.mycomment[index],
        time:new Date().getTime(),
        userId:this.myId,
        username:this.username,
        head:this.head
      }).then(res => {
        console.log(res.data.msg)
        let data = this.dynamicList[index]
        data.commentList.push(res.data.msg)
        this.dynamicList.splice(index,1,data)
        this.mycomment = []
        this.isAdd = true
        setTimeout(()=>{
          this.isAdd = false
        },3000)
      })
    },
  },
  created(){
    let {id}= this.$route.query
    let {username,head} = JSON.parse(localStorage.getItem('trunMsg'))
    this.myId = id;
    this.username = username
    this.head = head
    dynamicApi.getDynamic().then(res => {
      this.dynamicList = res.data.dynamicList
    })
  },
  filters: {
    timeFormat: value => {
            if (!value) return ''
            let date = new Date(value)
            let month = date.getMonth() + 1
            value = String(date.getFullYear()) 
                 + '-' + (String(month).length>1?month:'0'+month) 
                 + '-' + (String(date.getDate()).length>1?date.getDate():'0'+ date.getDate())
                 + '  ' + (String(date.getHours()).length>1?date.getHours():'0' + date.getHours())
                 + ':' + (String(date.getMinutes()).length>1?date.getMinutes():'0'+date.getMinutes()) 
                 + ':' + (String(date.getSeconds()).length>1?date.getSeconds():'0'+date.getSeconds())
            return value
          },
  },
}
</script>
<style scoped>
  .main{
    width: 100%;
    height: 100%;
    overflow: auto;
  }
  .alb_nav{
    padding: 10px;
    text-align: right;
    width: 100%;
    border-bottom: 1px solid #e0e0e0;
  }
  .wrap{

    max-width: 560px;
    margin: 10px 0 20px 30px;
  }
  .abl_item{
    width: 100%;
    /* background: #f0f2f5; */
    margin-bottom: 20px;
    border-radius: 5px;
    /* border-bottom: 1px solid #e0e0e0; */
  }
  .abl_body{
    padding: 10px;
    border-bottom: 1px solid #e0e0e0;
  }
  .alb_userInfo{
    display: flex;
    padding-bottom: 15px;
    justify-content: flex-start;
    align-items: center;
  }
  .alb_userInfo img{
    height: 50px;
    width: 50px;
    border-radius: 50%;
    margin-right: 10px;
    
  }
  .alb_userInfo div p:nth-child(1){
    font-size: 14px;
    color: #4680b8;
  }
  .imgWrap{
    overflow: auto;
  }
  .imgItem{
    width: 31.33%;
    max-height: 250px;
    margin: 0 10px 10px 0;
    float: left;
    overflow: hidden;
  }
  .imgItem div{
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .imgItem div img{
    width: 100%;
    margin: 0;
  }
  .comment{
    padding: 10px;
  }
  .comment > p {
    font-size: 14px;
    color: #4680b8;
    padding: 10px;
    padding-top: 0;
  }
  .commentItem{
    padding: 10px;
    padding-top: 0;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .commentItem img{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
  }
  .commentItem div > p:nth-child(1){
    font-size: 14px;
  }
  .commentItem  p  span{
    color: #4680b8;
  }
  .mycomment{
    padding: 10px;
    padding-top: 5px;
  }
  h3{
    padding: 0 10px 10px 10px;
    color: #495060;
  }
</style>
