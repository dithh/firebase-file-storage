<template>
  <md-table md-card>
    <md-table-toolbar>
      <h1 class="md-title md-layout md-alignment-top-left">
        Users
      </h1>
    </md-table-toolbar>

    <md-table-row>
      <md-table-head>Name</md-table-head>
      <md-table-head>Size</md-table-head>
      <md-table-head />
    </md-table-row>

    <md-table-row
      v-for="(file,index) in userFiles"
      :key="file.fullName"
    >
      <md-table-cell>{{ file.name }}</md-table-cell>
      <md-table-cell>{{ file.size | convertBytes }}</md-table-cell>
      <md-table-cell>
        <md-button
          class="md-icon-button"
          @click="deleteFile(file,index)"
        >
          <md-icon>close</md-icon>
        </md-button>
        <md-button
          class="md-icon-button"
          @click="downloadFile(file)"
        >
          <md-icon>download</md-icon>
        </md-button>
      </md-table-cell>
    </md-table-row>
  </md-table>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { SIZES } from '@/consts/fileSizes';
import { createLink } from '@/utils/utils';

export default {
  name: 'UserDashboardTable',
  filters: {
    convertBytes(bytes) {
      const k = 1024;
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return `${parseFloat((bytes / k ** i).toFixed(2))} ${SIZES[i]}`;
    },
  },
  computed: mapState({
    userFiles: (state) => state.files.userFiles,
  }),
  methods: {
    ...mapActions(['deleteUserFile']),
    async downloadFile(file) {
      try {
        const downloadUrl = await file.getDownloadURL();
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = () => {
          const blob = xhr.response;
          const link = createLink(file.name, blob);
          link.click();
          URL.revokeObjectURL(link.href);
        };
        xhr.open('GET', downloadUrl);
        xhr.send();
      } catch ({ message }) {
        this.$toast.error(message || 'Unkown error ocured');
      }
    },

    deleteFile(file, index) {
      this.deleteUserFile({ index, file });
    },
  },
};
</script>

<style scoped>

</style>
