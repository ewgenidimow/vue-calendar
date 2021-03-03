<template>
  <div id="app" class="container mt-5">
    <h1 class="text-center mb-5">Event calendar</h1>
    <add-event :events="events"></add-event>
    <calendar :events="events"></calendar>
    <list-events :events="events"></list-events>
  </div>
</template>

<script>
  import Calendar from "./components/Calendar";
  import AddEvent from "./components/AddEvent";
  import ListEvents from "./components/ListEvents";

  export default {
    name: 'app',
    components: {
      Calendar: Calendar,
      AddEvent: AddEvent,
      ListEvents: ListEvents
    },
    data() {
      return {
        events: {},
      }
    }
  }
</script>
