<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/contactus">Contact Us</router-link> |
      <router-link to="/photos/1">Photo 1</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
@import 'https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css';
@import '../node_modules/nprogress/nprogress.css';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
