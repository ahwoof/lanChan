<template>
  <div>
        <div class="main alb_main">
            <div class="alb_nav">
            <Button type="ghost" @click="handleBack()">
                    <Icon type="arrow-left-c"></Icon>
                    返回聊天室
            </Button>
            </div>
            
            <div class="List">
                <!-- <h3>文件列表</h3> -->
                <div class="listItem" >
                    <div style="color: red;">文件名</div>
                    <div style="color: red;">上传者</div>
                    <div style="color: red;">时间</div>
                    <div><a style="color: red;">操作</a></div>
                </div>
                <div class="listItem" v-for="(item,index) in fileList" :key="index">
                    <div>{{item.filename}}</div>
                    <div>{{item.username || ''}}</div>
                    <div>{{item.time | timeFormat}}</div>
                    <div><a :href="imgBaseSrc + item.src"  :download="item.filename">下载</a></div>
                </div>
            </div>
        </div>
  </div>
</template>

<script>
import {fileApi} from '@/common/api.js'
export default {
  name: 'userMsgDetail',
  data () {
    return {
      myId:0,
      username:'',
      head:'',
      fileList:[],
      imgBaseSrc:'',
    }
  },
  methods: {
    handleBack(){
      this.$router.push({ 
            path: '/index/room/talk',
      })
    },
  },
  created(){
    let {id,username,head,otherId}= this.$route.query
    this.myId = id;
    this.username = username
    this.head = head
    if(otherId){
      id = otherId
    }
    fileApi.getFile({id:id}).then(res => {
        this.fileList = res.data.msg
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
    /* text-align: right; */
    width: 100%;
    border-bottom: 1px solid #e0e0e0;
  }
  .List{
    margin: 10px 0 20px 30px;
    overflow-y: auto;
  }
  .listItem{
      padding: 10px;
      overflow: hidden;
      border-bottom: 1px solid #e0e0e0;
    }
  .listItem div {
      float: left;
      width: 25%;
  }
</style>
