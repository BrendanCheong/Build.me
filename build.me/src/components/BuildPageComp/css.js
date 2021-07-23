const css = `.peeek-loading {
    background-color: #f4f4f5;
    overflow: hidden;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100%;
    width: 100%;
}
.peeek-loading ul {
    position: absolute;
    left: calc(50% - 0.7em);
    top: calc(50% - 4.2em);
    display: inline-block;
    text-indent: 2.8em;
}
.peeek-loading ul li:after, .peeek-loading ul:after {
    width: 1.4em;
    height: 1.4em;
    background-color: #6366f1;
    border-radius: 100%;
}
.peeek-loading ul li:after, .peeek-loading ul:after {
    content: "";
    display: block;
}
.peeek-loading ul:after {
    position: absolute;
    top: 2.8em;
}
.peeek-loading li {
    position: absolute;
    padding-bottom: 5.6em;
    top: 0;
    left: 0;
}
.peeek-loading li:nth-child(1) {
    transform: rotate(0deg);
    animation-delay: 0.075s;
}
.peeek-loading li:nth-child(1):after {
    animation-delay: 0.075s;
}
.peeek-loading li:nth-child(2) {
    transform: rotate(36deg);
    animation-delay: 0.15s;
}
.peeek-loading li:nth-child(2):after {
    animation-delay: 0.15s;
}
.peeek-loading li:nth-child(3) {
    transform: rotate(72deg);
    animation-delay: 0.225s;
}
.peeek-loading li:nth-child(3):after {
    animation-delay: 0.225s;
}
.peeek-loading li:nth-child(4) {
    transform: rotate(108deg);
    animation-delay: 0.3s;
}
.peeek-loading li:nth-child(4):after {
    animation-delay: 0.3s;
}
.peeek-loading li:nth-child(5) {
    transform: rotate(144deg);
    animation-delay: 0.375s;
}
.peeek-loading li:nth-child(5):after {
    animation-delay: 0.375s;
}
.peeek-loading li:nth-child(6) {
    transform: rotate(180deg);
    animation-delay: 0.45s;
}
.peeek-loading li:nth-child(6):after {
    animation-delay: 0.45s;
}
.peeek-loading li:nth-child(7) {
    transform: rotate(216deg);
    animation-delay: 0.525s;
}
.peeek-loading li:nth-child(7):after {
    animation-delay: 0.525s;
}
.peeek-loading li:nth-child(8) {
    transform: rotate(252deg);
    animation-delay: 0.6s;
}
.peeek-loading li:nth-child(8):after {
    animation-delay: 0.6s;
}
.peeek-loading li:nth-child(9) {
    transform: rotate(288deg);
    animation-delay: 0.675s;
}
.peeek-loading li:nth-child(9):after {
    animation-delay: 0.675s;
}
.peeek-loading li:nth-child(10) {
    transform: rotate(324deg);
    animation-delay: 0.75s;
}
.peeek-loading li:nth-child(10):after {
    animation-delay: 0.75s;
}
.peeek-loading li {
    animation: dotAnimation 1.5s infinite;
}
@keyframes dotAnimation {
    0%, 55%, 100% {
        padding: 0 0 5.6em 0;
    }
    5%, 50% {
        padding: 2.8em 0;
    }
}
.peeek-loading li:after {
    animation: dotAnimationTwo 1.5s infinite;
}
@-webkit-keyframes dotAnimationTwo {
    0%, 55%, 100% {
        opacity: 1;
        transform: scale(1);
    }
    5%, 50% {
        opacity: 0.5;
        transform: scale(0.5);
    }
}
`
export default css