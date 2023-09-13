<template>
  <Widget @queryparams="updateValues" />

  <div>
    <router-view
      :clinicId="clinicId"
      :procedureId="procedureId"
      :caregiverId="caregiverId"
    />
  </div>
</template>

<script>
import "./css/components.css";
import "./css/mydentist-apps.css";

import Widget from "./Widget.vue";

export default {
  name: "App",
  components: { Widget },

  data() {
    return {
      clinicId: null,
      procedureId: null,
      caregiverId: null,
    };
  },

  methods: {
    updateValues({ clinicId, procedureId, caregiverId }) {
      this.clinicId = clinicId;
      this.procedureId = procedureId;
      this.caregiverId = caregiverId;
    },
  },
};
</script>
