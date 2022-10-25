import {createStore} from "vuex";
// import {error} from "@babel/eslint-parser/lib/convert";

const backendUrl = process.env.VUE_APP_BACKEND_URL;
const client_id = process.env.VUE_APP_CLIENT_ID;
const client_secret = process.env.VUE_APP_CLIENT_SECRET;



const  store = createStore({
    state: {
        user: {},
        projects: {},
        token: null,
        preLoading: false,
        wrongPassword: false,
        networkError: false,
        loggedIn: false,
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

            window.axios.get(backendUrl+'/logout',
                {
                    headers: {
                        Authorization: 'Bearer ' + context.state.token
                    }
            }).then(() => {
                    context.commit('setToken', null);
                    context.commit('setLoggedIn',false);
                    localStorage.removeItem('token');
                }
            )
                .catch((error) => {
                    console.log(error.toString())

                })
        },
        getUser(context){
            // context.commit('setPreloading', true);
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
    }

})

export default store;