<template>
    <header>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">Navbar</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
              <router-link to="/" tag="a" class="nav-link" active-class="active" exact>
                Home
              </router-link>
              <router-link to="/calendar" tag="a" class="nav-link" active-class="active" exact>
                Calendar
              </router-link>
            </div>
          </div>
        </div>
      </nav>
    </header>
</template>

<script>
    export default {
        name: "Header"
    }
</script>

<style scoped>

</style>
