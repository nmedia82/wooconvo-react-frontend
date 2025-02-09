import { useRef, useState } from "react";
import {
  Box,
  IconButton,
  Divider,
  Tooltip,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import {
  MicOutlined,
  StopOutlined,
  PlayArrow,
  Send,
  Close,
} from "@mui/icons-material";
import { get_setting } from "../../services/helper";

function AudioAttachment({ onAudioSelected }) {
  const [open, setOpen] = useState(false);
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const audioChunksRef = useRef([]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    resetRecording();
    setOpen(false);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);

      recorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        setAudioBlob(blob);
        setAudioUrl(URL.createObjectURL(blob));
        audioChunksRef.current = [];
      };

      recorder.start();
      setRecording(true);

      // Stop recording automatically after 1 minute
      setTimeout(() => {
        if (recorder.state === "recording") {
          stopRecording();
        }
      }, 60000);
    } catch (error) {
      console.error("Error starting recording:", error);
      alert(
        "Microphone access is denied. Please allow microphone permissions and try again."
      );
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state === "recording") {
      mediaRecorder.stop();
      setRecording(false);
    }
  };

  const resetRecording = () => {
    setAudioBlob(null);
    setAudioUrl(null);
    setRecording(false);
    setMediaRecorder(null);
    audioChunksRef.current = [];
  };

  const handleSend = () => {
    if (audioBlob) {
      onAudioSelected(
        new File([audioBlob], "recording.webm", { type: "audio/webm" })
      );
      handleClose();
    }
  };

  const checkMicrophonePermission = async () => {
    try {
      const permissionStatus = await navigator.permissions.query({
        name: "microphone",
      });
      if (permissionStatus.state === "granted") {
        handleOpen();
      } else if (permissionStatus.state === "prompt") {
        // Try to request permission
        handleOpen();
      } else {
        alert(
          "Microphone permission is denied. Please enable it in your browser settings."
        );
      }
    } catch (error) {
      console.error("Error checking microphone permission:", error);
    }
  };

  return (
    <Box>
      <Tooltip title="Attach Audio">
        <IconButton
          sx={{ p: 1 }}
          aria-label="Attach Audio"
          onClick={checkMicrophonePermission}
        >
          <MicOutlined />
        </IconButton>
      </Tooltip>

      <Divider sx={{ height: "auto", ml: 1 }} orientation="vertical" />

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Record Audio</DialogTitle>
        <DialogContent>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={2}
          >
            {!recording && !audioUrl && (
              <Tooltip title="Start Recording">
                <IconButton
                  color="primary"
                  onClick={startRecording}
                  sx={{ fontSize: 40 }}
                >
                  <MicOutlined fontSize="large" />
                </IconButton>
              </Tooltip>
            )}

            {recording && (
              <Tooltip title="Stop Recording">
                <IconButton
                  color="error"
                  onClick={stopRecording}
                  sx={{ fontSize: 40 }}
                >
                  <StopOutlined fontSize="large" />
                </IconButton>
              </Tooltip>
            )}

            {audioUrl && (
              <Box display="flex" alignItems="center" gap={2}>
                <audio controls src={audioUrl} />
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSend}
            startIcon={<Send />}
            disabled={!audioUrl}
          >
            Send
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleClose}
            startIcon={<Close />}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default AudioAttachment;
