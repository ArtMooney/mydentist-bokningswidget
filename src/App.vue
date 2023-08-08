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
        @click="handleDropdownOrt"
        id="w-node-_0ce87386-09bd-15c0-b072-0835fb14c6cc-1e7ebdbe"
        class="column left"
      >
        <div class="hover-background"></div>
        <div>Klinik / Ort</div>
        <div class="text-large">Borås</div>
        <div v-show="dropdownOrt" class="column dropdown">
          <div>{{ item }}</div>
          <div>Lista med items</div>
          <div>Lista med items</div>
          <div>Lista med items</div>
          <div>Lista med items</div>
          <div>Lista med items</div>
          <div>Lista med items</div>
          <div>Lista med items</div>
          <div>Lista med items</div>
          <div>Lista med items</div>
          <div>Lista med items</div>
          <div>Lista med items</div>
          <div>Lista med items</div>
          <div>Lista med items</div>
          <div>Lista med items</div>
        </div>
      </div>
      <div
        @click="handleDropdownBehandling"
        id="w-node-_91f649a3-bb70-a795-b83a-2447edc0e2f4-1e7ebdbe"
        class="column"
      >
        <div class="hover-background"></div>
        <div>Behandling</div>
        <div class="text-large">Tandblekning</div>
        <div v-show="dropdownBehandling" class="column dropdown">
          <div>{{ item }}</div>
          <div>Lista med items</div>
          <div>Lista med items</div>
          <div>Lista med items</div>
          <div>Lista med items</div>
          <div>Lista med items</div>
          <div>Lista med items</div>
          <div>Lista med items</div>
          <div>Lista med items</div>
          <div>Lista med items</div>
          <div>Lista med items</div>
          <div>Lista med items</div>
          <div>Lista med items</div>
          <div>Lista med items</div>
          <div>Lista med items</div>
        </div>
      </div>
      <div
        @click="handleDropdownBehandlare"
        id="w-node-cddf50a4-4c92-fe6b-0172-49fec9704d62-1e7ebdbe"
        class="column"
      >
        <div class="hover-background"></div>
        <div>Behandlare</div>
        <div class="text-large">Big Mike Obama</div>
        <div v-show="dropdownBehandlare" class="column dropdown">
          <div>{{ item }}</div>
          <div>Lista med items</div>
          <div>Lista med items</div>
          <div>Lista med items</div>
          <div>Lista med items</div>
          <div>Lista med items</div>
          <div>Lista med items</div>
          <div>Lista med items</div>
          <div>Lista med items</div>
          <div>Lista med items</div>
          <div>Lista med items</div>
          <div>Lista med items</div>
          <div>Lista med items</div>
          <div>Lista med items</div>
          <div>Lista med items</div>
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
      spotPeriodWebhook: "XXX",
      userName: "XXX",
      userPass: "XXX",
      dropdownOrt: false,
      dropdownBehandling: false,
      dropdownBehandlare: false,
      item: "",
    };
  },

  async created() {
    console.clear();

    // this.spotPeriodPrices = await this.getApiData(this.spotPeriodWebhook);
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

    handleDropdownOrt() {
      this.dropdownOrt = !this.dropdownOrt;

      if (this.dropdownOrt) {
        this.dropdownBehandling = false;
        this.dropdownBehandlare = false;
      }
    },

    handleDropdownBehandling() {
      this.dropdownBehandling = !this.dropdownBehandling;

      if (this.dropdownBehandling) {
        this.dropdownOrt = false;
        this.dropdownBehandlare = false;
      }
    },

    handleDropdownBehandlare() {
      this.dropdownBehandlare = !this.dropdownBehandlare;

      if (this.dropdownBehandlare) {
        this.dropdownOrt = false;
        this.dropdownBehandling = false;
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
