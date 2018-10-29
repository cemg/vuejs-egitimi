import ApiService from './api.service';

let resource = 'users';

export default {
    GetByPage(page) {
        return ApiService.get(resource, {params: {page}});
    },

    GetById(id) {
        return ApiService.get(resource + "/" + id);
    },

    DeleteById(id) {
        return ApiService.delete(resource + "/" + id);
    }
}
