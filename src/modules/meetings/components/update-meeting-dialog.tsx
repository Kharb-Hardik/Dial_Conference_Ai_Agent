import React from "react";
import { ResponsiveDialog } from "@/components/core/responsive-dialog";
import { MeetingForm } from "./meeting-form";
import { MeetingGetOne } from "../types";

interface UpdateMeetingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValues: MeetingGetOne
}

export const UpdateMeetingDialog = ({
  open,
  onOpenChange,
  initialValues
}: UpdateMeetingDialogProps) => {

  return (
    <ResponsiveDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Edit meeting"
      description="Edit the meeting details"
    >
      <MeetingForm
        onSuccess={() => onOpenChange(false)}
        onCancel={() => onOpenChange(false)}
        initialValues={initialValues}
      />
    </ResponsiveDialog>
  );
};
