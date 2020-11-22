<template>
  <div class="home">
    <user-dashboard-table v-if="userFiles.length">
    </user-dashboard-table>
    <md-empty-state
      v-else
      md-icon="devices_other"
      md-label="No files uploaded"
      md-description="Upload file(s) to see it here.">
    </md-empty-state>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import UserDashboardTable from '@/components/UserDashboardTable.vue';

export default {
  name: 'UserDashboard',
  components: {
    UserDashboardTable,
  },
  data() {
    return {
      newFileName: '',
    };
  },
  computed: mapState({
    userFiles: (state) => state.files.userFiles,
  }),
  methods: mapActions(['getUserFiles']),
  mounted() {
    this.getUserFiles();
  },
};
</script>
