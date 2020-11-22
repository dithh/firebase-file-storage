<template>
  <div class="home">
        <md-table v-if="files.length" md-card>
          <md-table-toolbar>
            <h1 class="md-title">Users</h1>
          </md-table-toolbar>
          <md-table-row>
            <md-table-head>Name</md-table-head>
            <md-table-head>Size</md-table-head>
            <md-table-head></md-table-head>
          </md-table-row>
          <md-table-row v-for="(file,index) in files" :key="file.fullName">
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
    <md-empty-state
      v-else
      md-icon="devices_other"
      md-label="No files uploaded"
      md-description="Upload a file(s) to see it here.">
    </md-empty-state>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'Home',
  components: {
  },
  data() {
    return {
      newFileName: '',
    };
  },
  computed: mapState(['files']),
  methods: {
    ...mapActions(['getUserFiles', 'deleteUserFile']),
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
      debugger;
      try {
        await file.delete();
        this.deleteUserFile(index);
        this.$toast.success('File deleted');
      } catch ({ message }) {
        this.$toast.error(message || 'Unkown error ocured');
      }
    },
  },
  mounted() {
    this.getUserFiles();
  },
};
</script>
