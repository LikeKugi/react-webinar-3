import {useDispatch, useSelector} from "react-redux";
import useStoreSelector from "../../hooks/use-selector";
import PropTypes from "prop-types";
import Spinner from "../../components/spinner";
import ArticleComments from "../../components/article-comments";
import listToTree from "../../utils/list-to-tree";
import treeToList from "../../utils/tree-to-list";
import {useCallback, useMemo, useState} from "react";
import Comment from "../../components/comment";
import CommentField from "../../components/comment-field";
import commentsActions from "../../store-redux/comments/actions";
import {useNavigate} from "react-router-dom";
import CommentFallback from "../../components/comment-fallback";
import Offset from "../../components/offset";
import useTranslate from "../../hooks/use-translate";


function CommentsList({articleId}) {
  const {t} = useTranslate();

  const [parent, setParent] = useState({
    _id: articleId,
    _type: "article",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const storeSelect = useStoreSelector(state => ({
    exists: state.session.exists,
    userName: state.session.user?.profile?.name,
  }));

  console.log(storeSelect.userName)

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
    }, [setParent]),
    addComment: useCallback((text) => {
      if (!/\S/.test(text) || text.length === 0) return;
      dispatch(commentsActions.addComment({text, parent, id: articleId}));
      callbacks.resetParent();
    }, [parent]),
    onSignIn: useCallback(() => {
      navigate("/login", {state: {back: location.pathname}});
    }, [location.pathname]),
  };

  return (<Spinner active={select.waiting}>
    <ArticleComments title={`${t("articleComments.title")} (${select.count})`}>
      {select.count > 0 && comments.items.map(comment => (
        <Offset key={comment._id}
                offset={comment.offset}>
          <Comment {...comment}
                   answer={callbacks.setParent}
                   answerLabel={t("comment.answer")} isCurrentUser={storeSelect.userName === comment.author.profile.name}/>
          {parent._id === comment._id && (storeSelect.exists ? (<CommentField label={t("comment.commentField.label")}
                                                                              labelSend={t("comment.commentField.labelSend")}
                                                                              labelCancel={t("comment.commentField.labelCancel")}
                                                                              onReset={callbacks.resetParent}
                                                                              onSubmit={callbacks.addComment}
                                                                              placeholder={t("commentField.placeholder")}/>) : (
            <CommentFallback loginLabel={t("comment.commentFallback.loginLabel")}
                             text={t("comment.commentFallback.text")}
                             reset={t("comment.commentFallback.reset")}
                             signInAction={callbacks.onSignIn}
                             resetAction={callbacks.resetParent}/>))}

        </Offset>))}
      {parent._id === articleId && (storeSelect.exists ? (<CommentField label={t("commentField.label")}
                                                                        labelSend={t("commentField.labelSend")}
                                                                        onSubmit={callbacks.addComment}
                                                                        placeholder={t("commentField.placeholder")}/>) : (
        <CommentFallback loginLabel={t("commentFallback.loginLabel")}
                         text={t("commentFallback.text")}
                         signInAction={callbacks.onSignIn}
        />))}
    </ArticleComments>
  </Spinner>);
}

CommentsList.propTypes = {
  articleId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default CommentsList;
