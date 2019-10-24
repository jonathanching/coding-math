<template>

    <div id="home">

        <canvas id="canvas"></canvas>

        <div class="home__header">
            <h1 class="home__header__title">Coding Math</h1>
            <p class="home__header__content">
                Collection of hands-on practice from the <a href="https://www.youtube.com/playlist?list=PL7wAPgl1JVvUEb0dIygHzO4698tmcwLk9" target="_blank">Coding Math - Youtube playlist</a>
            </p>
        </div>

        <div class="home__project-list">
            <ul v-for="i in columnCount">
                <li v-for="project in projects.slice((i - 1) * itemsPerColumn, i * itemsPerColumn)">

                    <router-link :to="project.path">{{ project.label }}</router-link>
                    <p>{{ project.desc }}</p>

                </li>
            </ul>
        </div>

    </div>

</template>
<script>

    /**
     * ==================================================================================
     * Home Page VUE component
     * ==================================================================================
     **/

    import Draw from '../mixins/Draw.js';


    export default {
        props: {
            //
        },

        mixins: [
            Draw,
        ],

        computed: {

            /**
             * Get all projects
             * @return array
             */
            projects: function() {
                return this.$store.state.projects;
            },

            /**
             * Calculate column per item
             */
            columnCount: function() {
                return Math.ceil(this.projects.length / this.itemsPerColumn);
            },
        },

        data: function() {
            return {
                itemsPerColumn: 10,
            };
        },

        mounted: function() {
            this.init();
        },

        methods: {

            init: function() {
                /* Set initial values */
                //
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

            //


            /**
             * ==================================================================================
             * @Checker
             * ==================================================================================
             **/

            //
        }
    };
</script>