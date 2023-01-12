import {createStore} from "vuex";
import router from "@/router";
// import {error} from "@babel/eslint-parser/lib/convert";

const backendUrl = process.env.VUE_APP_BACKEND_URL;
const client_id = process.env.VUE_APP_CLIENT_ID;
const client_secret = process.env.VUE_APP_CLIENT_SECRET;



const  store = createStore({
    state: {
        user: {},
        projectsWithMetricValues: [],
        periods: [],
        areas: [],
        userAreas: [],
        projects: [],
        users: [],
        metrics: [],
        token: null,
        preLoading: false,
        wrongPassword: false,
        networkError: false,
        loggedIn: false,
        metricValues: [],
        backurl: backendUrl,
    },

    mutations: {


        setToken(context, token) {
            context.token = token;
        },

        getToken(context, token) {
            context.token = token;
        },

        setUser(context, user) {
            context.user = user;
        },

        setPreloading(context, is_load) {
            context.preLoading = is_load;
        },
        setWrongPassword(context, isError) {
            context.wrongPassword = isError
        },

        setNetworkError(context, isError) {
            context.networkError = isError
        },
        setLoggedIn(context, state){
            context.loggedIn = state
        },
        getNetworkError(context){
            return context.networkError
        },
        setProjectsWithMetricValues(context, data){
            context.projectsWithMetricValues = data
            console.log('projectsWithMetricValues IN THE STORE');
        },
        setPeriods(context, data){
            context.periods = data
            console.log('periods IN THE STORE');
        },
        setAreas(context, data){
            context.areas = data
            console.log('areas IN THE STORE');
        },
        setUserAreas(context, data){
            context.userAreas = data
            console.log('userAreas IN THE STORE');
        },
        setMetricValues(context, data){
            context.metricValues = data
            console.log('metricValues IN THE STORE');
        },
        setProjects(context, data){
            context.projects = data
            console.log('projects IN THE STORE');
        },
        setUsers(context, data){
            context.users = data
            console.log('users IN THE STORE');
        },
        setMetrics(context, data){
            context.metrics = data
            console.log('metrics IN THE STORE');
        },


        // logout(context) {
        //     context.user = null;
        //     context.token = null;
        //     context.loggedIn = false;
        //     localStorage.removeItem('token')
        // },
    },
    actions: {
        auth(context, {login, password}){
            context.commit('setNetworkError', false)
            context.commit('setWrongPassword', false)
            window.axios.post(backendUrl+'/login', {
                email: login,
                password: password,
                grant_type: 'password'
            }, {
                headers: {
                    Authorization: 'Basic ' + window.btoa(client_id+':'+client_secret)
                }
            }).then(response => {
                    context.commit('setToken', response.data.token);
                    context.commit('setLoggedIn',true);
                    localStorage.setItem('token', response.data.token);
                    context.dispatch('getUser').then()
            })
                .catch((error) => {
                    if (error.response) {
                        // The request was made and the server responded with a status code
                        // that falls out of the range of 2xx
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                        // context.commit('setWrongPassword', false)
                        context.commit('setWrongPassword', true)
                    } else if (error.request) {
                        // The request was made but no response was received
                        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                        // http.ClientRequest in node.js
                        console.log(error.request);
                        context.commit('setNetworkError', true)

                    } else {
                        // Something happened in setting up the request that triggered an Error
                        console.log('Error', error.message);
                    }
                    console.log(error.config);
                })
        },

        logout(context){
            context.commit('setNetworkError', false)
            window.axios.get(backendUrl+'/logout',
                {
                    headers: {
                        Authorization: 'Bearer ' + context.state.token
                    }
            }).then(() => {
                    context.commit('setToken', null);
                    context.commit('setLoggedIn',false);
                    context.commit('setUser', null);
                    localStorage.removeItem('token');
                    router.push('/');
                }
            )
                .catch((error) => {
                    if (error.response) {
                        // The request was made and the server responded with a status code
                        // that falls out of the range of 2xx
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                        // context.commit('setWrongPassword', false)
                        context.commit('setWrongPassword', true)
                    } else if (error.request) {
                        // The request was made but no response was received
                        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                        // http.ClientRequest in node.js
                        console.log(error.request);
                        context.commit('setNetworkError', true)

                    } else {
                        // Something happened in setting up the request that triggered an Error
                        console.log('Error', error.message);
                    }
                    console.log(error.config);
                })
        },
        getUser(context){
            // context.commit('setPreloading', true);
            context.commit('setNetworkError', false)
            return window.axios
                .get(backendUrl+'/user', {
                headers: {
                    Authorization: 'Bearer ' + context.state.token
                }
                 })
                .then((response) => {

                context.commit('setUser', response.data);
                context.commit('setLoggedIn',true);
                // context.commit('setPreloading', false);

                })
                .catch((error) => {
                    console.log(error.toString())
                    context.commit('setLoggedIn',false);
                })
        },

        getRequest(context, url) {
            console.log('getRequest DISPATCHED');
            context.commit('setNetworkError', false)
            const config = {
                headers: {
                    "Authorization": "Bearer " + store.state.token,
                    "Content-Type": "multipart/form-data"
                }
            };
            return window.axios.get(backendUrl + url, config
            ).then(response => {
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
        },
        postRequest(context, params) {
            console.log('POST request DISPATCHED...');
            context.commit('setNetworkError', false)
            const url = params[0];
            const parameters = params[1];
            const config = {
                headers: {
                    "Authorization": "Bearer " + store.state.token,
                    "Content-Type": "multipart/form-data"
                }
            };
            console.log('PARAMETERS:', parameters);
            console.log('URL:', url);
            return window.axios.post(backendUrl + url, parameters, config).then(response => {
                console.log('RESPONSE DATA: ',response.data)
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
                        // store.commit('setNetworkError', true)
                        console.log('ERROR RESPONSE: ',error.response)
                        return error.response
                    } else if (error.request) {
                        // The request was made but no response was received
                        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                        // http.ClientRequest in node.js
                        console.log('ERROR REQUEST',error.request);
                        store.commit('setNetworkError', true)
                        return error
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        console.log('ERROR MESSAGE', error.message);
                        return error.message
                    }
                    // console.log(error.config);
                })
        },

        deleteRequest(context, params) {
            console.log('DELETE request DISPATCHED...');
            context.commit('setNetworkError', false)
            const url = params[0];
            const parameters = params[1];
            const config = {
                headers: {
                    "Authorization": "Bearer " + store.state.token,
                    "Content-Type": "multipart/form-data"
                }
            };
            console.log('PARAMETERS:', parameters);
            console.log('URL:', url);
            return window.axios.delete(backendUrl + url, config).then(response => {
                console.log('RESPONSE DATA: ',response.data)
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
                        // store.commit('setNetworkError', true)
                        console.log('ERROR RESPONSE: ',error.response)
                        return error.response
                    } else if (error.request) {
                        // The request was made but no response was received
                        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                        // http.ClientRequest in node.js
                        console.log('ERROR REQUEST',error.request);
                        store.commit('setNetworkError', true)
                        return error
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        console.log('ERROR MESSAGE', error.message);
                        return error.message
                    }
                    // console.log(error.config);
                })
        },

        getProjectWithMetricValues(context,project_id)
        {
            context.dispatch('getRequest', "/project/metricvalues/" + project_id).then(data =>{
                store.commit('setProjectsWithMetricValues',data);
                console.log('getProjectWithMetricValues DISPATCHED');
            })

        },
        getPeriods(context)
        {
            context.dispatch('getRequest', "/periods/").then(data =>{
                store.commit('setPeriods',data);
                console.log('getPeriods DISPATCHED');
            })
        },
        getAreas(context)
        {
            context.dispatch('getRequest', "/areas/").then(data =>{
                store.commit('setAreas',data);
                console.log('getAreas DISPATCHED');
            })
        },
        getUserAreas(context, user_id)
        {
            context.dispatch('getRequest','/users/' + user_id + '/areas').then(data =>{
                store.commit('setUserAreas',data);
                console.log('getUserAreas DISPATCHED');
            })
        },
        getMetricValues(context, project_id)
        {
            context.dispatch('getRequest','/metricvalues/' + project_id).then(data =>{
                store.commit('setMetricValues',data);
                console.log('getMetricValues DISPATCHED для проекта',project_id);
            })
        },
        getProjects(context)
        {
            context.dispatch('getRequest','/projectswith/metrics/').then(data =>{
                store.commit('setProjects',data);
                console.log('getProjects DISPATCHED');
            })
        },
        getUsers(context)
        {
            context.dispatch('getRequest','/users/').then(data =>{
                store.commit('setUsers',data);
                console.log('getUsers DISPATCHED');
            })
        },
        storeMetricValue(context, parameters)
        {
            return context.dispatch('postRequest',['/metricvalues/',parameters]).then(data =>{
                console.log('storeMetricValue DISPATCHED',);
                console.log('RESPONSE:', data);
                return data;
            })
        },
        storeUser(context, parameters)
        {
            return context.dispatch('postRequest',['/user/',parameters]).then(data =>{
                console.log('parameters',);
                console.log('storeUser DISPATCHED',);
                console.log('RESPONSE:', data);
                return data;
            })
        },
        updateUser(context, parameters)
        {
            return context.dispatch('postRequest',['/user/'+parameters[0],parameters[1]]).then(data =>{
                console.log('parameters',parameters);
                console.log('storeUser DISPATCHED',);
                console.log('RESPONSE:', data);
                return data;
            })
        },
        storeUserAreas(context, parameters)
        {
            console.log('parameters',);
            console.log('storeUserAreas DISPATCHED',);
            return context.dispatch('postRequest',['/user/'+parameters[0]+'/addareas/',parameters[1]]).then(data =>{

                console.log('RESPONSE:', data);
                return data;
            })
        },
        deleteUser(context, user_id)
        {
            return context.dispatch('deleteRequest',['/user/' + user_id, null]).then(data =>{
                console.log('parameters',);
                console.log('deleteUser DISPATCHED',);
                console.log('RESPONSE:', data);
                return data;
            })
        },
        getMetrics(context, project_id)
        {
            context.dispatch('getRequest','/metrics/' + project_id).then(data =>{
                store.commit('setMetrics',data);
                console.log('getMetrics DISPATCHED for project ', project_id);
            })
        },

    }

})

export default store;