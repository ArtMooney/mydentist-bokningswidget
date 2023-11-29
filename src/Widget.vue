<style scoped>
@import "./css/components.css";
@import "./css/mydentist-apps.css";
</style>

<template>
  <div class="mydentist-app">
    <div
      id="w-node-_051a9b96-4ead-e118-8a59-194af47cb073-1e7ebdbe"
      class="bokningswidget-wrapper"
      :class="{ 'bokningswidget-wrapper open': animationFlag }"
    >
      <div
        @click.stop="handlepopupClinics"
        id="w-node-_0ce87386-09bd-15c0-b072-0835fb14c6cc-1e7ebdbe"
        class="bokningswidget-column left"
        :class="{ 'bokningswidget-column left open': animationFlag }"
      >
        <div class="hover-background"></div>
        <div>Klinik / Ort</div>
        <div class="text-large">{{ chosenClinic }}</div>
      </div>
      <div
        @click="handlepopupProcedures"
        id="w-node-_91f649a3-bb70-a795-b83a-2447edc0e2f4-1e7ebdbe"
        class="bokningswidget-column"
        :class="{ 'bokningswidget-column open': animationFlag }"
      >
        <div class="hover-background"></div>
        <div>Behandling</div>
        <div class="text-large">{{ chosenProcedure }}</div>
        <div v-show="popupProcedures" class="bokningswidget-column dropdown">
          <div
            v-show="popupProcedures && !listProcedures.data"
            class="list-item"
          >
            Inga behandlingar, välj klinik först.
          </div>
        </div>
      </div>
      <div
        @click="handlepopupCaregivers"
        id="w-node-cddf50a4-4c92-fe6b-0172-49fec9704d62-1e7ebdbe"
        class="bokningswidget-column"
        :class="{ 'bokningswidget-column open': animationFlag }"
      >
        <div class="hover-background"></div>
        <div>Behandlare</div>
        <div class="text-large">{{ chosenCaregiver }}</div>
        <div v-show="popupCaregivers" class="bokningswidget-column dropdown">
          <div
            v-if="listCaregivers.data"
            v-for="(caregiver, index) of listCaregivers.data"
            @click="handleCaregivers($event, index)"
            class="list-item"
          >
            {{ caregiver.attributes.first_name }}
            {{ caregiver.attributes.last_name }}
          </div>
          <div v-else class="list-item">
            Inga behandlare, välj klinik först.
          </div>
        </div>
      </div>
      <div
        id="w-node-_15d05f01-d5c1-4387-6d10-54988da43617-1e7ebdbe"
        class="bokningswidget-column right"
        :class="{ 'bokningswidget-column right open': animationFlag }"
        @click="handleBooking"
      >
        <div class="hover-layer">
          <div class="text-large visa-lediga">Visa lediga tider</div>
        </div>
      </div>

      <div
        class="clean-filtering-wrapper"
        :class="{ 'clean-filtering-wrapper open': animationFlag }"
      >
        <div @click="cleanFiltering" class="text-clean-filtering">
          Rensa filtrering
        </div>
      </div>
    </div>

    <div
      v-show="
        popupClinics ||
        (popupProcedures && listProcedures.data) ||
        (popupCaregivers && listCaregivers.data)
      "
      class="list-popup-wrapper"
    >
      <div class="bokningswidget-column list-popup">
        <div class="popup-top-menu">
          <div class="popup-title-icon-wrapper">
            <div class="popup-title-wrapper">
              <mydentistIcon style="color: white" class="popup-tooth-icon" />
              <div class="text-block">{{ getPopupTitle() }}</div>
            </div>
            <xmark
              style="color: white"
              class="popup-close-icon"
              @click="closePopup"
            />
          </div>
          <div
            v-show="popupClinics || popupCaregivers"
            class="search-container"
          >
            <div class="search-wrapper">
              <magnifyingGlass class="search-icon" />
              <input
                v-model="popupSearch"
                type="text"
                class="search-input w-input"
                maxlength="256"
                name="popup-search"
                data-name="PopupSearch"
                placeholder=""
              />
            </div>
          </div>
        </div>

        <div class="list-scroll">
          <div
            v-if="popupClinics && !popupSearch"
            v-for="(clinic, index) of listClinics.data"
            @click="handleClinics($event, listClinics.data.indexOf(clinic))"
            key="index"
            class="popup-list-item"
          >
            <div>
              <div class="popup-item-title">
                {{ clinic.attributes.clinic_city }}
              </div>
              <div>{{ clinic.attributes.clinic_address_1 }}</div>
              <div>{{ clinic.attributes.clinic_address_2 }}</div>
            </div>
          </div>
          <div
            v-if="popupClinics && popupSearch"
            v-for="(clinic, index) of searchList"
            @click="handleClinics($event, listClinics.data.indexOf(clinic))"
            class="popup-list-item"
          >
            <div>
              <div class="popup-item-title">
                {{ clinic.attributes.clinic_city }}
              </div>
              <div>{{ clinic.attributes.clinic_address_1 }}</div>
              <div>{{ clinic.attributes.clinic_address_2 }}</div>
            </div>
          </div>

          <div
            v-if="popupProcedures"
            v-for="(procedure, index) of listProcedures.data"
            @click="handleProcedures($event, index)"
            class="popup-list-item"
          >
            <div>
              <div class="popup-item-title">
                {{ procedure.attributes.name }}
              </div>
              <div>{{ procedure.attributes.beskrivning }}</div>
            </div>
          </div>

          <div
            v-if="popupCaregivers"
            @click="allCaregivers"
            class="popup-list-item"
          >
            <div class="caregiver-avatar"></div>
            <div>
              <div ref="allCaregiversLabel" class="popup-item-title">
                Alla behandlare
              </div>
              <div>Visa alla behandlare på kliniken</div>
            </div>
          </div>
          <template v-for="(caregiver, index) of listCaregivers.data">
            <div
              v-if="
                popupCaregivers &&
                !popupSearch &&
                isProcedure(listCaregivers.data.indexOf(caregiver))
              "
              @click="
                handleCaregivers($event, listCaregivers.data.indexOf(caregiver))
              "
              class="popup-list-item"
            >
              <div class="caregiver-avatar">
                <img
                  v-if="caregiver.attributes.images"
                  :src="caregiver.attributes.images.small_thumbnail"
                  alt=""
                  class="caregiver-avatar"
                />
              </div>
              <div>
                <div class="popup-item-title">
                  {{ caregiver.attributes.first_name }}
                  {{ caregiver.attributes.last_name }}
                </div>
                <div>
                  {{ caregiver.attributes.role }},
                  {{ caregiver.attributes.city }}, {{ procedureId }}
                </div>
              </div>
            </div>
          </template>

          <template v-for="(caregiver, index) of searchList">
            <div
              v-if="
                popupCaregivers &&
                popupSearch &&
                isProcedure(listCaregivers.data.indexOf(caregiver))
              "
              @click="
                handleCaregivers($event, listCaregivers.data.indexOf(caregiver))
              "
              class="popup-list-item"
            >
              <div class="caregiver-avatar">
                <img
                  v-if="caregiver.attributes.images"
                  :src="caregiver.attributes.images.small_thumbnail"
                  alt=""
                  class="caregiver-avatar"
                />
              </div>
              <div>
                <div class="popup-item-title">
                  {{ caregiver.attributes.first_name }}
                  {{ caregiver.attributes.last_name }}
                </div>
                <div>
                  {{ caregiver.attributes.role }},
                  {{ caregiver.attributes.city }}
                </div>
              </div>
            </div>
          </template>
        </div>

        <div class="popup-footer"></div>
      </div>
    </div>
  </div>
</template>

<script>
import xmark from "./images/xmark.vue";
import magnifyingGlass from "./images/magnifying-glass.vue";
import mydentistIcon from "./images/mydentist-icon.vue";

export default {
  name: "Home",
  components: { xmark, magnifyingGlass, mydentistIcon },

  data() {
    return {
      apiBaseUrl: "https://api.ngine.se/webhook/mydentist/",
      getClinic: "get-clinic",
      getClinics: "get-clinics",
      userName: "XkehuCfMZ!hU%8h=",
      userPass: "QH5EV=2hNc*LFjJd",
      popupClinics: false,
      popupProcedures: false,
      popupCaregivers: false,
      chosenClinic: "-",
      chosenProcedure: "-",
      chosenCaregiver: "-",
      clinicId: "",
      procedureId: "",
      caregiverId: "",
      listClinics: [],
      listProcedures: [],
      listCaregivers: [],
      popupSearch: "",
      searchList: [],
      animationFlag: false,
    };
  },

  async created() {
    this.listClinics = await this.getApiData(this.apiBaseUrl + this.getClinics);
    this.initQueries();
  },

  mounted() {
    window.addEventListener("resize", this.handleResize);
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

    handlepopupClinics() {
      this.popupClinics = !this.popupClinics;

      if (this.popupClinics) {
        this.popupProcedures = false;
        this.popupCaregivers = false;
      }
    },

    handlepopupProcedures() {
      this.popupProcedures = !this.popupProcedures;

      if (this.popupProcedures) {
        this.popupClinics = false;
        this.popupCaregivers = false;
      }
    },

    handlepopupCaregivers() {
      this.popupCaregivers = !this.popupCaregivers;

      if (this.popupCaregivers) {
        this.popupClinics = false;
        this.popupProcedures = false;
      }
    },

    handleClinics(event, index) {
      this.chosenClinic = this.listClinics.data[index].attributes.clinic_name;
      this.procedureId = "";
      this.chosenProcedure = "-";
      this.caregiverId = "";
      this.chosenCaregiver = "-";
      this.popupSearch = "";
      this.updateQueryString();

      this.clinicId = this.listClinics.data[index].id;
      this.getDetailedClinic(this.clinicId);
      this.updateQueryString();
      this.emitQueryString();

      this.closePopup();
    },

    handleProcedures(event, index) {
      this.chosenProcedure = this.listProcedures.data[index].attributes.name;
      this.updateQueryString();

      this.procedureId = this.listProcedures.data[index].id;
      this.emitQueryString();

      this.closePopup();
    },

    handleCaregivers(event, index) {
      this.popupSearch = "";
      this.chosenCaregiver =
        this.listCaregivers.data[index].attributes.first_name +
        " " +
        this.listCaregivers.data[index].attributes.last_name;
      this.updateQueryString();

      this.caregiverId = this.listCaregivers.data[index].id;
      this.emitQueryString();

      this.closePopup();
    },

    allCaregivers() {
      this.popupSearch = "";
      this.chosenCaregiver = "-";
      this.caregiverId = "";

      this.chosenCaregiver = this.$refs.allCaregiversLabel.innerText;

      this.emitQueryString();
      this.updateQueryString();
      this.closePopup();
    },

    closePopup() {
      this.popupSearch = "";

      this.popupClinics = false;
      this.popupProcedures = false;
      this.popupCaregivers = false;
    },

    getPopupTitle() {
      let titleLabel;

      if (this.popupClinics) {
        titleLabel = "Välj klinik/stad";
      } else if (this.popupProcedures) {
        titleLabel = "Välj behandling";
      } else if (this.popupCaregivers) {
        titleLabel = "Välj behandlare";
      }

      return titleLabel;
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
      if (!this.animationFlag) {
        this.animationFlag = true;
        return;
      }

      if (!this.clinicId) return;

      const queryString = this.getQueryString();

      // this.$router.push("/boka-tid" + queryString);

      const url = "/boka-tid" + queryString;
      window.location.href = url;
    },

    updateQueryString() {
      const url = window.location.href;
      const searchString = "/boka-tid";

      // only update querystring if we are on the /boka-tid page
      if (url.indexOf(searchString) !== -1) {
        const queryString = this.getQueryString();

        history.pushState({}, "", "/boka-tid" + queryString);
      }
    },

    async initQueries() {
      const urlString = window.location.href;

      if (urlString.indexOf("?") !== -1) {
        const queryString = urlString.split("?")[1].split("&");

        for (const [index, query] of queryString.entries()) {
          queryString[index] = decodeURIComponent(query);
        }

        let chosenClinic;

        for (const query of queryString) {
          const command = query.split("=");

          if (command[0] === "clinic") {
            chosenClinic = command[1];

            for (const clinic of this.listClinics.data) {
              if (clinic.attributes.clinic_name === chosenClinic) {
                this.clinicId = clinic.id;
              }
            }
          }
        }

        if (this.clinicId) {
          await this.getDetailedClinic(this.clinicId);
          this.chosenClinic = chosenClinic;

          for (const query of queryString) {
            const command = query.split("=");

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

          this.animationFlag = true;
        }

        this.updateQueryString();
        this.emitQueryString();
      }
    },

    async getDetailedClinic(clientNumber) {
      const clinic = await this.getApiData(
        this.apiBaseUrl + this.getClinic + "?clinic=" + clientNumber
      );

      let listProcedures = [];
      let listCaregivers = [];

      for (const data of clinic.included) {
        if (data.type === "muntra_procedure") {
          listProcedures.push(data);
        }
      }

      for (const data of clinic.included) {
        if (data.type === "muntra_caregiver") {
          let imageUrls;

          if (data.relationships.default_user_image.data) {
            imageUrls = this.getImageUrls(
              clinic,
              data.relationships.default_user_image.data.id
            );

            data.attributes.images = imageUrls;
          }

          data.attributes.role = this.getRole(
            clinic,
            data.relationships.role.data.id
          );

          data.attributes.city = clinic.data.attributes.clinic_city;
          data.attributes.procedures = this.getProcedures(clinic, data.id);

          listCaregivers.push(data);
        }
      }

      this.listProcedures.data = listProcedures;
      this.listCaregivers.data = listCaregivers;
    },

    getImageUrls(clinic, id) {
      for (const data of clinic.included) {
        if (data.type === "muntra_user_image") {
          if (data.id === id) {
            return data.attributes;
          }
        }
      }
    },

    getRole(clinic, id) {
      for (const data of clinic.included) {
        if (data.type === "muntra_role" && data.id === id) {
          return data.attributes.name;
        }
      }
    },

    getProcedures(clinic, id) {
      const caregiverLocations = [];
      const relatedProcedures = [];

      for (const data of clinic.included) {
        if (data.type === "muntra_caregiver_procedure_at_location") {
          caregiverLocations.push(data);
        }
      }

      for (const data of clinic.included) {
        if (data.type === "muntra_caregiver_at_location") {
          if (data.relationships.caregiver.data.id === id) {
            if (data.relationships.procedures.data) {
              for (const procedure of data.relationships.procedures.data) {
                for (const caregiverLocation of caregiverLocations) {
                  if (procedure.id === caregiverLocation.id) {
                    relatedProcedures.push(
                      caregiverLocation.relationships.procedure.data.id
                    );
                  }
                }
              }
            }
          }
        }
      }

      return relatedProcedures;
    },

    isProcedure(index) {
      let isProcedureWithCaregiver = false;

      for (const procedure of this.listCaregivers.data[index].attributes
        .procedures) {
        if (procedure === this.procedureId) {
          isProcedureWithCaregiver = true;
        }
      }

      if (!this.procedureId) isProcedureWithCaregiver = true;

      return isProcedureWithCaregiver;
    },

    disableScroll() {
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;

      document.body.style.paddingRight = `${scrollbarWidth}px`;

      if (
        window.location.hostname !== "localhost" &&
        window.location.hostname !== "mydentist-bokningswidget.netlify.app"
      ) {
        document.getElementById(
          "_header-3-22"
        ).style.paddingRight = `${scrollbarWidth}px`;
      }

      document.body.style.overflow = "hidden";
    },

    enableScroll() {
      document.body.style.paddingRight = "";
      // document.getElementById("_header-3-22").style.paddingRight = "";
      document.body.style.overflow = "auto";
    },

    cleanFiltering() {
      this.chosenClinic = "-";
      this.chosenProcedure = "-";
      this.chosenCaregiver = "-";
      this.clinicId = "";
      this.procedureId = "";
      this.caregiverId = "";
      this.popupSearch = "";
      this.listProcedures = [];
      this.listCaregivers = [];

      this.updateQueryString();
      this.emitQueryString();
    },

    handleResize() {
      if (this.clinicId) {
        this.animationFlag = true;
      } else {
        this.animationFlag = false;
      }
    },
  },

  watch: {
    popupSearch() {
      if (this.popupClinics) {
        const searchString = this.popupSearch;
        const regex = new RegExp(searchString, "i"); // case insensitive
        const searchList = [];

        for (const clinic of this.listClinics.data) {
          if (regex.test(clinic.attributes.clinic_city)) {
            searchList.push(clinic);
          } else if (regex.test(clinic.attributes.clinic_address_1)) {
            searchList.push(clinic);
          } else if (regex.test(clinic.attributes.clinic_address_2)) {
            searchList.push(clinic);
          }
        }

        this.searchList = searchList;
      }

      if (this.popupCaregivers) {
        const searchString = this.popupSearch;
        const regex = new RegExp(searchString, "i"); // case insensitive
        const searchList = [];

        for (const caregiver of this.listCaregivers.data) {
          if (regex.test(caregiver.attributes.first_name)) {
            searchList.push(caregiver);
          } else if (regex.test(caregiver.attributes.last_name)) {
            searchList.push(caregiver);
          }
        }

        this.searchList = searchList;
      }
    },

    popupClinics() {
      if (this.popupClinics) {
        this.disableScroll();
      } else {
        this.enableScroll();
      }
    },

    popupProcedures() {
      if (this.popupProcedures && this.listProcedures.data) {
        this.disableScroll();
      } else {
        this.enableScroll();
      }
    },

    popupCaregivers() {
      if (this.popupCaregivers && this.listCaregivers.data) {
        this.disableScroll();
      } else {
        this.enableScroll();
      }
    },
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
  },
};
</script>

<style>
.bokningswidget-column {
  transition: all 0.5s ease;
}
</style>

<style scoped>
.column {
  user-select: none;
}

.list-scroll {
  scrollbar-width: thin;
  scrollbar-color: silver #efe7e1;
}
.list-scroll::-webkit-scrollbar {
  width: 12px;
}
.list-scroll::-webkit-scrollbar-track {
  background: #efe7e1;
}
.list-scroll::-webkit-scrollbar-thumb {
  background-color: silver;
  border-radius: 20px;
  border: 3px solid #efe7e1;
}
.popup-list-item:hover .caregiver-avatar {
  background-color: #efe7e1;
}
</style>
