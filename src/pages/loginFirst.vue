<template>
<q-page>
<q-no-ssr>
  <div class="row justify-center q-mt-lg">

  <div class="col-xl-12 col-lg-6 col-md-6 col-12 bg-white shadow-3 q-pa-md text-center">
    <div class="text-subtitle1 q-my-sm">You aren't logged in.</div>
    <q-btn color="primary" to="/login" class="full-width" label="Log-In" />
    <div class="text-subtitle1 q-my-sm">OR</div>        
    <q-btn color="red" to="signup" class="full-width" label="Sign-Up" />
  </div>

  </div>
</q-no-ssr>
</q-page>
</template>

<script>
export default {
  
}
</script>

<style>

</style>
