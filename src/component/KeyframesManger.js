import $ from 'jquery'

export default class KeyframesManger {
    constructor() {
        this.tempAnimation = []

        this.init()
    }

    init() {
        console.log('== INITIALIZED KeyframesManger ===')
    }

    static getKeyframes() {
        const urlParams = new URLSearchParams(location.search.substring(1));
        const animationId = urlParams.get('animation_id')
        const animationKeyframes = localStorage.getItem(animationId);

        if (animationKeyframes) {
            return animationKeyframes
        } else {
            // window.location = '/'
        }

        // this is a temp animation for test
        return JSON.parse(localStorage.getItem('temp-animation') ?? '[]')
    }

    setKeyframe() {
        const timelineWIdth = $('#timeline').innerWidth()
        const secondFrameWidth = timelineWIdth / 15

        $('.timeline-cursor').clone().appendTo('#timeline').removeClass('timeline-cursor').addClass('keyframe');
        const endTime = $('.timeline-cursor').position().left / secondFrameWidth

        let totalDuration = 0;
        let keyframes = []
        for (let i = 0; i < this.tempAnimation.length; i++) {
            const keyframe = this.tempAnimation[i];
            
            keyframes.push(keyframe)
            
            totalDuration += keyframe.duration
            if (endTime > totalDuration) {
                // end of keyframes
                if (i == this.tempAnimation.length -1) {
                    keyframes.push({
                        duration: endTime - totalDuration, 
                        x: $('#animated-object').position().left,
                        y: $('#animated-object').position().top
                    })
                } else 
                // split a keyframe
                if (endTime < totalDuration + this.tempAnimation[i + 1].duration) {
                    keyframes.push({
                        duration: endTime - totalDuration, 
                        x: $('#animated-object').position().left,
                        y: $('#animated-object').position().top
                    })

                    keyframe.duration = totalDuration + this.tempAnimation[i + 1].duration - endTime
                    keyframes.push(keyframe)

                    i += 1;
                }
            }  
        }

        if (this.tempAnimation.length == 0) {
            keyframes.push({
                duration: endTime, 
                x: $('#animated-object').position().left,
                y: $('#animated-object').position().top
            })
        }

        this.tempAnimation = keyframes
    }

    saveAnimation() {
        // add the animation id (random generated) to a list of all animation ids
        // add the temporary animation "temp-animation" to local sotrage with it animation id
    }
}