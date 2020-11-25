import {
    gsap,
    Draggable
} from "gsap/all";
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

    getKeyframes() {
        const keyframes = [{
                duration: 1,
                x: 200,
                y: 150
            },
            {
                duration: 2,
                x: 80,
                y: 100
            },
            {
                duration: 3,
                x: 190,
                y: 70
            }
        ]

        return keyframes
    }

    play() {
        const timelineWIdth = $('#timeline').innerWidth() - 20
        const secondFrameWidth = timelineWIdth / 15
        const keyframes = this.getKeyframes();

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