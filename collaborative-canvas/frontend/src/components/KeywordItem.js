import React, { useMemo } from "react";
import { Label, Tag, Text } from "react-konva";
import useItem from "../../../hook/useItem";
import colorMapping from "../config/keywordTypes";
import useLabelSelection from "../../../hook/useLabelSelection";

const KeywordItem = ({ data, e }) => {
  const { updateItem } = useItem();
  const { attrs, keyword } = data;

  const labelEntity = {
    id: "custom-" + keyword.type + ": " + keyword.keyword,
    type: keyword.type,
    fileid: "custom",
    keyword: keyword.keyword,
  };

  const { addSelectedLabel, removeSelectedLabel, selectedLabelList } = useLabelSelection();
  const isSelected = useMemo(() => {
    return selectedLabelList.some((label) => label.id === labelEntity.id);
  }, [selectedLabelList, labelEntity.id]);

  return (
    <KeywordLabel
      id={data.id}
      labelkey={labelEntity.id}
      xpos={attrs.x}
      ypos={attrs.y}
      onClick={() => {
        if (isSelected) removeSelectedLabel(labelEntity.id);
        else addSelectedLabel(labelEntity);
      }}
      isSelected={isSelected}
      type={labelEntity.type}
      text={
        labelEntity.type === "Arrangement"
          ? labelEntity.type
          : labelEntity.type + ": " + labelEntity.keyword
      }
      draggable={true}
      onDragEnd={(e) => {
        updateItem(e.currentTarget.id(), () => ({
          ...e.currentTarget.attrs,
          updatedAt: Date.now(),
        }));
      }}
    />
  );
};

export const KeywordLabel = ({
  id,
  labelkey,
  xpos,
  ypos,
  onClick,
  isSelected,
  type,
  text,
  draggable,
  onDragEnd,
}) => {
  return (
    <Label
      id={id}
      x={xpos}
      y={ypos}
      key={labelkey}
      onClick={onClick}
      draggable={draggable}
      onDragEnd={onDragEnd}
    >
      <Tag
        name="label-tag"
        pointerDirection="left"
        fill={isSelected ? colorMapping[type] : "transparent"}
        strokeWidth={1}
        stroke={colorMapping[type]}
        cornerRadius={4}
      />
      <Text
        text={text}
        name="label-text"
        fontSize={14}
        fontFamily={"Noto Sans"}
        lineHeight={1}
        padding={8}
        fill={isSelected ? "white" : colorMapping[type]}
      />
    </Label>
  );
};

export default KeywordItem;
