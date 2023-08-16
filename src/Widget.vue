<template>
  <div class="mydentist-app">
    <div
      id="w-node-_051a9b96-4ead-e118-8a59-194af47cb073-1e7ebdbe"
      class="bokningswidget-wrapper"
    >
      <div
        @click.stop="handledropdownClinics"
        id="w-node-_0ce87386-09bd-15c0-b072-0835fb14c6cc-1e7ebdbe"
        class="column left"
      >
        <div class="hover-background"></div>
        <div>Klinik / Ort</div>
        <div class="text-large">{{ chosenClinic }}</div>
        <div v-show="dropdownClinics" class="column dropdown">
          <div
            v-for="(clinic, index) of listClinics.data"
            @click="handleClinics($event, index)"
            class="list-item"
          >
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
        <div class="text-large">{{ chosenProcedure }}</div>
        <div v-show="dropdownProcedures" class="column dropdown">
          <div
            v-for="(procedure, index) of listProcedures.data"
            @click="handleProcedures($event, index)"
            class="list-item"
          >
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
        <div class="text-large">{{ chosenCaregiver }}</div>
        <div v-show="dropdownCaregivers" class="column dropdown">
          <div
            v-for="(caregiver, index) of listCaregivers.data"
            @click="handleCaregivers($event, index)"
            class="list-item"
          >
            {{ caregiver.attributes.first_name }}
            {{ caregiver.attributes.last_name }}
          </div>
        </div>
      </div>
      <div
        id="w-node-_15d05f01-d5c1-4387-6d10-54988da43617-1e7ebdbe"
        class="column right"
        @click="handleBooking"
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
  name: "Home",

  data() {
    return {
      apiBaseUrl: "https://api.ngine.se/webhook/mydentist/",
      getClinics: "get-clinics",
      getProcedures: "get-procedures",
      getCaregivers: "get-caregivers",
      userName: "XkehuCfMZ!hU%8h=",
      userPass: "QH5EV=2hNc*LFjJd",
      dropdownClinics: false,
      dropdownProcedures: false,
      dropdownCaregivers: false,
      chosenClinic: "-",
      chosenProcedure: "-",
      chosenCaregiver: "-",
      clinicId: "",
      procedureId: "",
      caregiverId: "",
      listClinics: [],
      listProcedures: [],
      listCaregivers: [],
      listBookings: [],
    };
  },

  async created() {
    console.clear();

    this.listClinics = await this.getApiData(this.apiBaseUrl + this.getClinics);
    this.listProcedures = await this.getApiData(
      this.apiBaseUrl + this.getProcedures
    );
    this.listCaregivers = await this.getApiData(
      this.apiBaseUrl + this.getCaregivers
    );

    console.log("CLINICS", JSON.parse(JSON.stringify(this.listClinics)));
    console.log("PROCEDURES", JSON.parse(JSON.stringify(this.listProcedures)));
    console.log("CAREGIVERS", JSON.parse(JSON.stringify(this.listCaregivers)));

    // this.initQueries();
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

    handleClinics(event, index) {
      this.chosenClinic = event.target.innerText;
      this.updateQueryString();

      this.clinicId = this.listClinics.data[index].id;
      this.emitQueryString();
    },

    handleProcedures(event, index) {
      this.chosenProcedure = event.target.innerText;
      this.updateQueryString();

      this.procedureId = this.listProcedures.data[index].id;
      this.emitQueryString();
    },

    handleCaregivers(event, index) {
      this.chosenCaregiver = event.target.innerText;
      this.updateQueryString();

      this.caregiverId = this.listCaregivers.data[index].id;
      this.emitQueryString();
    },

    emitQueryString() {
      this.$emit("queryparams", {
        clinicId: this.clinicId,
        procedureId: this.procedureId,
        caregiverId: this.caregiverId,
      });
    },

    getQueryString() {
      let queryString = "?";

      if (this.chosenClinic && this.chosenClinic !== "-") {
        queryString = queryString + "clinic=" + this.chosenClinic;
      }

      if (this.chosenProcedure && this.chosenProcedure !== "-") {
        queryString = queryString !== "?" ? queryString + "&" : queryString;
        queryString = queryString + "procedure=" + this.chosenProcedure;
      }

      if (this.chosenCaregiver && this.chosenCaregiver !== "-") {
        queryString = queryString !== "?" ? queryString + "&" : queryString;
        queryString = queryString + "caregiver=" + this.chosenCaregiver;
      }

      if (queryString === "?") queryString = "";

      return queryString;
    },

    handleBooking() {
      const queryString = this.getQueryString();

      this.$router.push("/boka" + queryString);
    },

    updateQueryString() {
      const url = window.location.href;
      const searchString = "/boka";

      // only update querystring if we are on the /boka page
      if (url.indexOf(searchString) !== -1) {
        const queryString = this.getQueryString();

        history.pushState({}, "", "/boka" + queryString);
      }
    },

    initQueries() {
      const urlString = window.location.href;

      if (urlString.indexOf("?") !== -1) {
        const queryString = urlString.split("?")[1].split("&");

        for (const [index, query] of queryString.entries()) {
          queryString[index] = decodeURIComponent(query);
        }

        for (const query of queryString) {
          const command = query.split("=");

          if (command[0] === "clinic") {
            this.chosenClinic = command[1];

            for (const clinic of this.listClinics.data) {
              if (clinic.attributes.clinic_name === this.chosenClinic) {
                this.clinicId = clinic.id;
              }
            }
          }

          if (command[0] === "procedure") {
            this.chosenProcedure = command[1];

            for (const procedure of this.listProcedures.data) {
              if (procedure.attributes.name === this.chosenProcedure) {
                this.procedureId = procedure.id;
              }
            }
          }

          if (command[0] === "caregiver") {
            this.chosenCaregiver = command[1];

            for (const caregiver of this.listCaregivers.data) {
              if (
                caregiver.attributes.first_name +
                  " " +
                  caregiver.attributes.last_name ===
                this.chosenCaregiver
              ) {
                this.caregiverId = caregiver.id;
              }
            }
          }
        }

        this.emitQueryString();
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
