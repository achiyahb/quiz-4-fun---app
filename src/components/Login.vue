<template>
    <div class="page-wrapper" >

        <p v-if="loginError">{{ loginError }}</p>
        <div id="firebaseui-auth-container"
             v-show="user == null "
             data-test="login-btn">
        </div>
        <h1 v-if="user != null">התחברת בהצלחה</h1>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import { isNil } from 'lodash'
    import firebase from 'firebase/app'
    import * as firebaseui from 'firebaseui'
    import 'firebaseui/dist/firebaseui.css'


    export default {
        data: () => ({
            loginError: null,
            loader: false,
        }),
        head() {
            return {
                title: {
                    inner: 'התחברות'
                },
                meta: [
                    {
                        name: 'description',
                        content: `Sign in or sign up to ${this.appTitle}`,
                        id: 'desc'
                    }
                ]
            }
        },
        computed: {
            ...mapState('authentication', ['user', 'processingData']),
            ...mapState('app', ['networkOnLine', 'appTitle'])
        },
        watch: {
            user(){
                this.$router.go(-1)
            }
        },
        methods: {
            initPhoneLogin(){
                if (this.user) {
                    return;
                }
                this.loginError = null
                this.$store.commit('authentication/setUser', undefined)
                let ui = firebaseui.auth.AuthUI.getInstance();
                if (!ui) {
                    ui = new firebaseui.auth.AuthUI(firebase.auth());
                }
                const self = this;
                ui.start('#firebaseui-auth-container', {
                    callbacks: {
                        signInSuccessWithAuthResult: function(user) {
                            return false;
                        },
                        signInFailure: function(error) {
                            self.loginError = error;
                            self.processingData = false;
                            self.$store.commit('authentication/setUser', null);
                            return console.log(error);
                        },
                    },
                    signInFlow: 'popup',
                    signInOptions: [
                        {
                            provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                            requireDisplayName: true,
                            defaultCountry: 'IL',
                        },
                        // {
                        //   provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
                        //   requireDisplayName: true,
                        //   defaultCountry: 'IL'
                        // },
                    ],
                });
            }
        },
        mounted(){
            this.initPhoneLogin();
        }
    }
</script>

<style lang="scss" scoped>
    *{
        direction: rtl;
    }
    .page-wrapper {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;

        .login-page-title {
            text-align: center;
        }

        .login-btn {
            margin-top: 20px;
            cursor: pointer;
            padding: 5px 20px;

            display: inline-block;
            border-radius: 3px;


            &:hover {

            }
        }
    }
</style>
