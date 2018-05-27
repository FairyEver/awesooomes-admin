<template>
  <el-menu mode="horizontal" :router="true">
    <el-menu-item index="index">管理后台</el-menu-item>
    <el-submenu index="manage">
      <template slot="title">数据管理</template>
      <el-menu-item index="/manage/tag/list">tag 标签</el-menu-item>
      <el-menu-item index="/manage/class/list">class</el-menu-item>
    </el-submenu>
  </el-menu>
</template>
