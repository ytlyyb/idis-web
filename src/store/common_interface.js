import { post, get, downPost } from "../services/http";
import environment from '../environment';
const {
    HOSTHOME: hosthome,
    URL_SERVICE_ARTICLE,
    URL_SERVICE,
    URL_SERVICE_USERSYSTEM,
    URL_SERVICE_ORDER,
    URL_SERVICE_DEVICE,
    URL_SERVICE_UNIFIED,
    URL_SERVICE_DEVICEHISTORY,
    URL_SERVICE_SPRINGSMARTAPS,
    URL_SERVICE_ROOMSERVICE
} = environment;
const actions = {
    addKeepAlivePage({ commit }, name) {
        commit('ADD_KEEP_ALVE', name)
    },
    delKeepAlivePage({ commit }, name) {
        commit('DEL_KEEP_ALVE', name)
    },
}


export default actions