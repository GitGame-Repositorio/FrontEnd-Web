import { Button } from "../../../../common/Button/ButtonCustomn/Button";
import { ButtonOutline } from "../../../../common/Button/ButtonCustomn/ButtonOutline";
import { ContentProps } from "../../type/content";
import { PowerSelect } from "../../../../common/Input/inputCustom/PowerSelect";
import { listTypePowerSelect } from "../../service/data";
import { MdDeleteOutline } from "react-icons/md";
import theme from "../../../../service/tailwindTheme";
import { useContent } from "../../context/ContentContext";
import { FormContentProvider } from "../../context/FormContent";

export const ContentEdit = ({ children }: ContentProps) => {
  const { type, setType, cancelEdit } = useContent();

  return (
    <FormContentProvider>
      <main className="py-8 space-y-4 flex-1 container flex flex-col justify-between">
        {children}
        <div className="space-y-4 w-full">
          <PowerSelect
            onChange={(e) => setType(e.target.value)}
            list={listTypePowerSelect}
            text="Tipo de Conteúdo"
            value={type}
          />
          <div className="flex justify-between gap-4">
            <Button className="flex gap-2.5 w-max">
              <MdDeleteOutline size={22} color={theme.colors.primary[100]} />
              remover
            </Button>

            <div className="flex justify-end gap-4 w-2/6">
              <ButtonOutline
                className="border-2 normal-case font-bold"
                onClick={cancelEdit}
              >
                Cancelar
              </ButtonOutline>
              <Button className="normal-case font-bold">Salvar</Button>
            </div>
          </div>
        </div>
      </main>
    </FormContentProvider>
  );
};
