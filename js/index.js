class Animator {
    constructor() {
        this.init()
    }

    init() {
        console.log('INITIALIZED')
        this.populateTimeline()
    }

    populateTimeline() {
        gsap.killRweensOf('#target')
        tl = gsap.timeline({paused : true})
        tl.add(gsap.set('#target', {top: 0, left: 0}), 0)

        keyframes = [
            {
                duration: 10,
                x: 200,
                y: 150
            },
            {
                duration: 5,
                x: 80,
                y: 100
            },
            {
                duration: 16,
                x: 190,
                y: 70
            }
        ]

        for (let i = 0; i < keyframes.length; i++) {
            const keyframe = keyframes[i];

            tl.to('#target', {duration: keyframe.duration, top: keyframe.y, left: keyframe.x}, `_${keyframes.length}`)
            tl.addLabel(`_${keyframes.length}`, keyframe.delay)
        }

        // if (selectedKeyframe) {
        //     tl.seek(selectedKeyframe.delay + selectedKeyframe. duration)
        // }
    }
}

$(() => {
    new Animator()
})