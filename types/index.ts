import { Entry, EntryTranslation, Project, ProjectFile } from "@/lib/db";
import {
  CheckCircledIcon,
  CircleIcon,
  QuestionMarkCircledIcon,
} from "@radix-ui/react-icons";

export type UserClerk = {
  id: string;
  username: string | null | undefined;
  createdAt: number | null | undefined;
};

export type FullProject = Project & {
  files: FullProjectFile[]
};

export type FullProjectFile = ProjectFile & {
  entries: FullEntryType[]
}

export type FullEntryType = Entry & {
  translationValues: any;
};

export const statuses = [
  {
    value: "todo",
    label: "Todo",
    icon: CircleIcon,
  },
  {
    value: "review",
    label: "Needs Review",
    icon: QuestionMarkCircledIcon,
  },
  {
    value: "done",
    label: "Done",
    icon: CheckCircledIcon,
  },
];

export type details = {
  name: string;
  value: string;
  percent?: number;
}
