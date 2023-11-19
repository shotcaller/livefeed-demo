import React from "react";
import {
  ControlBar,
  LiveKitRoom,
  RoomAudioRenderer,
  VideoConference,
} from "@livekit/components-react";
import MyVideoConference from "../MyVideoConference/MyVideoConference";
import * as Constants from '../../constants/constants';

function LKRoom(props) {
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDAzNzg1MDIsImlzcyI6IkFQSVpjZ3JzdXVpbnNLdSIsIm5iZiI6MTcwMDM3NzYwMiwic3ViIjoic2hvdGNhbGxlciIsInZpZGVvIjp7ImNhblB1Ymxpc2giOnRydWUsImNhblB1Ymxpc2hEYXRhIjp0cnVlLCJjYW5TdWJzY3JpYmUiOnRydWUsInJvb20iOiJkZXYiLCJyb29tSm9pbiI6dHJ1ZX19.r_PCkgI_pOrlVXhJ5-iIKwO7NauDvGRqU8wZg4CjN3w";

  return (
    <LiveKitRoom
      audio={true}
      video={true}
      token={token}
      connectOptions={{ autoSubscribe: false }}
      serverUrl={Constants.LiveKitRoomURL}
      data-lk-theme="default"
      style={{ height: "100vh" }}
    >
      {/* <MyVideoConference />
      <RoomAudioRenderer />
      <ControlBar /> */}
      <VideoConference />
    </LiveKitRoom>
  );
}

export default LKRoom;
