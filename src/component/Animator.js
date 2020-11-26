import {
    gsap,
    Draggable
} from "gsap/all";
import KeyframesManger from './KeyframesManger';
import $ from 'jquery'

export default class Animator {
    constructor() {
        // register gsap plugins
        gsap.registerPlugin(Draggable);

        this.timeLine = null;

        this.init()
    }

    init() {
        console.log('INITIALIZED')
        this.populateTimeline()
    }

    populateTimeline() {
        gsap.killTweensOf('#animated-object')
        this.timeLine = gsap.timeline({
            paused: true
        })
        
        this.timeLine.add(gsap.set('#animated-object', {
            top: 0,
            left: 0
        }), 0)

        Draggable.create("#animated-object", {type:"x,y", bounds:"#stage", inertia:true});
        Draggable.create(".timeline-cursor", {type:"x", bounds: $("#timeline"), inertia:true});


        // if (selectedKeyframe) {
        //     tl.seek(selectedKeyframe.delay + selectedKeyframe. duration)
        // }
    }

    play() {
        const timelineWIdth = $('#timeline').innerWidth()
        const secondFrameWidth = timelineWIdth / 15
        const keyframes = KeyframesManger.getKeyframes();

        let totalDuration = 0
        for (let i = 0; i < keyframes.length; i++) {
            const keyframe = keyframes[i];

            this.timeLine.to('#animated-object', {
                duration: keyframe.duration,
                top: keyframe.y,
                left: keyframe.x
            }, `_${keyframes.length}`)
            
            this.timeLine.addLabel(`_${keyframes.length}`, keyframe.delay)

            totalDuration += keyframe.duration
        }

        this.timeLine.to('.timeline-cursor', {
            duration: totalDuration,
            left: secondFrameWidth * totalDuration,
            ease: "none"
        }, `-=${totalDuration}`)

        this.timeLine.play()
    }
}