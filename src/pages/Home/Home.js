import React, { Component } from 'react';
import MIDIFile from 'midifile';
import MIDIEvents from 'midievents';
import ReactJson from 'react-json-view';
import DropZone from '../../components/DropZone';

class Home extends Component {
    state = {
        midiResult: {}
    };

    runMidiParser = buffer => {
        const result = {};

        // Creating the MIDIFile instance
        const midiFile = new MIDIFile(buffer);

        // Reading headers
        midiFile.header.getFormat(); // 0, 1 or 2
        midiFile.header.getTracksCount(); // n
        // Time division
        if (
            midiFile.header.getTimeDivision() === MIDIFile.Header.TICKS_PER_BEAT
        ) {
            midiFile.header.getTicksPerBeat();
        } else {
            midiFile.header.getSMPsTEFrames();
            midiFile.header.getTicksPerFrame();
        }

        // MIDI events retriever
        let events = midiFile.getMidiEvents();
        console.log('subtype', events[0].subtype); // type of [MIDI event](https://github.com/nfroidure/MIDIFile/blob/master/src/MIDIFile.js#L34)
        console.log('playTime', events[0].playTime); // time in ms at wich the event must be played
        console.log('param1', events[0].param1); // first parameter
        console.log('param2', events[0].param2); // second one
        result.MIDIEvents = events;

        // Lyrics retriever
        const lyrics = midiFile.getLyrics();
        if (lyrics.length) {
            console.log(
                'Time at wich the text must be displayed',
                lyrics[0].playTime
            ); // Time at wich the text must be displayed
            console.log('The text content to be displayed', lyrics[0].text); // The text content to be displayed
        }

        // Reading whole track events and filtering them yourself
        events = midiFile.getTrackEvents(0);
        result.TrackEvents = events;

        result.getTrackContent = [];

        // Or for a single track
        midiFile.tracks.forEach(track => {
            const trackEventsChunk = track.getTrackContent();
            events = MIDIEvents.createParser(trackEventsChunk);

            let event;
            const content = [];
            while (events.next()) {
                event = events.next();
                console.log('event', event);
                content.push(event);
                // Printing meta events containing text only
                if (
                    event &&
                    event.type === MIDIEvents.EVENT_META &&
                    event.text
                ) {
                    console.log(`Text meta: ${event.text}`);
                }
            }
            result.getTrackContent.push(content);
        });

        this.setState({ midiResult: result });
    };

    onFileLoad = async files => {
        const bufferPromise = files[0].arrayBuffer();

        files[0].arrayBuffer().then(buffer => console.log(buffer));

        const buffer = await files[0].arrayBuffer();
        console.log(files, buffer);
        this.runMidiParser(buffer);
    };

    render() {
        return (
            <section>
                Home
                <DropZone onFileLoad={this.onFileLoad} />;
                <ReactJson src={this.state.midiResult} />;
            </section>
        );
    }
}

export default Home;
