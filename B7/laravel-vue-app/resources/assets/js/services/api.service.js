import axios from 'axios'

let instance = axios.create({
    baseUrl: 'http://127.0.0.1:8000/api/',
    timeout: 5000,
    headers: {
        'Authorization': 'Bearer xxx',
        'Content-Type': 'application/json'
    }
});

instance.interceptors.request.use(function (config) {
    console.log('Request yapıldı (' + config.method + ')', config.baseUrl + config.url);

    return config;
});

instance.interceptors.response.use(
    function (response) {
        console.log('Response yapıldı (' + response.status + ')');

        return response;
    },
    function (error) {
        const {status, statusText, data} = error.response;

        /*if (error.response != null)
            toastr.error(error.response.data.message, 'Hata');
        else
            toastr.error(error.message, 'Hata');*/

        if (status >= 500) {
            toastr.error(data.message, 'Hata');
        }

        return Promise.reject(error);
    });


export default instance
