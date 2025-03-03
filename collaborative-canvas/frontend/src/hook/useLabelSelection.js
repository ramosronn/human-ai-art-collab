import { useDispatch, useSelector } from "react-redux";
import {
  selectedLabelListAction,
  selectedLabelListSelector,
} from "../redux/selectedLabelList";

const useLabelSelection = () => {
  const dispatch = useDispatch();
  const selectedLabelList = useSelector(selectedLabelListSelector.selectAll);

  const addSelectedLabel = async (label) => {
    dispatch(
      selectedLabelListAction.addItem({
        id: label.id,
        type: label.type,
        fileid: label.fileid,
        keyword: label.keyword,
      })
    );
  };

  const removeSelectedLabel = async (id) => {
    dispatch(selectedLabelListAction.removeItem(id));
  };

  const resetSelectedLabel = async () => {
    dispatch(selectedLabelListAction.reset());
  };

  return {
    selectedLabelList,
    addSelectedLabel,
    removeSelectedLabel,
    resetSelectedLabel,
  };
};

export default useLabelSelection;
