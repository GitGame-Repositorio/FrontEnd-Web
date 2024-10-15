import { Content, Subject as SubjectType } from "../../../../@types/game";
import ReactMarkdown from "react-markdown";
import { useContent } from "../../context/ContentContext";
import { DivInputCustom } from "../DivInputCustom";
import { TitleEdit } from "./common/TitleEdit";
import { useFormContent } from "../../context/FormContent";

const SubjectEdit = () => {
  const {
    watch,
    register,
    formState: { errors },
  } = useFormContent();

  const classDiv = "rounded-2xl inline-block p-4 bg-primary-200";

  return (
    <>
      <TitleEdit register={register} errors={errors} />

      <div className="grid grid-cols-2 gap-6 flex-1 max-h-[800px]">
        <DivInputCustom label="Texto" className={classDiv}>
          <textarea
            className="input input-textarea h-[90%] resize-none"
            {...register("text")}
          ></textarea>
        </DivInputCustom>

        <DivInputCustom label="Texto Renderizado" className={classDiv}>
          <ReactMarkdown className="bg-primary-100 p-4 h-[90%] overflow-hidden rounded-xl">
            {watch("text")}
          </ReactMarkdown>
        </DivInputCustom>
      </div>
    </>
  );
};

type ContentProps = Content & SubjectType;

const SubjectView = ({ text, title, numberOrder }: ContentProps) => {
  return (
    <>
      <p className="text-xl font-bold">
        {numberOrder} - {title}
      </p>
      <ReactMarkdown>{text}</ReactMarkdown>
    </>
  );
};

export const Subject = (content: ContentProps) => {
  const { canEdit } = useContent();
  const Component = canEdit ? SubjectEdit : SubjectView;
  return (
    <div className="flex-1 flex flex-col gap-6 pb-4">
      <Component {...content} />
    </div>
  );
};
