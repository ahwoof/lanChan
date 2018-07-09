<template>
  <div>
      <div class="main alb_main">
          <div style="padding:10px;">
             <Button type="ghost" @click="handleBack()">
                    <Icon type="arrow-left-c"></Icon>
                    返回相册
            </Button>
          </div>
          <h3>上传列表</h3>
        <div class="wrap">
          <div class="abl_item">
            <div class="alb_title"><div>标题：</div><Input v-model="title" placeholder="标题"></Input></div>
            <div class="abl_body">
              <div class="imgWrap">
                <div class="imgItem" v-for="(item,index) in picList" :key="index">
                    <div><img :src="imgBaseSrc + item"></div>
                </div>
              </div>
            </div>
            <div class="btnWrap">
                 <Button type="ghost" @click="handleaddPic()">
                        <Icon type="arrow-up-c"></Icon>
                        上传照片
                </Button>
                <Button type="primary" @click="handleAddAlbmu()">
                        <Icon type="help"></Icon>
                        确定上传
                </Button>
                <input style="display:none;" type="file" ref="file" accept="image/png,image/gif,image/jpeg" @change="handleLoad($event)" />
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import {albumApi,roomApi,handleUpload} from '@/common/api.js'
export default {
  name: 'userMsgDetail',
  data () {
    return {
        myId:0,
        isadd:false,
        picList:[],
        imgBaseSrc:'',
        title:'',
        username:'',
        head:''
    }
  },
  methods: {
    handleAddAlbmu(){
        if(this.picList.length == 0){
          return  this.$Message.error('请选择照片');
        }
        albumApi.upAlbum({id:this.myId,pciture:this.picList,time:new Date().getTime(),title:this.title,head:this.head,username:this.username}).then(res => {
            res = res.data
            if(res.code){
                this.picList = []
                this.title= ''
                this.$Message.success('上传成功');
            }
        })
    },
    handleBack(){
        let id = this.myId
        let username = this.username
        let head = this.head
        this.$router.push({
            path:'/index/room/album',
            query: {id,username,head}
        })
    },
    handleaddPic(){
        if(this.picList.length >= 18){
            return  this.$Message.error('每次最多可上传18张图片');
        }
       this.$refs.file.click()
    },
    handleLoad(e){
      let param = handleUpload(e)
          roomApi.upload(param).then(res => {
            res = res.data
            if(!res.code){
              this.picList.push(res.img)
            }
        })
    },
  },
  created(){
    let {id,username,head}= this.$route.query
    this.myId = id;
    this.username = username
    this.head = head
    console.log(id,username,head)
  }
}
</script>
<style scoped>
  .main{
    width: 100%;
    height: 100%;
    overflow: auto;
  }
  .wrap{
    margin: 0 auto;
    max-width: 560px;
    /* margin-top: 10px; */
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
    h3{
        padding: 10px;
        text-align: center
    }
    .btnWrap{
        padding: 10px;
        text-align: center
    }
    .btnWrap button:nth-child(2){
        margin-left: 10px;
    }
    .alb_title{
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    .alb_title > div:nth-child(1){
        width: 45px;
    }
</style>
