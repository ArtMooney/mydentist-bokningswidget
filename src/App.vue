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
import Widget from "./Widget.vue";

export default {
  name: "App",
  components: { Widget },

  props: {
    mode: {
      type: String,
      default: "horizontal",
    },
  },

  data() {
    return {
      clinicId: null,
      procedureId: null,
      caregiverId: null,
    };
  },

  mounted() {
    setTimeout(() => {
      console.log("MODE", this.mode);
    }, 1000);
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
