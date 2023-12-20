import {useDispatch, useSelector} from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../../components/spinner";
import ArticleComments from "../../components/article-comments";
import listToTree from "../../utils/list-to-tree";
import treeToList from "../../utils/tree-to-list";
import {useCallback, useMemo, useState} from "react";
import Comment from "../../components/comment/comment";
import CommentField from "../../components/comment-field";

function CommentsList({articleId}) {
  const [parent, setParent] = useState({
    _id: articleId,
    _type: "article",
  });

  const dispatch = useDispatch();

  const select = useSelector(state => ({
    comments: state.comments.data.items,
    count: state.comments.data.count,
    waiting: state.comments.waiting,
  }));

  const comments = {
    items: useMemo(() => (treeToList(listToTree(select.comments), (item, level) => ({
      _id: item._id,
      text: item.text,
      dateCreate: item.dateCreate,
      author: item.author,
      parent: item.parent,
      isDeleted: item.isDeleted,
      offset: level - 1,
    })).slice(1)), [select.comments])
  };

  const callbacks = {
    resetParent: useCallback(() => {
      setParent({
        _id: articleId,
        _type: "article",
      });
    }, [articleId]),
    setParent: useCallback((_id) => {
      setParent({
        _id,
        _type: "comment",
      });
    }, [setParent])
  };

  return (<Spinner active={select.waiting}>
    <ArticleComments title={`Комментарии (${select.count})`}>
      {select.count > 0 && comments.items.map(comment => (
        <div key={comment._id}
             style={{paddingInlineStart: `${comment.offset * 30}px`}}>
          <Comment {...comment}
                   answer={callbacks.setParent}/>
          {parent._id === comment._id && <CommentField label="Новый ответ"
                                                       labelSend="Отправить"
                                                       labelCancel="Отмена"
                                                       onReset={callbacks.resetParent}/>}
        </div>))}
      {parent._id === articleId && (<CommentField label="Новый комментарий"
                                                  labelSend="Отправить"/>)}
    </ArticleComments>
  </Spinner>);
}

CommentsList.propTypes = {
  articleId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default CommentsList;
