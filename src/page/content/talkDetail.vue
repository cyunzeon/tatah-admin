<template>
  <div class="talk-detail">
    <ul class="box-ul">
      <li v-for="talk in talkList" :key="talk.index" class="talk-item">
        <div class="top">
          <div class="left">
            <img :src="talk.head" alt="">
            <div class="info">
              <span>{{talk.nickName}}</span>
              <p>{{talk.adddate}}</p>
            </div>
          </div>
        </div>
        <div class="bottom">
          <ul class="talk-box">
            <li v-for="item in talk.commenlist">
              <div class="talk-items" v-if="item.commentNickName && !item.commentRNickName">
                <p>{{item.commentNickName}}:{{item.content}}</p>
                <el-button type="danger" @click="deletTalk(item)">删除</el-button>
              </div>
              <div class="talk-items" v-else-if="item.commentNickName && item.commentRNickName">
                <p>{{item.commentRNickName}}回复{{item.commentNickName}}:{{item.content}}</p>
                <el-button type="danger" @click="deletTalk(item)">删除</el-button>
              </div>
            </li>
          </ul>
        </div>

      </li>
    </ul>

  </div>
</template>

<script>
  import {
    getArticleDynamic,
    deleteCommentById
  } from '@/request/api'

  export default {
    data() {
      return {
        talkList: [],
        carticleId: this.$route.query.carticleid
      }
    },
    methods: {
      backAction() {
        this.$router.go(-1);
      },
      deletTalk(item) {
        deleteCommentById({
          commentId: item.commentId
        }).then(res => {
          if (res.data.code == 200) {
            this.$message({
              message: res.data.message,
              type: 'success'
            });
            getArticleDynamic({
              carticleId: this.$route.query.carticleId
            }).then(res => {
              console.log(res)
              this.talkList = res.data.data;
            })
          } else {
            this.$message.error(res.data.message);
          }

        })
      }
    },
    created() {
      getArticleDynamic({
        carticleId: this.$route.query.carticleId
      }).then(res => {
        console.log(res)
        this.talkList = res.data.data;
      })

    }
  }

</script>

<style lang="scss" scoped>
  .talk-detail {
    background: #fff;

    .box-ul {
      .talk-item {
        padding: 20px;
        border-bottom: 1px solid #eee;

        .top {
          display: flex;
          justify-content: space-between;

          .left {
            display: flex;
            align-items: center;

            img {
              width: 80px;
              height: 80px;
              border-radius: 50%;
            }
          }
        }

        .talk-items {
          display: flex;
          justify-content: space-between;
          margin-top: 10px;
        }
      }
    }

  }

</style>
