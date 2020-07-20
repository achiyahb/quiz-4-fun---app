<template>
    <div>
        <div :class="{drawerContainer: drawer}" >
            <transition-group name="slide" tag="div" >
                <div id="mySidenav" :class="['sidenav', {active: drawer}]" v-on-clickaway="closeDrawer" key="0" v-if="drawer">
                    <h1>האם אתה בטוח שברצונך להתנתק?</h1>
                    <div class="links">
                        <button class="yes" @click="logout">כן </button>
                        <button class="no" @click="closeDrawer">לא </button>
                    </div>
                </div>
            </transition-group>
        </div>
    </div>
</template>

<script>
    import { mixin as clickaway } from 'vue-clickaway'
    import EventBus from '../eventBus'
    import firebase from 'firebase/app'

    export default {
        name: 'Drawer',
        mixins: [clickaway],
        data: () => ({
            drawer: false,
        }),
        methods: {
            async logout() {
                await firebase.auth().signOut()
            },
            closeDrawer() {
                this.drawer = false;
                this.$emit('logoutClosed')
            },
            openDrawer() {
                this.drawer = true;
            }
        },
        watch: {
            $route () {
                this.drawer = false;
            }
        },
        mounted() {
            const self = this;
            EventBus.$on('logout', this.openDrawer)
        },
    }
</script>

<style scoped lang="scss">
    /* The side navigation menu */
    .drawerContainer {
        display: block;
        position: fixed; /* Stay in place */
        z-index: 1; /* Sit on top */
        right: 0;
        top: 0;
        width: 100%; /* Full width */
        height: 100%; /* Full height */
        overflow: auto; /* Enable scroll if needed */
        background-color: rgb(0, 0, 0); /* Fallback color */
        background-color: rgba(0, 0, 0, 0.4) !important; /* Black w/ opacity */
    }
    .sidenav {
        border: 0.0625rem solid rgba(0, 0, 0, 0.1);
        border-radius: .5rem;
        position: absolute; /* Stay in place */
        width: 20rem;
        z-index: 1; /* Stay on top */
        top: 40%; /* Stay at the top */
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #fff; /* Black*/
        overflow-x: hidden; /* Disable horizontal scroll */
        transition: 0.5s; /* 0.5 second transition effect to slide in the sidenav */
    }

    /* The navigation menu links */
    .links{
        display: inline-flex;
        margin-right: 1rem;
        margin-top: .7rem;
        margin-bottom: .8rem;
    }
    button{
        margin: 0;
        width: 1rem;
    }
    .sidenav button {
        padding: 0.3rem 2rem 0.3rem 2rem;
        text-decoration: none;
        font-size: 1rem;
        letter-spacing: 0;
        font-weight: 600;
        display: block;
        transition: 0.3s;
        outline: none;
        border: none;
        border-radius: .25rem;
        background-color: transparent;
        color: #F3BA3B;
    }
    .yes{
    }
    .no{
        color: black;
    }
    h1{
        font-size: 1.5rem;
        text-align: center;
        line-height: 2.12rem;
        color: #2E2E2F;
        font-weight: unset;
        margin-top: 1rem;
    }
    .slide-leave-active,
    .slide-enter-active {
        transition: .4s;
    }
    .slide-enter {
        transform: translate(+100%, 0);
    }
    .slide-leave-to {
        transform: translate(100%, 0);
    }

</style>

