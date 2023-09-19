<template>
  <div v-if="muntraWidget" class="mydentist-app">
    <div
      v-if="clinicId && procedureId && caregiverId"
      class="muntra-widget without-modal"
      key="0"
      :muntra_clinic_id="clinicId"
      :muntra_procedure_id="procedureId"
      :muntra_caregiver_id="caregiverId"
      muntra_without_modal="true"
    ></div>

    <div
      v-else-if="clinicId && procedureId"
      class="muntra-widget without-modal"
      key="1"
      :muntra_clinic_id="clinicId"
      :muntra_procedure_id="procedureId"
      muntra_without_modal="true"
    ></div>

    <div
      v-else-if="clinicId && caregiverId"
      class="muntra-widget without-modal"
      key="2"
      :muntra_clinic_id="clinicId"
      :muntra_caregiver_id="caregiverId"
      muntra_without_modal="true"
    ></div>

    <div
      v-else-if="clinicId"
      class="muntra-widget without-modal"
      key="3"
      :muntra_clinic_id="clinicId"
      muntra_without_modal="true"
    ></div>

    <div
      style="display: none"
      class="muntra-widget-modal-header muntra-widget muntra-widget.without-modal sc-hKFyIo ilHOdR muntra-content-container muntra-widget-modal-container-content gDGDod bhjKRs cVQxmd sc-hBMVcZ sc-hBMVcZ dGarFN muntra-widget-modal-content-wrapper gwofgg[disabled] svg cCGdyJ svg sc-ArjOu jDwODi sc-fujyUd cWWTbR sc-fFSRdu juCHze sc-fFSRdu sc-cTJmaU.juCHze exOFdF sc-fFSRdu sc-jNnnWF juCHze fCQiqA sc-fujyUd sc-hiKfjK cWWTbR eTyHFg sc-fKgIGh duMawZ muntra-widget-modal"
    ></div>
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

  mounted() {
    this.parameterChanged = !this.parameterChanged;
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

<style>
.muntra-widget-modal-header {
  display: none;
}

.muntra-widget {
  width: 100%;
  border: 0px solid transparent;
  border-radius: 0px;
}

.muntra-widget.without-modal {
  width: 80%;
  border-radius: 0px;
  margin-left: auto;
  margin-right: auto;
}

.sc-hKFyIo.ilHOdR.muntra-content-container {
  width: 100%;
}

.muntra-widget-modal-container-content {
  overflow-y: hidden !important;
}

.gDGDod {
  outline: none !important;
  border: 0px solid transparent !important;
  box-shadow: none !important;
  border-radius: 0.4rem !important;
  background-color: #9b1373 !important;
}

.bhjKRs {
  box-shadow: none !important;
  border: 0px solid transparent !important;
}

.cVQxmd.sc-hBMVcZ {
  border-radius: 0% !important;
  border-top-left-radius: 0% !important;
  border-top-right-radius: 0% !important;
  border-bottom-right-radius: 0% !important;
  border-bottom-left-radius: 0% !important;
}

.sc-hBMVcZ.dGarFN {
  border-radius: 0% !important;
  border-top-left-radius: 0% !important;
  border-top-right-radius: 0% !important;
  border-bottom-right-radius: 0% !important;
  border-bottom-left-radius: 0% !important;
}

.muntra-widget-modal-content-wrapper {
  font-family: Fororounded, sans-serif;
}

.gwofgg[disabled] svg {
  fill: rgb(206, 206, 206) !important;
}

.cCGdyJ svg {
  fill: #9b1373 !important;
}

.sc-ArjOu.jDwODi {
  margin-top: 2px;
}

.sc-fujyUd.cWWTbR {
  font-size: 1.4rem;
  line-height: 1.4rem;
  text-align: center;
  word-wrap: break-word !important;
  overflow-wrap: break-word !important;
}

.sc-fFSRdu.juCHze {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}

.sc-fFSRdu.sc-cTJmaU.juCHze.exOFdF {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
}

.sc-fFSRdu.sc-jNnnWF.juCHze.fCQiqA {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
}

.sc-fujyUd.sc-hiKfjK.cWWTbR.eTyHFg {
  text-align: left;
}

@media screen and (max-width: 991px) {
  .muntra-widget.without-modal {
    width: 100%;
  }
}

@media screen and (max-width: 774px) {
  .sc-fKgIGh.duMawZ.muntra-widget-modal {
    margin: 0px;
    overflow-x: hidden;
    overflow-y: hidden;
    min-height: auto;
    border-radius: 0px;
  }
}

@media screen and (max-width: 479px) {
  .sc-fujyUd.cWWTbR {
    font-size: 1.2rem;
    line-height: 1.7rem;
  }

  .sc-ArjOu.jDwODi {
    font-size: 0.8rem;
    line-height: 1rem;
  }

  .sc-hBMVcZ.dGarFN {
    width: 100px !important;
    height: 100px !important;
  }
}
</style>
