<template>
  <md-table md-card>

    <md-table-toolbar>
      <h1 class="md-title md-layout md-alignment-top-left">Users</h1>
    </md-table-toolbar>

    <md-table-row>
      <md-table-head>Name</md-table-head>
      <md-table-head>Size</md-table-head>
      <md-table-head></md-table-head>
    </md-table-row>

    <md-table-row v-for="(file,index) in userFiles" :key="file.fullName">
      <md-table-cell>{{file.name}}</md-table-cell>
      <md-table-cell>{{file.size | convertBytes}}</md-table-cell>
      <md-table-cell>
              <md-button @click="deleteFile(file,index)" class="md-icon-button">
                <md-icon>close</md-icon>
              </md-button>
            <md-button @click="downloadFile(file)" class="md-icon-button">
                <md-icon >download</md-icon>
            </md-button>
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
    deleteFile(file, index) {
      this.deleteUserFile({ index, file });
    },
  },
  filters: {
    convertBytes(bytes) {
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return `${parseFloat((bytes / k ** i).toFixed(2))} ${sizes[i]}`;
    },
  },
};
</script>

<style scoped>

</style>
