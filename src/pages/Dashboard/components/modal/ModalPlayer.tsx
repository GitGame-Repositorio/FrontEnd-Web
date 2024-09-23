import { useAuth } from "../../../../AuthContext";
import { ContentUser, ModalUserEdit, ModalUserEditProps } from "./ModalUser";

const CarouselChapter = () => <></>;
const BarProgress = () => <></>;

export const ModalPlayerEdit = ({ canEdit, ...rest }: ModalUserEditProps) => {
  const { user } = useAuth();
  const { canManageCRUDPlayer } = user.admin;
  return (
    <ModalUserEdit
      canEdit={canEdit}
      canDeleteUser={canManageCRUDPlayer}
      {...rest}
    >
      <>
        {canEdit && (
          <>
            <ContentUser title="Capítulos">
              <CarouselChapter />
            </ContentUser>
            <BarProgress />
          </>
        )}
      </>
    </ModalUserEdit>
  );
};
