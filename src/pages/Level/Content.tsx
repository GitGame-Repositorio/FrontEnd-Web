import { HeaderGame } from "../../common/Header/HeaderGame";
import { objTypeForComponent, objTypeForName } from "./service/data";
import { ContentEdit } from "./components/content/ContentEdit";
import { ContentProvider, useContent } from "./context/ContentContext";
import { ContentView } from "./components/content/ContentView";
import { FormContentProvider } from "./context/FormContent";

export const ContentGame = () => {
  const { canEdit, type, content } = useContent();

  const Component = objTypeForComponent[type];
  const name = objTypeForName[type];

  const ContentBase = canEdit ? ContentEdit : ContentView;

  return (
    <div className="bg-primary-100 min-h-screen flex flex-col">
      <HeaderGame namePage={canEdit ? "Conteúdo" : name} />
      <ContentBase content={content}>
        <Component {...content} />
      </ContentBase>
    </div>
  );
};

export const Content = () => {
  return (
    <ContentProvider>
      <FormContentProvider>
        <ContentGame />
      </FormContentProvider>
    </ContentProvider>
  );
};
