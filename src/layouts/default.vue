<template>
  <div class="container">
    <div class="grid">
      <div>
        <ul class="text-center">
          <li>
            <nuxt-link to="/" exact
              ><fa id="logo" :icon="['fab', 'vuejs']"
            /></nuxt-link>
          </li>
          <li><nuxt-link to="/" exact>Home</nuxt-link></li>
          <li><nuxt-link to="/collections">Collections</nuxt-link></li>
        </ul>
      </div>
      <div>
        <nuxt />
      </div>
    </div>
  </div>
</template>

<style>
.container {
  min-height: 100vh;
}
</style>
