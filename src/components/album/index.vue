<template>
  <div>
      <div class="main alb_main">
        <div class="alb_nav">
          <Button type="primary" @click="handleAddAlbmu()">
              <Icon type="arrow-up-c"></Icon>
              上传照片
          </Button>
        </div>
        <div class="wrap">
          <div class="abl_item" v-for="(item,index) in albumList" :key="index">
            <div class="abl_body">
              <div class="alb_userInfo">
                <img :src="item.head == ''?defualtHead:imgBaseSrc + item.head">
                <div>
                  <p>{{item.username}}</p>
                  <p><span>{{item.time | timeFormat}}</span> 上传{{item.pciture.length}}张照片到《照片墙》</p>
                </div>
              </div>
              <h3>{{item.title}}</h3>
              <div class="imgWrap">
                <div class="imgItem" v-for="(itemc,index1) in item.pciture" :key="index1">
                    <div><img :src="imgBaseSrc + itemc"></div>
                </div>
                
              </div>
            </div>
            <!-- <div class="comment">
              <p><Icon type="chatbox-working"></Icon> 评论</p>
                <div class="commentItem" v-for='(ite,idx) in item.commentList' :key="idx">
                  <img :src="imgBaseSrc+ite.head">
                  <div>
                    <p><span>{{ite.username || ite.userName}}：</span>{{ite.txt}}</p>
                    <p style="font-size:12px;"><span>{{ite.time | timeFormat}} </span>发布</p>
                  </div>
                </div>
            </div>
            <div class="mycomment">
              <Input v-model="mycomment[index]" icon="edit" placeholder="我也说一句" style="width: 100%" @on-enter="handleAddComment(index)" ></Input>
            </div> -->
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import {albumApi,commentApi} from '@/common/api.js'
export default {
  name: 'userMsgDetail',
  data () {
    return {
      myId:0,
      mycomment:[],
      username:'',
      head:'',
      albumList:[],
      imgBaseSrc:'',
      defualtHead:'../../../static/img/defualt_head.png',
    }
  },
  methods: {
    handleAddAlbmu(){
      let id = this.myId
      let username = this.username
      let head = this.head
      this.$router.push({
        path:'/index/room/addAlbum',
        query: {id,username,head}
      })
    },
    // handleAddComment(index){
    //   console.log('...')
    //   commentApi.addComment({
    //     id:this.albumList[index]._id,
    //     txt:this.mycomment[index],
    //     time:new Date().getTime(),
    //     userId:this.myId,
    //     username:this.username,
    //     head:this.head
    //   }).then(res => {
    //     console.log(res.data.msg)
    //     let arr = this.albumList
    //     if(arr.commentList){
    //       arr.commentList.push(res.data.msg)
    //       this.albumList = []
    //       this.albumList = arr
    //       return
    //     }
    //     arr.commentList = []
    //     arr.commentList.push(res.data.msg)
    //     this.albumList = []
    //     this.albumList = arr
    //   })
    // },
  },
  created(){
    let {id,username,head}= this.$route.query
    this.myId = id;
    this.username = username
    this.head = head
    albumApi.getAlbum().then(res => {
      this.albumList = res.data.albumList
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
    padding: 0 10px 10px 50px;
    color: #495060;
  }
</style>
