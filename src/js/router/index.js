import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);


/**
 * ==================================================================================
 * Setup VUE Router
 * ==================================================================================
 **/

/**
 * Define VUE components
 * ==================================================================================
 **/

// Vue.component('back', () => import('../components/Back.vue'));


/**
 * Define VUE pages
 * ==================================================================================
 **/

const Home = () => import('../views/Home.vue');

const TrigFuncGraphs = () => import('../views/TrigFuncGraphs.vue');
const TrigInterpolation = () => import('../views/TrigInterpolation.vue');
const CircularLayout = () => import('../views/CircularLayout.vue');
const CircularAnimation = () => import('../views/CircularAnimation.vue');
const PointingObject = () => import('../views/PointingObject.vue');
const VelocityVector = () => import('../views/VelocityVector.vue');
const AccelerationVector = () => import('../views/AccelerationVector.vue');
const GravityVector = () => import('../views/GravityVector.vue');
const SpaceshipMovement = () => import('../views/SpaceshipMovement.vue');
const InterplanetaryGravity = () => import('../views/InterplanetaryGravity.vue');
const BallBouncing = () => import('../views/BallBouncing.vue');
const AnimatingFriction = () => import('../views/AnimatingFriction.vue');
const CircCollisionDetection = () => import('../views/CircCollisionDetection.vue');
const RectCollisionDetection = () => import('../views/RectCollisionDetection.vue');
const SpringAnimation = () => import('../views/SpringAnimation.vue');
const MultiSpringPoint = () => import('../views/MultiSpringPoint.vue');
const MultiGravitationalFields = () => import('../views/MultiGravitationalFields.vue');
const BezierCurves = () => import('../views/BezierCurves.vue');
const EasingTweening = () => import('../views/EasingTweening.vue');


/**
 * Setup VUE Routes
 * ==================================================================================
 **/

export default new VueRouter({

    /**
     * Set to `history` to remove hasbang (#!) on URL
     */
    // mode: 'history',

    routes: [
        { path: '/', component: Home },
        { path: '*', redirect: { name: Home }},
        
        {
            path: '/graph-of-trigonometric-functions', component: TrigFuncGraphs, name: 'TrigFuncGraphs',
            label: 'Graphs of Trigonometric Functions', desc: 'Graph/Wave of the Sine, Cosine & Tangent',
        },
        {
            path: '/trigonometric-interpolations', component: TrigInterpolation, name: 'TrigInterpolation',
            label: 'Trigonometric Interpolation', desc: 'Animation with Trigonometric Interpolation',
        },
        {
            path: '/circular-layout', component: CircularLayout, name: 'CircularLayout',
            label: 'Circular Layout', desc: 'Position elements in a circular layout',
        },
        {
            path: '/circular-animation', component: CircularAnimation, name: 'CircularAnimation',
            label: 'Circular Animation', desc: 'Animate elements in a circular motion',
        },
        {
            path: '/pointing-object', component: PointingObject, name: 'PointingObject',
            label: 'Pointing to an Object', desc: 'Rotate object to point at the Mouse Pointer',
        },
        {
            path: '/velocity-vector', component: VelocityVector, name: 'VelocityVector',
            label: 'Velocity Vector', desc: 'Moving an element with Velocity Vector',
        },
        {
            path: '/acceleration-vector', component: AccelerationVector, name: 'AccelerationVector',
            label: 'Acceleration Vector', desc: 'Moving an element with Acceleration Vector',
        },
        {
            path: '/gravity-vector', component: GravityVector, name: 'GravityVector',
            label: 'Gravity Vector', desc: 'Simulating gravity to an object',
        },
        {
            path: '/spaceship-movement', component: SpaceshipMovement, name: 'SpaceshipMovement',
            label: 'Spaceship Movement', desc: 'Classic ASTEROIDS spaceship movement',
        },
        {
            path: '/interplanetary-gravity', component: InterplanetaryGravity, name: 'InterplanetaryGravity',
            label: 'Interplanetary Gravity', desc: 'Simulating Planetary Orbits',
        },
        {
            path: '/ball-bouncing', component: BallBouncing, name: 'BallBouncing',
            label: 'Ball Bouncing', desc: 'Ball bouncing animation',
        },
        {
            path: '/animating-friction', component: AnimatingFriction, name: 'AnimatingFriction',
            label: 'Animating Friction', desc: 'Adding in friction on movement animation',
        },
        {
            path: '/circle-collision-detection', component: CircCollisionDetection, name: 'CircCollisionDetection',
            label: 'Circle Collision Detection', desc: 'Detecting circle to circle collision',
        },
        {
            path: '/rectangle-collision-detection', component: RectCollisionDetection, name: 'RectCollisionDetection',
            label: 'Rectangle Collision Detection', desc: 'Detecting rectangle to rectangle collision',
        },
        {
            path: '/spring-animation', component: SpringAnimation, name: 'SpringAnimation',
            label: 'Spring Animation', desc: 'Simulating object motion on a spring',
        },
        {
            path: '/multiple-spring-point', component: MultiSpringPoint, name: 'MultiSpringPoint',
            label: 'Multiple Spring Point', desc: 'Object attached to multiple spring points',
        },
        {
            path: '/multi-gravitational-fields', component: MultiGravitationalFields, name: 'MultiGravitationalFields',
            label: 'Multiple Gravitational Fields', desc: 'Particles on multiple gravitational fields',
        },
        {
            path: '/bezier-curves', component: BezierCurves, name: 'BezierCurves',
            label: 'Bezier Curves', desc: 'Creating Quadratic & Cubic Bezier curves',
        },
        {
            path: '/easing-and-tweening', component: EasingTweening, name: 'EasingTweening',
            label: 'Easing and Tweening', desc: 'Easing & Tweening in Animation',
        },
    ]
});