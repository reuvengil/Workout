import React, { Component } from "react";
import IMAGES from "../images/index";
import { LinearProgress } from '@material-ui/core'

export default class Container extends Component {
    constructor(props) {
        super(props);
        this.state = { inContainer: props.inContainer, isLoading: true }
    }
    handleResize() {
        const navbarHeight = document.getElementById('navbar').clientHeight;
        this.container.style.height = `${window.innerHeight - navbarHeight - 3}px`;
    }
    render() {
        return (
            <>
                <div style={{ display: this.state.isLoading ? 'block' : 'none' }}>
                    <LinearProgress />
                </div>
                <div id="container" style={{
                    // paddingLeft: '30%',
                    // paddingRight: '30%',
                    paddingTop: '10px',
                    paddingBottom: '10px',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '100% 100%',
                    display: this.state.isLoading ? 'none' : 'block',
                }}>
                    <div style={{
                        backgroundColor: 'rgba(28, 28, 28, 0.5)',
                        maxWidth: '900px',
                        margin: 'auto',
                        height: '100%',
                        overflow: 'auto',
                        padding: '20px',
                    }}>
                        {this.state.inContainer}
                    </div>
                </div>
            </>
        );
    }
    async preloadImages() {
        function imgToBase64(image) {
            return new Promise((resolve, _) => {
                fetch(image).then(response => response.blob()).then(imageBlob => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result);
                    reader.readAsDataURL(imageBlob);
                })
            });
        }
        const images = [];
        images.push(await imgToBase64(IMAGES.background[0]));
        images.push(await imgToBase64(IMAGES.background[1]));
        images.push(await imgToBase64(IMAGES.background[2]));
        return images;
    }
    async componentDidMount() {
        this.container = document.getElementById('container');

        this.handleResize();
        window.addEventListener('resize', this.handleResize);

        const images = await this.preloadImages();
        this.setState(prevState => ({ isLoading: !prevState }));

        this.container.style.backgroundImage = `url('${images[0]}')`;

        var i = 1;
        setInterval(() => {
            this.container.style.backgroundImage = `url('${images[i]}')`;
            i = (i + 1) % images.length;
        }, 7000);
    }
}