<template>
  <div id="app">
    <app-calendar></app-calendar>
  </div>
</template>

<script>
  import Calendar from "./components/Calendar";

  export default {
    name: 'app',
    components: {
      appCalendar: Calendar,
    },
  }
</script>
