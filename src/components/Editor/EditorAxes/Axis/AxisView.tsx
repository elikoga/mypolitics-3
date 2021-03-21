import React, { useMemo, useState } from "react";
import {
  EditorAxisPartsFragment,
  EditorAxisPartsFragmentDoc,
  EditorIdeologyPartsFragment,
} from "@generated/graphql";
import useTranslation from "next-translate/useTranslation";
import IdeologyIcon from "@shared/IdeologyIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faTrash } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import useEntity from "@components/Editor/utils/useEntity";
import { UseEditor } from "@components/Editor/utils/useEditor";
import ActionButton from "@shared/ActionButton";
import { useAxisSelect, useIdeology } from "./AxisUtils";
import {
  Container,
  Info,
  IdeologyContainer,
  IdeologyName,
  Wrapper,
} from "./AxisStyle";
import useBreakpoint from "@utils/hooks/useBreakpoint";
import { useEditorSlidingUpPanel } from "@components/Editor/EditorSlidingUpPanel";

library.add(faTimes);

const AxisIdeology: React.FC<{
  data?: EditorIdeologyPartsFragment;
  side: "left" | "right";
  axisId: string;
}> = ({ data, side, axisId }) => {
  const { update } = useEntity({
    id: axisId,
    name: "QuizAxis",
    document: EditorAxisPartsFragmentDoc,
  });
  const { lang } = useTranslation();
  const { ref, handleDrop } = useAxisSelect({
    side,
    axisId,
  });
  const { show } = useEditorSlidingUpPanel();

  const handleDelete = () =>
    update({
      [side]: null,
    });

  const handleClick = () => {
    show("ideology", (id) => {
      handleDrop({ id });
    });
  };

  const isClickable = useBreakpoint("sm");

  if (!data) {
    return (
      <Info onClick={handleClick} disabled={!isClickable} ref={ref}>
        {isClickable ? "Kliknij, aby wybrać ideologię" : "Upuść ideologię"}
      </Info>
    );
  }

  const { name, icon, color } = data;

  return (
    <IdeologyContainer color={color}>
      <IdeologyIcon icon={icon} />
      <IdeologyName>{name[lang]}</IdeologyName>
      <ActionButton variant="white" onClick={handleDelete}>
        <FontAwesomeIcon icon={faTimes} />
      </ActionButton>
    </IdeologyContainer>
  );
};

interface Props {
  data?: EditorAxisPartsFragment;
  editor: UseEditor;
}

const Axis: React.FC<Props> = ({ data, editor }) => {
  const { axes } = editor.actions;
  const [deleteConfirmed] = useState<boolean>(false);
  const leftIdeology = useIdeology(data?.left && data.left.id);
  const rightIdeology = useIdeology(data?.right && data.right.id);
  const dataJson = JSON.stringify({ data });

  return useMemo(
    () => (
      <Wrapper>
        <Container>
          <AxisIdeology axisId={data.id} data={leftIdeology} side="left" />
          <AxisIdeology axisId={data.id} data={rightIdeology} side="right" />
        </Container>
        <ActionButton
          onClick={() => axes.delete(data.id)}
          title="Usuń oś"
          mustConfirm
          variant="red"
          size="large"
        >
          <FontAwesomeIcon icon={faTrash} />
        </ActionButton>
      </Wrapper>
    ),
    [dataJson, deleteConfirmed]
  );
};

export default Axis;
