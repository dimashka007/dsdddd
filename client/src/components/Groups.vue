<template>
  <div class="container" style="max-width: 80%">
      <div class="row mb-5">
        <div :key="item" v-for="item in $root.groups" class="col-3 pl-0 pr-4">
        <button @click="currentGroupSelected = item" class="btn btn-block btn-primary">{{item.groupName}}</button></div>
      </div>
      <div class="row">
        <label class="my-auto" for="groupName">Назва групи:</label>
        <input class="form-control col-4" v-model="groupName" id="groupName" type="text">
        <button class="btn btn-primary ml-3" @click.prevent="createGroup()">Додати</button>
      </div>
    </div>
</template>

<script>
import groups from "../groupsService";
export default {
  name: 'Groups',
  data() {
    return {
      groupName: '',
      currentGroupSelected: {}
    }
  },
  async created() {
    this.$root.groups = await groups.getGroups();
  },
  methods: {
    async createGroup(){
      await groups.insertGroup(this.groupName);
      this.$root.groups = await groups.getGroups();
    }
  }
}
</script>