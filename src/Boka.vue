<template>
  <div v-if="muntraWidget">
    <!-- <div
      class="muntra-widget without-modal"
      key="0"
      muntra_clinic_id="2"
      muntra_procedure_id="4"
      muntra_without_modal="true"
    ></div> -->

    <div
      class="muntra-widget without-modal"
      key="0"
      :muntra_clinic_id="clinicId"
      :muntra_procedure_id="procedureId"
      muntra_without_modal="true"
    ></div>

    <!-- <div
      class="muntra-widget without-modal"
      key="0"
      :muntra_clinic_id="clinicId"
      :muntra_procedure_id="procedureId"
      :muntra_caregiver_id="caregiverId"
      muntra_without_modal="true"
    ></div> -->
  </div>
</template>

<script>
export default {
  name: "Boka",

  props: {
    clinicId: {
      type: String,
      default: "",
    },
    procedureId: {
      type: String,
      default: "",
    },
    caregiverId: {
      type: String,
      default: "",
    },
  },

  data() {
    return {
      muntraWidgetUrl: "https://muntra-dev.github.io/index.js",
      muntraWidget: false,
      timeoutId: null,
      parameterChanged: false,
    };
  },

  methods: {
    startMuntra() {
      const script = document.createElement("script");
      script.src = this.muntraWidgetUrl;
      script.async = true;
      document.body.appendChild(script);

      this.muntraWidget = true;
    },

    stopMuntra() {
      this.muntraWidget = false;

      const script = document.querySelector(
        `script[src="${this.muntraWidgetUrl}"]`
      );
      if (script) {
        document.body.removeChild(script);
      }
    },
  },

  watch: {
    clinicId() {
      this.parameterChanged = !this.parameterChanged;
    },
    procedureId() {
      this.parameterChanged = !this.parameterChanged;
    },
    caregiverId() {
      this.parameterChanged = !this.parameterChanged;
    },

    parameterChanged() {
      clearTimeout(this.timeoutId);

      this.timeoutId = setTimeout(() => {
        this.stopMuntra();
        this.startMuntra();
      }, 200);
    },
  },
};
</script>

<style scoped>
.secondary .muntra-widget-button {
  background-color: coral !important;
  border: 0px;
}
</style>
