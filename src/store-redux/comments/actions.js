import {CommentsConstants} from "./constants";

export default {
  load: (id) => {
    return async (dispatch, getState, services) => {
      // Сброс текущего товара и установка признака ожидания загрузки
      dispatch({type: CommentsConstants.LOAD_START});

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`
        });
        // Товар загружен успешно
        dispatch({type: CommentsConstants.LOAD_SUCCESS, payload: {data: res.data.result}});

      } catch (e) {
        //Ошибка загрузки
        dispatch({type: CommentsConstants.LOAD_ERROR, payload: {e}});
      }
    };
  },

  addComment: ({text, parent, profileName}) => {
    return async (dispatch, getState, services) => {
      const token = localStorage.getItem('token');
      if (!token) return;
      try {
        const result = await services.api.request({
          url: `/api/v1/comments`,
          method: 'POST',
          headers: {
            'X-Token': token,
          },
          body: JSON.stringify({
            text,
            parent,
          })
        })
        const resObject = result.data.result;
        const responseData = {
          _id: resObject._id,
          text: resObject.text,
          dateCreate: resObject.dateCreate,
          author: {
            profile: {
              name: profileName
            },
            _id: resObject.author._id,
          },
          parent: {
            _id: resObject.parent._id,
            _type: resObject.parent._type,
          },
          isDeleted: resObject.isDeleted,
        }
        dispatch({type: CommentsConstants.ADD_COMMENT, payload: responseData});
      } catch (e) {

        dispatch({type: CommentsConstants.LOAD_ERROR, payload: e.message});
      }
    }
  }
};
