import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";
import { get_setting } from "../../services/helper";

function RevisionsAddon({
  RevisionsLimit,
  totalCustomerMessages,
  onRevisionAccepted,
}) {
  const [open, setOpen] = useState(false);
  const RevisionSteps = Array.from({ length: RevisionsLimit }, (_, i) => i + 1);

  const allow_accept = get_setting("revision_allow_accept");

  const handleAcceptClick = () => {
    setOpen(true);
  };

  const handleConfirmAccept = () => {
    setOpen(false);
    onRevisionAccepted(); // Call the function to accept the revision
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={totalCustomerMessages - 1} alternativeLabel>
        {RevisionSteps.map((step) => (
          <Step key={step}>
            <StepLabel>{step}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {allow_accept && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Button onClick={handleAcceptClick} variant="contained">
            Accept
          </Button>
        </Box>
      )}

      <Typography align="center" sx={{ mt: 2 }}>
        {get_setting("revisions_note")}
      </Typography>

      {/* Confirmation Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Acceptance</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Once you accept, you won't be able to send any more messages. Are
            you sure you want to proceed?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleConfirmAccept}
            color="primary"
            variant="contained"
          >
            Accept
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default RevisionsAddon;
