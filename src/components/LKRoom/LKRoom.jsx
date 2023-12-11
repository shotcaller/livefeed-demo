import React from "react";
import {
  ControlBar,
  LiveKitRoom,
  RoomAudioRenderer,
  VideoConference,
} from "@livekit/components-react";
import '@livekit/components-styles';
import * as Constants from '../../constants/constants';

function LKRoom({ token }) {

  return (
    <LiveKitRoom
      audio={true}
      video={true}
      token={token}
      connectOptions={{ autoSubscribe: true }}
      serverUrl={Constants.LiveKitRoomURL}
      data-lk-theme="default"
      style={{ height: "86vh" }}
    >
      {/* <MyVideoConference />
      <RoomAudioRenderer />
      <ControlBar /> */}
      <VideoConference />
    </LiveKitRoom>
  );
}

export default LKRoom;
