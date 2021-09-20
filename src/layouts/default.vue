<template>
  <div class="container">
    <div class="grid grid-cols-12 divide-x divide-gray-200">
      <div class="col-span-1 pt-3 pl-4">
        <ul class="space-y-2">
          <li>
            <nuxt-link to="/" exact class="text-5xl"
              ><fa id="logo" :icon="['fab', 'vuejs']"
            /></nuxt-link>
          </li>
          <li><nuxt-link to="/" exact>Home</nuxt-link></li>
          <li><nuxt-link to="/collections">Collections</nuxt-link></li>
        </ul>
      </div>
      <div class="col-span-11">
        <nuxt />
      </div>
    </div>
  </div>
</template>

<style>
.grid {
  min-height: 100vh;
}
</style>
