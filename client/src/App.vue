<style scoped>
td {
  position: relative;
}
</style>

<template>
  <p>{{ statusText }}</p>
  <table border="1" width="300" align="center" v-table-click="state">
    <thead>
      <tr>
        <th>id</th>
        <th>name</th>
        <th>age</th>
        <th>score</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(user, index) in state.userList" :key="user.id">
        <td>{{ user.id }}</td>
        <td :data-index="index" data-field="name">
          <span>{{ user.name }}</span>
        </td>
        <td :data-index="index" data-field="age">
          <span>{{ user.age }}</span>
        </td>
        <td :data-index="index" data-field="score">
          <span>{{ user.score }}</span>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { io } from 'socket.io-client'
import { reactive, computed } from 'vue'
import vTableClick from './directives/table-click'

const socket = io('http://localhost:3000')

const state = reactive({
  userList: [],
  status: false,
  field: '',
  index: -1,
  socket,
})
const statusText = computed(() => (state.status ? '正在修改...' : ''))

socket.on('loadData', (data) => {
  state.userList = data
})
socket.on('changeStatus', (status) => {
  state.status = status
})
socket.on('updatedUserList', ({ field, index, value }) => {
  state.userList = state.userList.map((user, idx) => {
    if (idx === +index) {
      user[field] = value
    }
    return user
  })
})
</script>
