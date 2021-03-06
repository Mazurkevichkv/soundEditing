import React, { Component } from 'react';
import DropZone from '../../components/DropZone';
import './MP3.scss';

class Home extends Component {
    state = {
        audioContext: new AudioContext(),
        files: []
    };

    onFileLoad = async files => {
        this.setState({ files });
        files.forEach(async (file, index) => {
            let buffer = await file.arrayBuffer();
            buffer = await this.state.audioContext.decodeAudioData(buffer);

            this.draw(this.normalizeData(this.filterData(buffer)), index);
        });
    };

    filterData = audioBuffer => {
        const rawData = audioBuffer.getChannelData(0); // We only need to work with one channel of data
        const samples = 70000; // Number of samples we want to have in our final data set
        const blockSize = Math.floor(rawData.length / samples); // the number of samples in each subdivision
        const filteredData = [];
        for (let i = 0; i < samples; i++) {
            const blockStart = blockSize * i; // the location of the first sample in the block
            let sum = 0;
            for (let j = 0; j < blockSize; j++) {
                sum += Math.abs(rawData[blockStart + j]); // find the sum of all the samples in the block
            }
            filteredData.push(sum / blockSize); // divide the sum by the block size to get the average
        }
        return filteredData;
    };

    /**
     * Normalizes the audio data to make a cleaner illustration
     * @param {Array} filteredData the data from filterData()
     * @returns {Array} an normalized array of floating point numbers
     */
    normalizeData = filteredData => {
        const multiplier = Math.pow(Math.max(...filteredData), -1);
        return filteredData.map(n => n * multiplier);
    };

    /**
     * Draws the audio file into a canvas element.
     * @param {Array} normalizedData The filtered array returned from filterData()
     * @returns {Array} a normalized array of data
     */
    draw = (normalizedData, index) => {
        // set up the canvas
        const canvas = document.querySelector(
            `div[data-index='${index}'] canvas`
        );
        const dpr = window.devicePixelRatio || 1;
        const padding = 20;
        canvas.width = canvas.offsetWidth * dpr;
        canvas.height = (canvas.offsetHeight + padding * 2) * dpr;
        const ctx = canvas.getContext('2d');
        ctx.scale(dpr, dpr);
        ctx.translate(0, canvas.offsetHeight / 2 + padding); // set Y = 0 to be in the middle of the canvas

        // draw the line segments
        const width = (canvas.offsetWidth / normalizedData.length) * 30;
        for (let i = 0; i < normalizedData.length; i++) {
            const x = width * i;
            let height = normalizedData[i] * canvas.offsetHeight - padding;
            if (height < 0) {
                height = 0;
            } else if (height > canvas.offsetHeight / 2) {
                height = height > canvas.offsetHeight / 2;
            }
            this.drawLineSegment(ctx, x, height, width, (i + 1) % 2);
        }

        this.drawRect('#FF0000', canvas, 50, 40, ctx);
        this.drawRect('#309530', canvas, 200, 120, ctx);
        this.drawRect('#FF0000', canvas, 600, 40, ctx);
        this.drawRect('#FF0000', canvas, 800, 70, ctx);
    };

    drawRect(color, canvas, x, width, ctx) {
        ctx.fillStyle = color;
        ctx.globalAlpha = 0.2;
        ctx.fillRect(x, -canvas.height, width, canvas.height * 2);
        ctx.globalAlpha = 1.0;
    }

    /**
     * A utility function for drawing our line segments
     * @param {AudioContext} ctx the audio context
     * @param {number} x  the x coordinate of the beginning of the line segment
     * @param {number} height the desired height of the line segment
     * @param {number} width the desired width of the line segment
     * @param {boolean} isEven whether or not the segmented is even-numbered
     */
    drawLineSegment = (ctx, x, height, width, isEven) => {
        ctx.lineWidth = 1; // how thick the line is
        ctx.strokeStyle = '#fff'; // what color our line is
        ctx.beginPath();
        height = isEven ? height : -height;
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.arc(x + width / 2, height, width / 2, Math.PI, 0, isEven);
        ctx.lineTo(x + width, 0);
        ctx.stroke();
    };

    render() {
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        return (
            <section className="mp3-section">
                MP3
                <DropZone onFileLoad={this.onFileLoad} />
                {this.state.files.map((file, i) => (
                    <div data-index={i}>
                        <p>{file.name}</p>
                        <canvas />
                    </div>
                ))}
            </section>
        );
    }
}

export default Home;
