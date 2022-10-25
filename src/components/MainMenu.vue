<template>

  <div>
    <h1>Responsive Design</h1>
     <div class="grid">
        <div class="col-6">
          <div class="card">
            <h5>Buttons</h5>
            <Button label="Submit" class="mr-20 mb-20" />
            <Button icon="pi pi-check" class="mr-2 mb-2" />
            <Button label="Submit" icon="pi pi-check" class="mr-2 mb-2" />
            <Button label="Submit" icon="pi pi-check" iconPos="right" class="mr-2 mb-2" />
            <Button label="Disabled" disabled="disabled" class="mr-2 mb-2" />


          </div>
        </div>
     </div>
  </div>
</template>

<script>
// import InputText from "primevue/inputtext";
import Button from "primevue/button";
// import Password from "primevue/password";
// import SplitButton from "primevue/splitbutton";
// import Toast from "primevue/toast";

export default {
  name: "MainMenu",
  components: {Button},
}
</script>

<!--<style scoped>-->

<!--</style>-->