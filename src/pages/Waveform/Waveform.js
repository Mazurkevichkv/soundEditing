import React, { Component } from 'react';
import WaveSurfer from 'wavesurfer.js';
import './Waveform.scss';
import TimelinePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.timeline.min.js';
import RegionsPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.regions.min.js';
import Button from '@material-ui/core/Button';
import DropZone from '../../components/DropZone';

class Home extends Component {
    state = {
        files: [],
        wavesurfer: null
    };

    onFileLoad = async files => {
        this.setState({ files });
        files.forEach(async (file, index) => {
            const wavesurfer = WaveSurfer.create({
                container: '#waveform',
                waveColor: 'purple',
                progressColor: 'black',
                backgroundColor: '#FFFFFF',
                height: 250,
                width: 800,
                barWidth: 2,
                barHeight: 1, // the height of the wave
                barGap: 0, // the optional spacing between bars of the wave, if not provided will be calculated in legacy format
                plugins: [
                    RegionsPlugin.create({
                        regions: [
                            {
                                start: 10,
                                end: 70,
                                loop: false,
                                color: 'hsla(359, 100%, 50%, 0.4)'
                            },
                            {
                                start: 120,
                                end: 170,
                                loop: false,
                                color: 'hsla(0, 0%, 100%, 0.9)'
                            },
                            {
                                start: 215,
                                end: 260,
                                loop: false,
                                color: 'hsla(359, 100%, 50%, 0.4)'
                            }
                        ],
                        dragSelection: {
                            slop: 5
                        }
                    })
                ]
            });

            const wavesurfer2 = WaveSurfer.create({
                container: '#waveform2',
                waveColor: 'purple',
                progressColor: 'black',
                backgroundColor: '#FFFFFF',
                height: 250,
                width: 800,
                barWidth: 2,
                barHeight: 1, // the height of the wave
                barGap: 0, // the optional spacing between bars of the wave, if not provided will be calculated in legacy format
                plugins: [
                    RegionsPlugin.create({
                        regions: [
                            {
                                start: 10,
                                end: 70,
                                loop: false,
                                color: 'hsla(0, 0%, 100%, 0.9)'
                            },
                            {
                                start: 120,
                                end: 170,
                                loop: false,
                                color: 'hsla(129, 63%, 46%, 0.3)'
                            },
                            {
                                start: 215,
                                end: 260,
                                loop: false,
                                color: 'hsla(0, 0%, 100%, 0.9)'
                            }
                        ],
                        dragSelection: {
                            slop: 5
                        }
                    })
                ]
            });

            wavesurfer.on('audioprocess', function(a) {
                console.log(a);
                const time = wavesurfer.getCurrentTime();
                console.log(time);
                if (time == 10) {
                    wavesurfer.skipForward(60);
                }
            });

            wavesurfer2.on('audioprocess', function(a) {
                console.log(a);
                const time = wavesurfer2.getCurrentTime();
                console.log(time);
                if (time == 10) {
                    wavesurfer2.skipForward(60);
                }
            });

            wavesurfer.loadBlob(file);
            wavesurfer2.loadBlob(file);

            wavesurfer2.on('ready', function() {
                wavesurfer2.play();
                wavesurfer2.setMute();
            });

            wavesurfer.on('ready', function() {
                wavesurfer.play();
            });

            this.setState({
                wavesurfer,
                wavesurfer2
            });
        });
    };

    render() {
        return (
            <div className="waveform-view">
                <DropZone onFileLoad={this.onFileLoad} />
                <Button
                    variant="contained"
                    color="secondary"
                    className="btn"
                    onClick={() => {
                        this.state.wavesurfer.stop();
                        this.state.wavesurfer2.stop();
                    }}
                >
                    Stop
                </Button>

                <Button
                    variant="contained"
                    color="primary"
                    className="btn"
                    onClick={() => {
                        this.state.wavesurfer.playPause();
                        this.state.wavesurfer2.playPause();
                    }}
                >
                    Play / Pause
                </Button>

                <div id="waveform" />
                <div id="waveform2" />
            </div>
        );
    }
}

export default Home;
