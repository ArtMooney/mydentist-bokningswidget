<style scoped>
@import "./css/normalize.css";
@import "./css/components.css";
@import "./css/mydentist-bokningswidget.css";
</style>

<template>
  <div class="mydentist-bokningswidget">
    <div
      id="w-node-_051a9b96-4ead-e118-8a59-194af47cb073-1e7ebdbe"
      class="bokningswidget-wrapper"
    >
      <div
        @click="handledropdownClinics"
        id="w-node-_0ce87386-09bd-15c0-b072-0835fb14c6cc-1e7ebdbe"
        class="column left"
      >
        <div class="hover-background"></div>
        <div>Klinik / Ort</div>
        <div class="text-large">Borås</div>
        <div v-show="dropdownClinics" class="column dropdown">
          <div v-for="clinic of listClinics.data">
            {{ clinic.attributes.clinic_name }}
          </div>
        </div>
      </div>
      <div
        @click="handledropdownProcedures"
        id="w-node-_91f649a3-bb70-a795-b83a-2447edc0e2f4-1e7ebdbe"
        class="column"
      >
        <div class="hover-background"></div>
        <div>Behandling</div>
        <div class="text-large">Tandblekning</div>
        <div v-show="dropdownProcedures" class="column dropdown">
          <div v-for="procedure of listProcedures.data">
            {{ procedure.attributes.name }}
          </div>
        </div>
      </div>
      <div
        @click="handledropdownCaregivers"
        id="w-node-cddf50a4-4c92-fe6b-0172-49fec9704d62-1e7ebdbe"
        class="column"
      >
        <div class="hover-background"></div>
        <div>Behandlare</div>
        <div class="text-large">Big Mike Obama</div>
        <div v-show="dropdownCaregivers" class="column dropdown">
          <div v-for="caregiver of listCaregivers.data">
            {{ caregiver.attributes.first_name }}
            {{ caregiver.attributes.last_name }}
          </div>
        </div>
      </div>
      <div
        id="w-node-_15d05f01-d5c1-4387-6d10-54988da43617-1e7ebdbe"
        class="column right"
      >
        <div class="hover-layer">
          <div>Visa lediga tider</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",

  data() {
    return {
      getListClinics: "https://api.ngine.se/webhook/mydentist/get-clinics",
      getListProcedures:
        "https://api.ngine.se/webhook/mydentist/get-procedures",
      getListCaregivers:
        "https://api.ngine.se/webhook/mydentist/get-caregivers",
      userName: "XkehuCfMZ!hU%8h=",
      userPass: "QH5EV=2hNc*LFjJd",
      dropdownClinics: false,
      dropdownProcedures: false,
      dropdownCaregivers: false,
      item: "",
      listClinics: [],
      listProcedures: [],
      listCaregivers: [],
    };
  },

  async created() {
    console.clear();

    this.listClinics = await this.getApiData(this.getListClinics);
    this.listProcedures = await this.getApiData(this.getListProcedures);
    this.listCaregivers = await this.getApiData(this.getListCaregivers);

    // console.log("CLINICS", JSON.parse(JSON.stringify(this.listClinics)));
    // console.log("PROCEDURES", JSON.parse(JSON.stringify(this.listProcedures)));
    // console.log("CAREGIVERS", JSON.parse(JSON.stringify(this.listCaregivers)));
  },

  methods: {
    getApiData(urlEndpoint) {
      return new Promise((resolve, reject) => {
        var requestOptions = {
          method: "GET",
          headers: {
            Authorization: "Basic " + btoa(this.userName + ":" + this.userPass),
          },
          redirect: "follow",
        };

        fetch(urlEndpoint, requestOptions)
          .then((response) => {
            if (!response.ok) throw new Error();
            return response.json();
          })
          .then((result) => {
            resolve(result);
          })
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      });
    },

    handledropdownClinics() {
      this.dropdownClinics = !this.dropdownClinics;

      if (this.dropdownClinics) {
        this.dropdownProcedures = false;
        this.dropdownCaregivers = false;
      }
    },

    handledropdownProcedures() {
      this.dropdownProcedures = !this.dropdownProcedures;

      if (this.dropdownProcedures) {
        this.dropdownClinics = false;
        this.dropdownCaregivers = false;
      }
    },

    handledropdownCaregivers() {
      this.dropdownCaregivers = !this.dropdownCaregivers;

      if (this.dropdownCaregivers) {
        this.dropdownClinics = false;
        this.dropdownProcedures = false;
      }
    },
  },
};
</script>

<style scoped>
.column {
  user-select: none;
}
</style>
