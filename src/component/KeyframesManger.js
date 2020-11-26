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
        var animationId = urlParams.get('animation_id')

        // todo : remove this part (only for test)
        animationId = 'temp-animation'
        localStorage.removeItem(animationId)
        localStorage.setItem(animationId, JSON.stringify([
            {duration: 0, x: 628, y: 104},
            {duration: 7, x: 1418, y: 106},
            {duration: 7, x: 804, y: 263}
        ]))
        // ========

        const animationKeyframes = JSON.parse(localStorage.getItem(animationId) ?? '[]')

        if (animationKeyframes) {
            return animationKeyframes
        } else {
            window.location = '/?animation_id=' + Math.random().toString(36).substring(7)
        }
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

    // not tested yet
    saveAnimation() {
        const urlParams = new URLSearchParams(location.search.substring(1));
        var animationId = urlParams.get('animation_id')

        // add the animation id (random generated) to a list of all animation ids
        var animationIds = JSON.parse(localStorage.getItem('animations_ids'))
        animationIds.push(animationId)
        localStorage.setItem('animations_ids', JSON.stringify(animationIds))

        // add the temporary animation to local sotrage using its animation id
        localStorage.setItem(animationId, JSON.stringify(this.tempAnimation))
    }
}