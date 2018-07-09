<template>
    <div>
        <h1>
          <span>{{roomName}}</span>
          <div class="userInfo">
            <div class="listItem">
              <img :src="head == ''?defualtHead:this.imgBaseSrc + head"> 
              <span>{{username}}</span>
              <Icon type="arrow-down-b"></Icon>
            </div>
            <div class="eidtUser">
              <a v-for="(item,index) in routeArr" :key="index" @click="handleRoute(index)">{{item.txt}}</a>
            </div>
          </div>
        </h1>
        <Menu ref="menu" mode="horizontal" theme="light" :active-name="0" >
            <MenuItem v-for="(item,index) in navArr" :name="index" :key="index" @click.native="handleNav(item.path)">
                <Icon :type="item.icon"></Icon>
                {{item.txt}}
            </MenuItem>
        </Menu>
        <router-view class="routerChild" :propsData="propsData"  />
    </div>
</template>

<script>
export default {
  name: 'talk',
  data () {
    return {
      socket:null,
      defualtHead:'../../../static/img/defualt_head.png',
      myId:0,
      username:'',
      imgBaseSrc:'',
      head:'',
      roomName:'',
      
      routeArr:[{
        path:'/room/userMsgDetail',
        txt:'我的资料',
      },{
        path:'/room/myAlbum',
        txt:'我上传的照片',
      },{
        path:'/room/myFile',
        txt:'我上传的文件',
      },{
        path:'/room/myDynamic',
        txt:'我发表的动态',
      },{
        path:'/',
        txt:'退出登录',
      }],
      navArr:[{
        path: '/index/room/talk',
        icon: 'chatboxes',
        txt: '聊天'
      },{
        path: '/index/room/album',
        icon: 'android-image',
        txt: '照片墙'
      },{
        path: '/index/room/file',
        icon: 'android-folder',
        txt: '群文件'
      },{
        path: '/index/room/dynamic',
        icon: 'android-hangout',
        txt: '群动态'
      }]
    }
  },
  methods: {
      
      handleRoute(index){
        let id = this.myId
        this.$router.push({ 
                            path: this.routeArr[index].path,
                            query: {id}
                        })
      },
      handleNav(path){
        let id = this.myId
        let username = this.username
        let head = this.head
        this.$router.push({ 
            path: path,
            query: {id,username,head}
          })
      }
  },
  watch: {},
  props: ['propsData'],
  created(){
    console.log(this.propsData)
    let {username,myId,head,socket,roomName} = this.propsData
    this.username = username
    this.myId = myId
    this.head = head
    this.roomName = roomName
    this.socket = socket

  },
}
</script>
<style scoped>
  h1{
    font-size: 16px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  h1 i{
    font-size: 22px;
    margin:2px 20px 0 10px
  }
  h1 span{
    margin: 4px 0 0 0;
    color: #26323d;
  }
  .userInfo{
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
  }
  .userInfo .listItem{
    height: 100%;
    cursor: default;
  }
  .userInfo .listItem > img{
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  .userInfo .listItem > i{
    cursor: pointer;
  }
  .eidtUser{
    position: absolute;
    top:58px;
    right: 20px;
    z-index: 999;
    font-size: 12px;
    background: #f7f7f7;
    border: 1px solid #dddee1;
    border-radius: 5px;
    display: none;
  }
  .userInfo:hover .eidtUser {
    display: block;
  }
    .eidtUser > a{
        height: 38px;
        line-height: 38px;
        padding-left: 30px;
        color: #666;
        position: relative;
        width: 170px;
        text-align: left;
        border-bottom: 1px solid #dddee1;
        display: block;
    }
    .eidtUser > a:hover{
      cursor: pointer;
      color: #2d8cf0;
    }
    .routerChild{
        width: 100%;
        height: -moz-calc(100% - 120px);
        height: -webkit-calc(100% - 120px); 
        height: -o-calc(100% - 120px);
        height: -ms-calc(100% - 120px);
        height: calc(100% - 120px);
    }
    .ivu-menu-horizontal {
        height: 40px;
        line-height: 40px;
    }
    .listItem{
        padding:5px 0;
        display: flex;
        align-items: center;
        cursor: pointer;
    }
    .listItem span{
        margin-left: 10px;
    }
</style>
