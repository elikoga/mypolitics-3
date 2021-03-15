import React from "react";
import Modal from "@shared/Modal/ModalView";
import { useTheme } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faSave } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { UseEditor } from "@components/Editor/utils/useEditor";
import { EditorPartyPartsFragment } from "@generated/graphql";
import useTranslation from "next-translate/useTranslation";
import PartyForm from "../PartyForm";
import { Container } from "./PartyEditStyle";

library.add(faSave, faPen);

interface Props {
  show: boolean;
  onClose(): void;
  editor: UseEditor;
  data: EditorPartyPartsFragment;
}

const PartyEdit: React.FC<Props> = ({ onClose, show, editor, ...props }) => {
  // eslint-disable-next-line react/destructuring-assignment
  const { id, ...data } = props.data;
  const { actions } = editor;
  const theme = useTheme();

  const modalHeader = {
    title: (
      <>
        <FontAwesomeIcon style={{ marginRight: "0.5rem" }} icon={faPen} />
        Edytuj partię
      </>
    ),
    color: theme.colors.primaryDarken,
  };

  const handleSubmit = async (values) => {
    await actions.parties.update(id, values);
    onClose();
  };

  return (
    <Modal header={modalHeader} show={show} onClose={onClose}>
      <Container>
        <PartyForm
          onSubmit={handleSubmit}
          initialValues={data}
          button={{
            text: "Zapisz",
            icon: <FontAwesomeIcon icon={faSave} />,
          }}
        />
      </Container>
    </Modal>
  );
};

export default PartyEdit;
