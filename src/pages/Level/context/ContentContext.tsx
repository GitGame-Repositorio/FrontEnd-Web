import { createContext, useContext, useEffect, useState } from "react";
import { ContentContext, ContextProps } from "../type/content";
import { Content, ContentType } from "../../../@types/game";
import { useParams } from "react-router-dom";
import { useResource } from "../../../common/useResource";
import { NotFoundPage } from "../../NotFoundPage";
import { Loading } from "../../Loading";

const contentContext = createContext({} as ContentContext);

export const ContentProvider = ({ children }: ContextProps) => {
  const { id } = useParams();
  const content = useResource<Content>(`/content/${id}`, [id]);

  const [type, setType] = useState<ContentType>();
  const [edit, setEdit] = useState(true);
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
      }}
    >
      {children}
    </contentContext.Provider>
  );
};

export const useContent = () => {
  return useContext(contentContext);
};
