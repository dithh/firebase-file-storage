<template>
  <md-table md-card>
    <md-table-toolbar>
      <h1 class="md-title">Users</h1>
    </md-table-toolbar>
    <md-table-row>
      <md-table-head>Name</md-table-head>
      <md-table-head>Size</md-table-head>
      <md-table-head></md-table-head>
    </md-table-row>
    <md-table-row v-for="(file,index) in userFiles" :key="file.fullName">
      <md-table-cell>{{file.name}}</md-table-cell>
      <md-table-cell>{{file.size}}</md-table-cell>
      <md-table-cell>
              <span @click="deleteFile(file,index)">
                <md-icon>close</md-icon>
              </span>
        <span @click="downloadFile(file)">
                <md-icon >download</md-icon>
              </span>
      </md-table-cell>
    </md-table-row>
  </md-table>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'UserDashboardTable',
  computed: mapState({
    userFiles: (state) => state.files.userFiles,
  }),
  methods: {
    ...mapActions(['deleteUserFile']),
    async downloadFile(file) {
      try {
        const downloadUrl = await file.getDownloadURL();
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.setAttribute('download', file.name);
        link.setAttribute('target', '_blank');
        link.click();
      } catch ({ message }) {
        this.$toast.error(message || 'Unkown error ocured');
      }
    },
    async deleteFile(file, index) {
      try {
        await file.delete();
        await this.deleteUserFile({ file, index });
        this.$toast.success('File deleted');
      } catch ({ message }) {
        this.$toast.error(message || 'Unkown error ocured');
      }
    },
  },
};
</script>

<style scoped>

</style>
