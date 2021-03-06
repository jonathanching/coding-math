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
const CubeRotation3D = () => import('../views/CubeRotation3D.vue');
const PolyCollisionDetection = () => import('../views/PolyCollisionDetection.vue');
const SierpinskiTriangle = () => import('../views/SierpinskiTriangle.vue');
const KochSnowflake = () => import('../views/KochSnowflake.vue');
const VerletIntegration = () => import('../views/VerletIntegration.vue');
const FractalTree = () => import('../views/FractalTree.vue');
const Isometric3D = () => import('../views/Isometric3D.vue');
const ForwardKinematics = () => import('../views/ForwardKinematics.vue');
const WalkCycle = () => import('../views/WalkCycle.vue');
const DragInverseKinematics = () => import('../views/DragInverseKinematics.vue');
const ReachInverseKinematics = () => import('../views/ReachInverseKinematics.vue');
const WeightedRandom = () => import('../views/WeightedRandom.vue');
const IFSFractals = () => import('../views/IFSFractals.vue');
const RandCirclePacking = () => import('../views/RandCirclePacking.vue');


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
        {
            path: '/3d-cube-rotation', component: CubeRotation3D, name: 'CubeRotation3D',
            label: '3D Cube Rotation', desc: 'Rotating a Cube in 3D',
        },
        {
            path: '/polygon-collision-detection', component: PolyCollisionDetection, name: 'PolyCollisionDetection',
            label: 'Polygon Collision Detection', desc: 'Detecting polygon to polygon collision',
        },
        {
            path: '/sierpinski-triangle', component: SierpinskiTriangle, name: 'SierpinskiTriangle',
            label: 'Sierpinski Triangle', desc: 'Drawing the Sierpinski Triangle fractal',
        },
        {
            path: '/koch-snowflake', component: KochSnowflake, name: 'KochSnowflake',
            label: 'Koch Snowflake', desc: 'Drawing the Koch Snowflake fractal',
        },
        {
            path: '/verlet-integration', component: VerletIntegration, name: 'VerletIntegration',
            label: 'Verlet Integration', desc: 'Simulating a pendulum w/ Verlet Integration',
        },
        {
            path: '/fractal-tree', component: FractalTree, name: 'FractalTree',
            label: 'Fractal Tree', desc: 'Creating a Tree patterned Fractal',
        },
        {
            path: '/isometric-3d', component: Isometric3D, name: 'Isometric3D',
            label: 'Isometric Projection', desc: 'Plotting a 3D map using Isometric Projection',
        },
        {
            path: '/forward-kinematics', component: ForwardKinematics, name: 'ForwardKinematics',
            label: 'Forward Kinematics', desc: 'Simulating Forward Kinematics',
        },
        {
            path: '/walk-cycle', component: WalkCycle, name: 'WalkCycle',
            label: 'Walk Cycle', desc: 'Walk cycle using Forward Kinematics',
        },
        {
            path: '/drag-inverse-kinematics', component: DragInverseKinematics, name: 'DragInverseKinematics',
            label: 'Drag Inverse Kinematics', desc: 'Simulate dragging w/ Inverse Kinematics',
        },
        {
            path: '/reach-inverse-kinematics', component: ReachInverseKinematics, name: 'ReachInverseKinematics',
            label: 'Reach Inverse Kinematics', desc: 'Simulate reaching w/ Inverse Kinematics',
        },
        {
            path: '/weighted-random', component: WeightedRandom, name: 'WeightedRandom',
            label: 'Weighted Random', desc: 'Algorithm for flexible randomization',
        },
        {
            path: '/ifs-fractals', component: IFSFractals, name: 'IFSFractals',
            label: 'IFS Fractals', desc: 'Drawing IFS Fractals',
        },
        {
            path: '/random-circle-packing', component: RandCirclePacking, name: 'RandCirclePacking',
            label: 'Random Circle Packing', desc: 'Packing circles on a given space',
        },
    ]
});