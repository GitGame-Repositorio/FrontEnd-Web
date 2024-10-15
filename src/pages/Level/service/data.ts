import { Activity } from "../components/type/Activity";
import { TaskOneSelect } from "../components/type/activity/TaskOneSelect";
import { Subject } from "../components/type/Subject";

export const objTypeForComponent = {
  activity: Activity,
  subject: Subject,
};

export const objTypeForName = {
  activity: "Exercício",
  subject: "Assunto",
};

export const listTypePowerSelect = [
  { name: "Assunto", value: "subject" },
  { name: "Atividade", value: "activity" },
];

export const listActivityItem = [
  { name: "Seleção Única", value: "taskOneSelect", component: TaskOneSelect },
  {
    name: "Múltipla Seleção",
    value: "taskMultipleSelect",
    component: TaskOneSelect,
  },
];
