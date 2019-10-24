<template>

    <div id="app">

        <section class="app__header">
            <h4 class="app__header__title">{{ currProjectLabel }}</h4>
            <p class="app__header__desc">{{ currProjectDesc }}</p>
        </section>

        <section class="app__buttons">

            <router-link class="app__buttons__back" to="/">
                < Back to Home
            </router-link>

        </section>


        <div class="app__content">

            <transition name="fade" mode="out-in">
                <router-view></router-view>
            </transition>

        </div>

    </div>

</template>
<script>

    /**
     * ==================================================================================
     * Main VUE Component
     * ==================================================================================
     **/


    export default {
        props: {
            //
        },

        computed: {

            /**
             * Get the current page title
             * @return string
             */
            title: function() {
                return this.$route.name;
            },

            /**
             * Get the current project
             * @return object
             */
            currProject: function() {
                return this.$store.getters.findByName(this.title);
            },

            /**
             * Get current project label
             * @return string
             */
            currProjectLabel: function() {
                if(this.currProject)
                    return this.currProject.label;

                return '';
            },

            /**
             * Get current project description
             * @return string
             */
            currProjectDesc: function() {
                if(this.currProject)
                    return this.currProject.desc;

                return '';
            },
        },

        data: function() {
            return {
                //
            };
        },

        mounted: function() {
            this.init();

            this.testScript();
        },

        methods: {

            init: function() {
                this.setStore();
            },


            /**
             * ==================================================================================
             * @Methods
             * ==================================================================================
             **/

            //


            /**
             * ==================================================================================
             * @Getter/Setter
             * ==================================================================================
             **/

            /**
             * Set VUEX variables
             */
            setStore: function() {
                this.$store.commit('setProjects', this.$router.options.routes);
            },


            /**
             * ==================================================================================
             * @Checker
             * ==================================================================================
             **/

            //




            /**
             * ==================================================================================
             * @DEVELOPMENT
             * ==================================================================================
             **/

            testScript: function() {
                //
            },
        }
    };
</script>