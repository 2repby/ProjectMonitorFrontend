const backendUrl = process.env.VUE_APP_BACKEND_URL;
import store from "@/state";

export default {
    getMetricValues(project_id) {
        console.log('Requesting metric values fro project' + project_id)
        // context.commit('setDataPreloading', true)
        // const params = new URLSearchParams()
        // params.append('per_page', 10)
        return window.axios.get(backendUrl + '/project/metricvalues/' + project_id,
        ).then(response => {
            // context.commit('setRating', response.data.projects);
            // context.commit('setDataPreloading', false)
            console.log(response.data)
            return response.data
        })
            .catch((error) => {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                    // context.commit('setWrongPassword', false)
                    store.commit('setNetworkError', true)
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    console.log(error.request);
                    store.commit('setNetworkError', true)

                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }
                console.log(error.config);
            })
    }
}