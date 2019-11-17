<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
export default {
    data () {
        return {
        }
    },
    mounted () {
        window.addEventListener("popstate", () => {
            if (navigator.appName == "Microsoft Internet Explorer") {
                this.$router.replace('/home');
                // window.history.forward(1)
            } else {
                this.$router.replace('/home');
                // window.history.forward(-1)
            }
        })
    },
}
</script>

<style lang="less">
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

#nav {
    padding: 30px;

    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
</style>
