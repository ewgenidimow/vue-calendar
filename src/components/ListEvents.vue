<template>
  <div id="list-event" class="mt-5">
    <h1 class="text-center">Event list information</h1>
    <table class="table mt-5">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Date</th>
          <th scope="col">Email</th>
          <th scope="col">Phone</th>
        </tr>
      </thead>
      <tbody>
      <tr v-show="Object.keys(events).length === 0" class="text-center"><td colspan="5">No result</td></tr>
      <template v-for="event in events">
        <tr v-for="item in event">
          <th scope="row">{{item.id}}</th>
          <td>{{item.title}}</td>
          <td>{{item.date}}</td>
          <td>{{item.email}}</td>
          <td>{{item.phone}}</td>
        </tr>
      </template>
      </tbody>
    </table>
  </div>
</template>

<script>
    export default {
        name: "Table",
        props: {
            events: {}
        }
    }
</script>

<style scoped>

</style>
