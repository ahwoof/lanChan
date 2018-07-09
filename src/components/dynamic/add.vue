<template>
  <div>
      <div class="main alb_main">
          <div style="padding:10px;">
             <Button type="ghost" @click="handleBack()">
                    <Icon type="arrow-left-c"></Icon>
                    返回动态
            </Button>
          </div>
          <h3>发表动态</h3>
        <div class="wrap">
          <div class="abl_item">
            <!-- <div class="alb_title"><div>标题：</div><Input v-model="title" placeholder="标题"></Input></div> -->
            <div class="alb_title"><div>内容：</div><Input type="textarea" v-model="txt" placeholder="内容"></Input></div>
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
                        选择照片
                </Button>
                <Button type="primary" @click="handleAddAlbmu()">
                        <Icon type="help"></Icon>
                        确定发表
                </Button>
                <input style="display:none;" type="file" ref="file" accept="image/png,image/gif,image/jpeg" @change="handleLoad($event)" />
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import {dynamicApi,roomApi,handleUpload} from '@/common/api.js'
export default {
  name: 'userMsgDetail',
  data () {
    return {
        myId:0,
        isadd:false,
        picList:[],
        imgBaseSrc:'',
        title:'',
        txt:'',
        username:'',
        head:'',
        afterAdd:false,
    }
  },
  methods: {
    handleAddAlbmu(){
        if(this.picList.length <=0 && this.txt.length <= 0){
          return this.$Message.error('请输入动态内容或上传动态图片');
        }
        if(this.afterAdd){
          return this.$Message.info('您发表的太频繁了，请稍后再试！');
        }
        dynamicApi.upDynamic({id:this.myId,pciture:this.picList,time:new Date().getTime(),title:this.title,txt:this.txt}).then(res => {
            res = res.data
            if(res.code){
                this.picList = []
                this.title= ''
                this.txt= ''
                this.$Message.success('发表成功');
                this.afterAdd = true
                setTimeout(()=>{
                  this.afterAdd = false
                },5000)
            }
        })
    },
    handleBack(){
        let id = this.myId
        let username = this.username
        let head = this.head
        this.$router.push({
            path:'/index/room/dynamic',
            query: {id,username,head}
        })
    },
    handleaddPic(){
        if(this.picList.length >= 9){
            return  this.$Message.error('最多可上传9张图片');
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
        margin-top: 10px;
    }
    .alb_title > div:nth-child(1){
        width: 45px;
    }
</style>
