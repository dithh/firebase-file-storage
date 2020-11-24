<template>
  <div class="home md-alignment-top-left">
    <user-dashboard-table v-if="userFiles.length" />

    <md-empty-state
      v-else
      md-icon="devices_other"
      md-label="No files uploaded"
      md-description="Upload file(s) to see it here."
    />

    <upload-file-dialog />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import UserDashboardTable from '@/components/UserDashboardTable.vue';
import UploadFileDialog from '@/components/UploadFileDialog.vue';

export default {
  name: 'UserDashboard',
  components: {
    UserDashboardTable,
    UploadFileDialog,
  },
  data() {
    return {
      newFileName: '',
    };
  },
  computed: mapState({
    userFiles: (state) => state.files.userFiles,
  }),
  mounted() {
    this.getUserFiles();
  },
  methods: mapActions(['getUserFiles']),
};
</script>
