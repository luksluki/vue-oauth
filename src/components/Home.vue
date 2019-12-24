<template>
  <div class="hello">
    <div>
      <button @click="handleClickSignIn" v-if="!isSignIn" :disabled="!isInit">Sign In With Google</button>
      <button @click="handleClickSignOut" v-if="isSignIn" :disabled="!isInit">Sign Out</button>
      <h1 v-if="isSignIn" :hidden="!isInit">Welcome {{ name }}</h1>
      <h1 v-if="isSignIn" :hidden="!isInit">Your Signature ID : {{ signature }}</h1>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import axios from "axios";
export default {
  name: "test",
  data() {
    return {
      isInit: false,
      isSignIn: false,
      google_token: null,
      signature: null,
      name: null
    };
  },
  methods: {
    handleClickGetAuth() {
      this.$gAuth
        .getAuthCode()
        .then(authCode => {
          // On success
          console.log(authcode);
          handleClickSignIn();
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleClickSignIn() {
      this.$gAuth
        .signIn()
        .then(GoogleUser => {
          // On success do something, refer to https://developers.google.com/api-client-library/javascript/reference/referencedocs#googleusergetid
          console.log("user", GoogleUser);
          console.log(GoogleUser.getAuthResponse().access_token);
          axios
            .post("back-end-api-exaditama", {
              headers: {
                "Content-Type": "application/json"
              },
              data: {
                google_token: GoogleUser.getAuthResponse().access_token,
                signature: this.signature,
                redirect_uri: "postmessage"
              }
            })
            .then(res => {
              this.name = GoogleUser.getBasicProfile().ig;
            });
          this.isSignIn = this.$gAuth.isAuthorized;
        })
        .catch(error => {
          // On fail do something
          console.log(error);
        });
    },
    handleClickSignOut() {
      this.$gAuth
        .signOut()
        .then(() => {
          // On success do something
          this.isSignIn = this.$gAuth.isAuthorized;
          console.log("Logout Success");
        })
        .catch(error => {
          // On fail do something
        });
    }
  },
  mounted() {
    let that = this;
    let checkGauthLoad = setInterval(function() {
      that.isInit = that.$gAuth.isInit;
      that.isSignIn = that.$gAuth.isAuthorized;
      if (that.isInit) clearInterval(checkGauthLoad);
    }, 1000);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
</style>
