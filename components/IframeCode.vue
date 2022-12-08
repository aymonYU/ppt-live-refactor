<template>
    <iframe :src="url"
     style="width:100%; height:450px; margin-top: -40px; border:0; border-radius: 4px; overflow:hidden;"
     title="confident-joliot-rdhe8h"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>
</template>

<script setup lang="ts">

const props = defineProps({
  url: {
    default: '',
  },
})

</script>