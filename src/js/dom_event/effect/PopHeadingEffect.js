import {styler, timeline, easing} from "popmotion";

const backInfo = document.querySelector(".back-info");
const backInfoStyle = styler(backInfo);
const headingStyles = Array.from(backInfo.children).map(styler);
const headingLabels = headingStyles.map((s, i) => "heading" + i);

export default function () {
    this.isShow = false;
    this.setStylerStart = (v) => {
        headingLabels.map((label, i) => {
            headingStyles[i].set(v[label]);
        });
    };
    this.show = function () {
        backInfoStyle.set('display', 'block');
        timeline([
            [...headingLabels.map((s, i) => ({
                'track': headingLabels[i],
                from: {y: -300, opacity: 0},
                to: {y: 0, opacity: 1},
                ease: {y: easing.backInOut, opacity: easing.linear},
                duration: 1000
            })), 50]
        ]).start({
            update: v => this.setStylerStart(v),
        });
        this.isShow = true;
    }
    this.hide = function () {
        timeline([
            [...headingLabels.map((s, i) => ({
                'track': headingLabels[i],
                from: {y: 0, opacity: 1},
                to: {y: -300, opacity: 0},
                ease: {y: easing.easeOut, opacity: easing.linear},
                duration: 1000
            })), 50]
        ]).start({
            update: v => this.setStylerStart(v),
            complete: () => {
                backInfoStyle.set('display', 'none');
            }
        });
        this.isShow = false;
    }
}
