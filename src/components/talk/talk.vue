<template>
    <div class="room">
        <div class="main">
          <div class="msgBox" >
            <a class="loadMore" @click="loadMore">{{canLoadMore?'加载更多':'没有更多了'}}</a>
            <template v-for="(item,index) in msgList">
              <div   :key="index" :class="'row '+ (item.id==myId?'myRow':'otherRow')" v-if="!item.isdel">
                  <img :src="item.head == ''||item.anonymity?defualtHead:imgBaseSrc + item.head"   class="hearShot">
                  <div class="wrap">
                    <div class="nickName" :class="{ anonymity: item.anonymity }">{{item.anonymity?'匿名用户':item.name}}</div>
                    <div class="time">{{item.time | timeFormat}}</div>
                  </div>
                  <div class="msgWrap">
                    <template v-if="item.type == 0">
                        <div class="message">{{item.txt}}</div>
                    </template>
                    <template v-if="item.type == 1">
                        <div class="message"><i :class="'iconfont ' +item.txt"></i></div>
                    </template>
                    <template v-if="item.type == 3">
                        <div class="message imgmessage"><img :src="imgBaseSrc+item.txt" alt=""></div>
                    </template>
                    <template v-if="item.type == 4">
                        <div class="message imgmessage">
                          <video controls :src="imgBaseSrc+item.txt">
                            您的浏览器不支持Video标签。
                          </video>
                        </div>
                    </template>
                    <template v-if="item.id == myId">
                        <div style="padding:5px;"><a style="color:red;" @click="handleDelHis(index)">撤回</a></div>
                    </template>
                  </div>
              </div>
              <template v-else>
                  <div style="padding:30px 0;text-align: center;color:red;"> {{item.anonymity?'匿名用户':item.name}}撤回了一条消息</div>
              </template>
            </template>
          </div>
          <div class="edit">
            <div class="otherbar">
              <div>
                <Tooltip content="表情" placement="top">
                  <i class="iconfont icon-smiling" @click="handleEmoji('icon-smiling')"></i>
                </Tooltip> 
                <div class="emoji" v-show="emojiShow">
                  <i v-for="(itme,index) in emojiList" :class="'iconfont '+itme"  @click="handleEmoji(itme)" :key="index"></i>
                  </div>
                </div>  
                <div>
                  <Tooltip content="图片" placement="top">
                    <i class="iconfont icon-tupian"><input type="file" class="file" accept="image/png,image/gif,image/jpeg" @change="handleLoad($event)"></i>
                  </Tooltip>
                </div>
                <div>
                  <Tooltip content="视频" placement="top">
                    <Icon type="videocamera"></Icon><input type="file" accept="video/mp4,video/ogg,video/webm" class="file" @change="handleLoad($event,true)"></i>
                  </Tooltip>
                </div>
                <div @click="handleAnonymity()">
                  <Tooltip content="匿名聊天" placement="top">
                      <template v-if="isanonymity">
                        <Icon type="eye-disabled" style="color:red;"></Icon>
                      </template>
                      <template v-else >
                        <Icon type="eye" ></Icon>
                      </template>
                  </Tooltip>
                </div>
                
              </div>
            <textarea autofocus v-model="message" @keyup.13="handleMessage()"></textarea>
            <div class="todo">
              <Button  size="small" @click="handleClear()">清空输入</Button>
              <Button  size="small" @click="handleMessage()">发送(enter)</Button>    
            </div>
          </div>
        </div>
    </div>
</template>

<script>
import '@/common/emoji/iconfont.css'
import './talk.css'
import {roomApi,handleUpload} from '@/common/api.js'
export default {
  name: 'talk',
  data () {
    return {
      socket:null,
      defualtHead:'../../../static/img/defualt_head.png',
      myId:0,
      username:'',
      head:'',
      emojiShow:false,
      message:'',
      isScroll:false,
      msgList:[],
      imgBaseSrc:'',
      isanonymity:false,
      isrecall:false,
      canLoadMore:false,
      isFirstLoad:true,
      pageNum:30,
      page:0,
      emojiList: [
        'icon-icon_emoji',
        'icon-_ico_emoji',
        'icon-emoji_line',
        'icon-emoji_line1',
        'icon-emoji_line2',
        'icon-emoji_line3',
        'icon-emoji_line4',
        'icon-emoji_line5',
        'icon-emoji_line6',
        'icon-emoji_line7',
        'icon-emoji_line8',
        'icon-emoji_line9',
        'icon-emoji_line10',
        'icon-emoji_line11',
        'icon-emoji_line12',
        'icon-emoji_line13',
        'icon-emoji_line14',
        'icon-emoji_line15',
        'icon-emoji_line16',
        'icon-emoji_line17',
        'icon-emoji_line18',
        'icon-emoji_line19',
        'icon-emoji_line20',
        'icon-emoji_line21',
        'icon-emoji_line22',
        'icon-emoji_line23',
        'icon-emoji_line24',
        'icon-emoji_line25',
        'icon-emoji_line26',
        'icon-emoji_line27',
        'icon-emoji_line28',
        'icon-emoji_line29',
        'icon-emoji_line30',
        'icon-emoji_line31',
        'icon-emoji_line32',
        'icon-emoji_line33',
        'icon-emoji_line34',
        'icon-emoji_line35',
        'icon-emoji_line36',
        'icon-emoji_line37',
        'icon-emoji_line38',
        'icon-emoji_line39',
        'icon-emoji_line40',
        'icon-emoji_line41',
        'icon-emoji_line42',
        'icon-emoji_line43',
        'icon-emoji_line44',
        'icon-emoji_line45',
        'icon-emoji_line46',
        'icon-emoji_line47',
        'icon-emoji_line48',
        'icon-emoji_line49',
        'icon-emoji_line50',
        'icon-emoji_line51',
        'icon-emoji_line52',
        'icon-emoji_line53',
        'icon-emoji_line54',
        'icon-emoji_line55',
        'icon-emoji_line56',
        'icon-emoji_line57',
        'icon-emoji_line58',
        'icon-emoji_line59',
        'icon-emoji_line60',
        'icon-emoji_line61',
        'icon-emoji_line62',
        'icon-emoji_line63',
        'icon-emoji_line64',
        'icon-emoji_line65',
        'icon-emoji_line66',
        'icon-emoji_line67'
      ],
    }
  },
  methods: {
    handleEmoji(emojiName){
      console.log(emojiName)
      if(emojiName == 'icon-smiling'){
        this.emojiShow = !this.emojiShow
        return
      }
      new Promise((resolve,reject) => {
        this.socket.emit('diliverMessage',{
          id:this.myId,
          type:1,
          name:this.username,
          head:this.head,
          time:new Date().getTime(),
          txt:emojiName,
          anonymity:this.isanonymity
        })
        resolve();
      }).then(data => {
        this.emojiShow = !this.emojiShow
      })
    },
    handleMessage(){
      console.log(this.message)
      if(this.message.length <= 0){
        return  this.$Message.error('不能发送空消息');
      }
      new Promise((resolve,reject) => {
        this.socket.emit('diliverMessage',{
          id:this.myId,
          type:0,
          name:this.username,
          head:this.head,
          time:new Date().getTime(),
          txt:this.message,
          anonymity:this.isanonymity
        })
        resolve();
      }).then(data => {
        this.message = ''
      })
      
    },
    handleClear(){
      this.message = ''
    },
    handleAnonymity(){
      this.isanonymity = !this.isanonymity 
    },
    handleSocket(){
      this.socket.on('message',data => {
        console.log(data)
        this.msgList.push(data)
        this.isScroll = true;
      })
      this.socket.on('recallMsg',index => {
        let data = this.msgList[index]
            data.isdel = true;
            this.msgList.splice(index,1,data)
            this.$Message.success('撤回成功！');
        })
    },
    handleScroll(){
      document.getElementsByClassName('msgBox')[0].scrollTop = document.getElementsByClassName('msgBox')[0].scrollHeight
    },
    handleLoad(e,isVideo){
      let param = handleUpload(e)
      let type = 3
      if(isVideo){
        type = 4
      }
      roomApi.upload(param).then(res => {
        res = res.data
        if(!res.code){
          this.socket.emit('diliverMessage',{
            id:this.myId,
            type:type,
            name:this.username,
            head:this.head,
            time:new Date().getTime(),
            txt:res.img,
            anonymity:this.isanonymity
          })
        }
      })
    },
    handleGetMsg(){
        roomApi.getHistory({pageNum:this.pageNum,page:this.page}).then(res => {
          console.log(res)
          let list = res.data.hisToryList.sort((a,b) => {
            return a.time - b.time
          })
          if(list.length == 30){
            this.canLoadMore = true
          }else{
            this.canLoadMore = false
          }
          this.msgList = [...list,...this.msgList]
          if(this.isFirstLoad){
            this.handleScroll()
          }
          this.isFirstLoad = false

        })
    },
    loadMore(){
      if(!this.canLoadMore){
        return this.$Message.info('没有更多了');
      }
      this.page++ 
      this.handleGetMsg()
    },
    handleDelHis(index){
      let {_id,time} = this.msgList[index]
      let currentTime =  new Date().getTime();
        if(currentTime - time > 120000){
          return this.$Message.error('消息发出两分钟之后不可撤回！');
        }
      this.socket.emit('recall',{_id,index}) 
    }
  },
  watch: {

  },
  props: ['propsData'],
  created(){
    let {username,myId,head,socket} = this.propsData
    this.username = username
    this.myId = myId
    this.head = head
    this.socket = socket
    this.handleGetMsg()
    this.handleSocket()
  },
  mounted(){
    this.handleScroll()
  },
  updated(){
    if(this.isScroll){
      this.handleScroll()
      this.isScroll = false
    }
  },
  filters: {
    timeFormat: value => {
            if (!value) return ''
            let date = new Date(value)
            value = (String(date.getHours()).length>1?date.getHours():'0'+date.getHours()) 
                 + ':' + (String(date.getMinutes()).length>1?date.getMinutes():'0'+date.getMinutes()) 
                 + ':' + (String(date.getSeconds()).length>1?date.getSeconds():'0'+date.getSeconds())
            return value
          },
  },
}
</script>
<style scoped>
  
</style>
