import React from "react";
import {
  ControlBar,
  LiveKitRoom,
  RoomAudioRenderer,
  VideoConference,
} from "@livekit/components-react";
import MyVideoConference from "../MyVideoConference/MyVideoConference";

function LKRoom(props) {
  const serverUrl = "wss://first-app-2i3sztgn.livekit.cloud";
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTg3NzYwNTksImlzcyI6IkFQSVpjZ3JzdXVpbnNLdSIsIm5iZiI6MTY5ODY4OTY1OSwic3ViIjoicXVpY2tzdGFydCB1c2VyIHFmdXZqciIsInZpZGVvIjp7ImNhblB1Ymxpc2giOnRydWUsImNhblB1Ymxpc2hEYXRhIjp0cnVlLCJjYW5TdWJzY3JpYmUiOnRydWUsInJvb20iOiJxdWlja3N0YXJ0IHJvb20iLCJyb29tSm9pbiI6dHJ1ZX19.5Eizq28-JFgsq76KAgVCxOtQ2Lk9D5kbfkurSILlQzg";

  return (
    <LiveKitRoom
      audio={true}
      video={true}
      token={token}
      connectOptions={{ autoSubscribe: false }}
      serverUrl={serverUrl}
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
