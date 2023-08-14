<template>
  <div>
    <div
      class="muntra-widget without-modal"
      key="6"
      muntra_clinic_id="2"
      muntra_referral_source="https://www.mydentist.se/"
      muntra_without_modal="true"
    ></div>
  </div>

  <!-- <div class="mydentist-bokningsui">
    <div
      id="w-node-_5ef4a456-78ee-3356-a721-49f53fdd5c23-1e7ebdbe"
      class="bokningsui-wrapper"
    >
      <h1
        id="w-node-_4bdeeea9-8aa6-fb9b-74fc-6d0ad61cef22-1e7ebdbe"
        class="text-heading"
      >
        Tillgängliga tider
      </h1>

      <div
        id="w-node-_075489b7-6c6c-6ec9-e029-891a2b37312e-1e7ebdbe"
        class="calendar-wrapper"
      ></div>
      <div
        id="w-node-_67bf3200-704d-3b6e-f47e-d3936cd845e7-1e7ebdbe"
        class="times-container"
      >
        <div class="times-wrapper">
          <div class="time-block"></div>
          <div class="time-block"></div>
          <div class="time-block"></div>
          <div class="time-block"></div>
          <div class="time-block"></div>
          <div class="time-block"></div>
          <div class="time-block"></div>
        </div>
      </div>
    </div>
  </div> -->
</template>

<script>
export default {
  name: "Boka",

  mounted() {
    const script = document.createElement("script");
    script.src = "https://muntra-dev.github.io/index.js";
    script.async = true;
    document.body.appendChild(script);
  },
};
</script>
