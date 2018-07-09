<template>



  <div style="position:relative;">
    <div class="back">
      <Button type="ghost" @click="handleRoute()">
            <Icon type="arrow-left-c"></Icon>
            返回聊天室
      </Button>
    </div>
    <div class="box">
    <div class="userInfo">
      <div class="img">
        <img :src="head == ''? defualtHead:imgBaseSrc + head" alt="">
        <input type="file" accept="image/png,image/jpeg" @change="handleLoad($event)">
      </div>
      <p>点击上传头像</p>
    </div>
    <Form :model="formItem" :label-width="80">
        <FormItem label="昵称">
            <Input :maxlength="8" v-model="formItem.username" placeholder="昵称"></Input>
        </FormItem>
        <FormItem label="生日">
            <Row>
                <Col span="11">
                    <DatePicker :value="formItem.birthday" type="date" placeholder="生日" v-model="formItem.birthday"></DatePicker>
                </Col>
            </Row>
        </FormItem>
        <FormItem label="性别">
            <RadioGroup v-model="formItem.sex" >
                <Radio :label="0">男</Radio>
                <Radio :label="1">女</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem label="爱好">
            <Tag v-for="(item,index) in formItem.like" :key="index" :name="item" closable color="green" @on-close="handledelLike()">{{item}}</Tag>
            <Button icon="ios-plus-empty" type="dashed" size="small" @click="handleAddLike()">添加爱好</Button>
        </FormItem>
        
        <FormItem label="简介">
            <Input v-model="formItem.intro" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="简介"></Input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit()">提交</Button>
        </FormItem>
    </Form>
  </div>
  <div v-if="isadd" >
    
  <div class="ivu-modal-wrap" >
    <div class="ivu-modal-mask" style=""  @click="handleClose()"></div>
    <div class="ivu-modal" style="width: 416px;">
      <div class="ivu-modal-content">
        <div class="ivu-modal-body">
          <div class="ivu-modal-confirm">
            <div class="ivu-modal-confirm-head">
              <div class="ivu-modal-confirm-head-title">
                </div></div>
                <div class="ivu-modal-confirm-body ivu-modal-confirm-body-render">
                  <div class="ivu-input-wrapper ivu-input-type">
                    <i class="ivu-icon ivu-icon-load-c ivu-load-loop ivu-input-icon ivu-input-icon-validate"></i> 
                    <input v-model="newLike" autocomplete="off" spellcheck="false" type="text" placeholder="添加爱好" autofocus="autofocus" class="ivu-input">
                    </div></div><div class="ivu-modal-confirm-footer"><button @click="handleClose()" type="button" class="ivu-btn ivu-btn-text ivu-btn-large">
                      <span>取消</span>
                      </button><button @click="handleConfirm()" type="button" class="ivu-btn ivu-btn-primary ivu-btn-large" >
                        <span>确定</span></button></div></div></div>
                        </div></div></div>
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
      res:'',
      head:'',
      defualtHead:'../../../static/img/defualt_head.png',
      imgBaseSrc:'',
      formItem: {
                  username: '',
                  birthday: '',
                  sex: '',
                  like: [],
                  intro: ''
                },
      isadd:false,
      newLike:''
    }
  },
  methods: {
    handleSubmit(){
      let {username,birthday,sex,like,intro} = this.formItem
      let head = this.head
      let id = this.id
      birthday = new Date(birthday).getFullYear() +'-'+ (new Date(birthday).getMonth()+1) +'-'+ (new Date(birthday).getDate())
      roomApi.updateUser({id,username,birthday,sex,like,intro,head}).then(res =>{
        res = res.data
        if(res.code){
          let trunMsg = {username,head}
          localStorage.setItem("trunMsg",JSON.stringify(trunMsg))
          this.$emit('handleEmit',{username,head})
          return this.$Message.success('修改成功');
        }
        this.$Message.success(res.msg);
      })
    },
    handleAddLike(){
      this.isadd = true
    },
    handledelLike(event, name){
      const index = this.formItem.like.indexOf(name);
      this.formItem.like.splice(index, 1);
    },
    handleLoad(e){
      console.log(e)
      let param = handleUpload(e)
          roomApi.upload(param).then(res => {
            res = res.data
            this.head = res.img
          })
    },
    handleRoute(){
      let {username,sex} = this.formItem
      let head = this.head
      let id = this.id
      let trunMsg = {username,id,head,sex}
      localStorage.setItem("trunMsg",JSON.stringify(trunMsg))
      this.$router.push({ 
            path: '/index/room/talk',
      })
    },
    handleClose(){
      this.isadd = false
      this.newLike = ''
    },
    handleConfirm(){
      if(this.newLike == ''){
        this.handleClose()
        return
      }
      this.formItem.like.push(this.newLike)
      this.handleClose()
    },
  },
  created(){
      let {id} = this.$route.query
      this.id = id;
      roomApi.getUserMsg({_id:id}).then(res => {
        res = res.data
        if(res.code){
          res = res.userMsg
          console.log(res)
          this.formItem.username = res.username
          this.formItem.birthday = res.birthday || ''
          this.formItem.sex = res.sex || ''
          this.formItem.like = res.like || []
          this.formItem.intro = res.intro || ''
          this.head = res.head || ''
        }
      })  
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
  .userInfo p {
    text-align: center;
    margin: 10px 0 20px 0;
  }
  .img{
    height: 100px;
    width: 100px;
    border-radius: 50%;
    display: block;
    margin: 10px auto;
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
  .back{

  }
</style>
