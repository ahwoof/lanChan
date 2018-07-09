<template>
  <div id="Room">
      
      <div class="userList">
        <h2>在线群成员</h2>
        <div class="listItem" v-for="(item,index) in userList" :key="index" v-if="item.id != myId" @click="handleRoute(index)">
          <Avatar :src="item.head==''?defualtHead:imgBaseSrc + item.head" size="large" />
          <span>{{item.username}}</span>
        </div>
      </div>
      <div class="content">
        <router-view class="routerView" :propsData="propsData"    @handleEmit="handleEmit"/>
      </div>
  </div>
</template>

<script>


export default {
  name: 'login',
  data () {
    return {
      defualtHead:'../../static/img/defualt_head.png',
      socket:null,
      myId:0,
      username:'',
      head:'',
      propsData:{},
      userList:[],
      imgBaseSrc:'',
    }
  },
  methods: {
    handleEmit(data){
      this.username = data.username
      this.head = data.head
      this.propsData = {
        username:this.username,
        myId:this.myId,
        head:this.head,
        socket:this.socket,
        otherId:1,
        roomName:'LANChat'
      }
    },
    handleGetMsg(){
      let {id,username,head} = JSON.parse(localStorage.getItem('trunMsg'))
      console.log(id,username,head)
      this.username = username
      this.myId = id
      this.head = head
      let host = window.location.host
      host = host.split(':')
      this.socket = io.connect('ws://' + host[0] + ':8888');
      this.socket.emit('into',{username,id,head})
      this.propsData = {
        username:this.username,
        myId:this.myId,
        head:this.head,
        socket:this.socket,
        otherId:1,
        roomName:'LANChat'
      }
    },
    handleSocket(){
      this.socket.on('userList',data => {
        this.userList = data;
      })
      this.socket.on('notice',res =>{
        console.log(res)
        if(res.type == 0){
          if(res.msg.id != this.myId){
            this.userList.push(res.msg)
            this.$Notice.info({
              title:res.msg.username + '上线了'
            })
          }
        }else{
          let index = this.handleCheckUselist(res.msg);
          let username = this.userList[index].username
          this.userList.splice(index,1);
          this.$Notice.info({
              title:username + '下线了'
          })
        }
      })
    },
    handleRoute(index){
      this.$router.push({ 
          path: '/room/otherMsg',
          query:{
            otherId:this.userList[index].id,
            id:this.myId
          }
      })
    },
    handleCheckUselist(val){
      for (var i = 0; i < this.userList.length; i++) { 
				　　if (this.userList[i].id == val) { 
				　　	return i; 
					} 
			} 
			return -1
    },
    // handleEmit(){

    // }
  },
  created(){
      this.handleGetMsg()
      this.handleSocket()
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
   #Room{
    width: 100%;
    height: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center; 
    /* background: #f0f2f5;*/
  }
  .userList{
    width: 190px;
    height: 100%;
    /* max-height: 765px; */
    background-color: #6699ff;
    padding: 20px 12px;
    position: relative;
    overflow-y: auto;
    /* padding-bottom: 90px; */
  }
  .userList h2{
    padding-bottom: 14px;
    padding-left: 26px;
    color: #202d38;
  }
  
  .listItem{
    padding:5px 0;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  /* .listItem > img{
    height: 32px;
    width: 32px;
    border-radius: 50%;
    border:1px solid #202d38;
    
  } */
  .listItem span:nth-child(2){
    margin-left: 10px;
    font-weight: bolder;
    color: #202d38;
  }
  .content{
    width: -moz-calc(100% - 190px);
    width: -webkit-calc(100% - 190px); 
    width: -o-calc(100% - 190px);
    width: -ms-calc(100% - 190px);
    width: calc(100% - 190px);
    /* max-width: 964px; */
    height: 100%;
    /* max-height: 765px; */
    background: #f0f2f5;
    padding: 0 26px 26px 26px;
  }
  .routerView{
    width: 100%;
    /* height: -moz-calc(100% - 120px);
    height: -webkit-calc(100% - 120px); 
    height: -o-calc(100% - 120px);
    height: -ms-calc(100% - 120px);
    height: calc(100% - 120px); */
    height: 100%;
  }
</style>
