<template>
  <div class="container" style="max-width: 80%">
      <div class="row"></div>
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