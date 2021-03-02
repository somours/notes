<template>
  <div class="user-page">
    <div class="userinfo-wrapper">
      <div class="avatar">
        <img src="@/assets/images/user.png" width="32" alt="" />
      </div>
      <div class="info">
        <span class="text">{{user.email}}</span>
        <span class="text">{{user.userName}}</span>
      </div>
      <i class="iconfont icon-left" @click="back"></i>
    </div>
    <div class="menu-wrapper">
      <ul class="menus">
        <li class="menu-item" @click="redirect(0)">
          <i class="iconfont icon-user1"></i>
          <span class="text">我的资料 <em>(Blog)</em></span>
          <i class="iconfont icon-right"></i>
        </li>
        <li class="menu-item" @click="redirect(0)">
          <i class="iconfont icon-collect"></i>
          <span class="text">我的收藏 <em>(Github)</em></span>
          <i class="iconfont icon-right"></i>
        </li>
      </ul>
    </div>
    <div class="btn-wrapper">
      <button class="logout-btn" @click="logout">退出</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "User"
};
</script>

<style scoped></style>
