<template>
  <div>
      <div class="main alb_main">
          <div style="padding:10px;">
             <Button type="ghost" @click="handleBack()">
                    <Icon type="arrow-left-c"></Icon>
                    返回群文件
            </Button>
          </div>
          <h3>上传列表</h3>
        <div class="wrap">
          <div class="abl_item">
            <div class="abl_body">
              <div class="imgWrap">
                <div class="fileItem" v-for="(item,index) in fileList" :key="index">
                    <Tag  :name="item.name" closable @on-close="handleDelFile(index)">{{item.name}}</Tag>
                </div>
              </div>
            </div>
            <div class="btnWrap">
                 <Button type="ghost" @click="handleaddPic()">
                        <Icon type="arrow-up-c"></Icon>
                        选择文件
                </Button>
                <Button type="primary" @click="handleAddAlbmu()">
                        <Icon type="help"></Icon>
                        确定上传
                </Button>
                <input style="display:none;" type="file" ref="file"  @change="handleLoad($event)" />
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import {fileApi,roomApi,handleUpload} from '@/common/api.js'
export default {
  name: 'userMsgDetail',
  data () {
    return {
        myId:0,
        isadd:false,
        fileList:[],
        name:'',
        username:'',
        head:''
    }
  },
  methods: {
    handleAddAlbmu(){
        console.log(this.fileList.length)
        if(this.fileList.length == 0){
          return this.$Message.error('请选择文件');
        }
        fileApi.upFile({id:this.myId,fileList:this.fileList,time:new Date().getTime(),username:this.username}).then(res => {
            res = res.data
            if(res.code){
                this.fileList = []
                this.$Message.success('上传成功');
            }
        })
    },
    handleBack(){
        let id = this.myId
        let username = this.username
        let head = this.head
        this.$router.push({
            path:'/index/room/file',
            query: {id,username,head}
        })
    },
    handleaddPic(){
        if(this.fileList.length >= 9){
          return  this.$Message.error('每次最多可上传9个文件');
        }
       this.$refs.file.click()
    },
    handleLoad(e){
      let param = handleUpload(e)

        if(param.get('file').size > 100 * 1024 * 1024){
          return  this.$Message.error('文件过大，请重新上传');
        }
        // roomApi.upload(param).then(res => {
        //     res = res.data
        //     if(!res.code){
        //       this.fileList.push({src:res.img,name:res.name})
        //     }
        // })
    },
    handleDelFile(index){
      this.fileList.splice(index,1)
    }
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
  .fileItem{
    padding: 0 10px 10px 0;
  }
    h3{
        padding: 10px;
        /* text-align: center */
    }
    .btnWrap{
        padding: 10px;
        /* text-align: center */
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
        width: 60px;
    }
</style>
