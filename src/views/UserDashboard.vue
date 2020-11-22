<template>
  <div class="home">
    <template>
      <div>
        <md-table md-card>
          <md-table-toolbar>
            <h1 class="md-title">Users</h1>
          </md-table-toolbar>
          <md-table-row>
            <md-table-head>Name</md-table-head>
            <md-table-head>Size</md-table-head>
            <md-table-head></md-table-head>
          </md-table-row>
          <md-table-row v-for="file in files" :key="file.fullName">
            <md-table-cell>{{file.name}}</md-table-cell>
            <md-table-cell>{{file.size}}</md-table-cell>
            <md-table-cell>
              <md-icon>close</md-icon>
              <md-icon>close</md-icon>
              <span @click="downloadFile(file)">
                <md-icon >cload_download</md-icon>
              </span>
            </md-table-cell>
          </md-table-row>
          </md-table>
      </div>
    </template>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'Home',
  components: {
  },
  computed: mapState(['files']),
  methods: {
    ...mapActions(['getUserFiles']),
    async downloadFile(file) {
      const downloadUrl = await file.getDownloadURL();
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', file.name);
      link.setAttribute('target', '_blank');
      link.click();
    },
  },
  mounted() {
    this.getUserFiles();
  },
};
</script>
