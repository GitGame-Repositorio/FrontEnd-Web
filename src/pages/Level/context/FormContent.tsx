import { useForm, UseFormReturn } from "react-hook-form";
import { activityScheme, subjectScheme } from "../service/scheme";
import { createContext, useContext } from "react";
import { ContextProps } from "../type/content";
import { Content } from "../../../@types/game";
import { useContent } from "./ContentContext";
import { api } from "../../../api";

const formContext = createContext({} as UseFormReturn);
const contentScheme = subjectScheme.merge(activityScheme);

export const FormContentProvider = ({ children }: ContextProps) => {
  const { content, type, getData, setEdit, dataFormat } = useContent();

  const formControl = useForm<Content>({
    context: contentScheme,
    defaultValues: content,
  });

  const { handleSubmit } = formControl;

  const submit = async ({ description, ...fields }: Content) => {
    if (type !== "activity") {
      await api.patch(`/content/${fields.id}`, fields);
      setEdit(false);
      return null;
    }

    const countAllObject = dataFormat.cols * dataFormat.rows;

    const listData = getData();
    const haveAllObject = listData.length === countAllObject;

    if (!haveAllObject) {
      console.log("Faltando Objetos");
      return null;
    }

    await api.patch(`/content/${fields.id}`, { ...fields, tasks: listData });
    setEdit(false);
  };

  return (
    <formContext.Provider value={{ ...formControl }}>
      <form onSubmit={handleSubmit(submit)}>{children}</form>
    </formContext.Provider>
  );
};

export const useFormContent = () => {
  return useContext(formContext);
};
