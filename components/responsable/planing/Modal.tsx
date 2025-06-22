// InfoModal.tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import PlaningForm from "./PlaningForm";
import { ProgramType } from "@/types/planing";

type Props = {
  day: Date;
  open: boolean;
  setOpen: (open: boolean) => void;
  program?: ProgramType | null,
  setProgram: (program: ProgramType) => void
};

export default function PlaningModal({ day, open, setOpen , program, setProgram}: Props) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>📅 Date Selected</DialogTitle>
          <DialogDescription className="text-sm">
            You clicked on <strong>{format(day, "PPP")}</strong>.
          </DialogDescription>
        </DialogHeader>

        <div className="flex "
        >
          <PlaningForm day={day} setOpen={setOpen} program={program} setProgram={setProgram}/>
        </div>
      </DialogContent>
    </Dialog>
  );
}
