// axios global

axios.defaults.headers.common['header']='global token'


// GET REQUEST
function getTodos() {
    // console.log('GET Request');

    // using axios 
    //method     //url                                      //limit of data

    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5',{timeout:5000})//,{params:{_limit:5}}

        .then((res) => { showOutput(res) })

        .catch((err) => { console.log(err) })
}



// POST REQUEST
function addTodo() {
    // console.log('POST Request');


    axios.post('https://jsonplaceholder.typicode.com/todos', {// what we write will get added in our todo
        title: 'created todo',
        completed: false
    })
        .then((res) => { showOutput(res) })
        .catch((err) => { console.log(err) })

}



// PUT/PATCH REQUEST
function updateTodo() {
    axios.patch('https://jsonplaceholder.typicode.com/todos/1', {//added the id of the request that we had to update /1 an patch inclue user id whereas put dont
        title: 'updated todo',
        completed: true

    }).then((res) => { showOutput(res) }).catch((err) => { console.log(err) })
}



// DELETE REQUEST
function removeTodo() {

    axios.delete('https://jsonplaceholder.typicode.com/todos/1', {


    }).then((res) => { showOutput(res) }).catch((err) => { console.log(err) })

}



// SIMULTANEOUS DATA
function getData() {

    axios.all([ //it will give us the multiple requests in the form of array like promise.all

        axios.get('https://jsonplaceholder.typicode.com/todos'),
        axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5')

    ]).then(axios.spread((todos, posts) => { showOutput(posts) })) //using axios.spread

        .catch((err) => { console.log(err) })
}



// CUSTOM HEADERS
function customHeaders() {
    const config = {
        headers: {
            'content-type': 'application/json',
            authorization: 'shubham solanki'
        }
    }

    axios.post('https://jsonplaceholder.typicode.com/todos', {
        title: 'created todo',
        completed: false
    }, config)
        .then((res) => { showOutput(res) })
        .catch((err) => { console.log(err) })
}



// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
    const options = {
        method: 'post',
        url: 'https://jsonplaceholder.typicode.com/todos',
        data: {

            title: 'hello world'
        },
        transformResponse: axios.defaults.transformResponse.concat((data) => {
            data.title = data.title.toUpperCase()
            return data
        })
    }



    axios(options).then((res) => { showOutput(res) })
}

// ERROR HANDLING
function errorHandling() {
    
    axios.get('https://jsonplaceholder.typicode.com/todosa', //{
        // validateStatus: function(status) {
        //   return status < 500; // Reject only if status is greater or equal to 500
        // })
    )

        .then((res) => { showOutput(res) })

        .catch((err) => {

            if(err.response)//if server responded a value more than 200 means it is an error
            {
                 console.log(err.response)
                 console.log(err.response.status)
                 console.log(err.response.headers)

                 if(err.response.status===404){
                    alert(`page not found`)
                 }
              
            }
        })
}



// CANCEL TOKEN
function cancelToken() {
     
    const source = axios.CancelToken.source();

    axios
      .get('https://jsonplaceholder.typicode.com/todos', {
        cancelToken: source.token
      })
      .then(res => showOutput(res))
      .catch(thrown => {
        if (axios.isCancel(thrown)) {
          console.log('Request canceled', thrown.message);
        }
      });
  
    if (true) {
      source.cancel('Request canceled!');
    }
    
}



// INTERCEPTING REQUESTS & RESPONSES

axios.interceptors.request.use((config) => {

    console.log(`${config.method.toUpperCase()} is sent to ${config.url} at ${new Date().getTime()}`)
    return config
},
    (error) => { return Promise.reject(error) })



// AXIOS INSTANCES

const axiosInstances=axios.create({

    baseURL:'https://jsonplaceholder.typicode.com/'
})

// axiosInstances.get('/comments')

// Show output in browser
function showOutput(res) {
    document.getElementById('res').innerHTML = `
    <div class="card card-body mb-4">
      <h5>Status: ${res.status}</h5>
    </div>
  
    <div class="card mt-3">
      <div class="card-header">
        Headers
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.headers, null, 2)}</pre>
      </div>
    </div>
  
    <div class="card mt-3">
      <div class="card-header">
        Data
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.data, null, 2)}</pre>
      </div>
    </div>
  
    <div class="card mt-3">
      <div class="card-header">
        Config
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.config, null, 2)}</pre>
      </div>
    </div>
  `;

}

// Event listeners
document.getElementById('get').addEventListener('click', getTodos);
document.getElementById('post').addEventListener('click', addTodo);
document.getElementById('update').addEventListener('click', updateTodo);
document.getElementById('delete').addEventListener('click', removeTodo);
document.getElementById('sim').addEventListener('click', getData);
document.getElementById('headers').addEventListener('click', customHeaders);
document
    .getElementById('transform')
    .addEventListener('click', transformResponse);
document.getElementById('error').addEventListener('click', errorHandling);
document.getElementById('cancel').addEventListener('click', cancelToken)
