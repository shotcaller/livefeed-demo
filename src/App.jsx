import { useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'
import { ControlBar, GridLayout, LiveKitRoom, ParticipantTile, RoomAudioRenderer, useTracks } from '@livekit/components-react';
import { Track } from 'livekit-client';

function App() {

  const serverUrl = "wss://first-app-2i3sztgn.livekit.cloud";
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTg2NTA3NjMsImlzcyI6IkFQSVpjZ3JzdXVpbnNLdSIsIm5iZiI6MTY5ODU2NDM2Mywic3ViIjoicXVpY2tzdGFydCB1c2VyIDMzMG0ybCIsInZpZGVvIjp7ImNhblB1Ymxpc2giOnRydWUsImNhblB1Ymxpc2hEYXRhIjp0cnVlLCJjYW5TdWJzY3JpYmUiOnRydWUsInJvb20iOiJxdWlja3N0YXJ0IHJvb20iLCJyb29tSm9pbiI6dHJ1ZX19.PzNbfh8dh8OctU1JlAkIq5XLFUnfLDfmV8wopCTwOAs";

  return (
    <>
    <h1>LiveKit Demo</h1>
    <LiveKitRoom
      audio={true}
      video={true}
      token={token}
      connectOptions={{autoSubscribe: false}}
      serverUrl={serverUrl}
      data-lk-theme="default"
      style={{ height: '100vh' }}>
      <MyVideoConference />
      <RoomAudioRenderer />
      <ControlBar />
    </LiveKitRoom>
    </>
  )
}

function MyVideoConference(){
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true }
    ], {onlySubscribed: false}
  );

  return (
    <GridLayout tracks={tracks} >
      <ParticipantTile />
    </GridLayout>
  )
}

export default App
