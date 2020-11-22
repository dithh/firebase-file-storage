<template>
  <div class="home">
    <user-dashboard-table v-if="files.length">
    </user-dashboard-table>
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
import UserDashboardTable from '@/components/UserDashboardTable.vue';

export default {
  name: 'Home',
  components: {
    UserDashboardTable,
  },
  data() {
    return {
      newFileName: '',
    };
  },
  computed: mapState(['files']),
  methods: mapActions(['getUserFiles']),
  mounted() {
    this.getUserFiles();
  },
};
</script>
