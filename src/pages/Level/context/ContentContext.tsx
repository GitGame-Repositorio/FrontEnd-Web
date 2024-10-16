import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import { ContentContext, ContextProps } from "../type/content";
import { Content, ContentType } from "../../../@types/game";
import { useResource } from "../../../common/useResource";
import { NotFoundPage } from "../../NotFoundPage";
import { Loading } from "../../Loading";
import { api } from "../../../api";

const contentContext = createContext({} as ContentContext);

export const ContentProvider = ({ children }: ContextProps) => {
  const { id } = useParams();
  const [upd, setUpd] = useState(false);
  const updateAll = () => setUpd(!upd);
  const content = useResource<Content>(`/content/${id}`, [id, upd]);

  const [type, setType] = useState<ContentType>();
  const [edit, setEdit] = useState(false);
  const [dataFormat, setDataFormat] = useState({ cols: 2, rows: 1 });
  const dataTasks = useRef<string[] | object[]>([]);

  const updateDataFormat = (cols: number, rows: number) => {
    setDataFormat({ cols, rows });
  };

  const updateData = (obj: object, id: string) => {
    const objFind = dataTasks.current?.find((item) => item?.id === id);

    if (!objFind) dataTasks.current = [...dataTasks.current, obj];

    dataTasks.current = dataTasks.current?.map((item) =>
      item.id === obj.id ? obj : item
    );
  };

  const getData = () => {
    return dataTasks.current;
  };

  const handleEdit = () => setEdit(!edit);

  useEffect(() => {
    setType(content?.type || "subject");
  }, [content]);

  if (!id) return <NotFoundPage />;
  if (!content) return <Loading />;

  const cancelEdit = () => {
    setEdit(false);
    setType(content.type);
  };

  return (
    <contentContext.Provider
      value={{
        canEdit: edit,
        handleEdit,
        cancelEdit,
        setType,
        content,
        type,
        getData,
        setEdit,
        updateAll,
        dataFormat,
        updateData,
        updateDataFormat,
      }}
    >
      {children}
    </contentContext.Provider>
  );
};

export const useContent = () => {
  return useContext(contentContext);
};
