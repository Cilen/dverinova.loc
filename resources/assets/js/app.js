function showBlock (id) {
    $('.form-group[data-block='+id+']').show();;
};
function hideBlock () {
    $('#add-product-form .form-group:nth-of-type(n+2)').hide();
};

function runToastmessage(text, type) {
    type = type || 'success';  // "notice", "success", "warning", "error"
    $().toastmessage('showToast', {
        text     : text,
        sticky   : false,
        inEffectDuration:  600,
        stayTime: 3000,
        position : 'top-right',
        type     : type,
    });
};


// $('#buyProduct').submit(function(eventObject){
//     $('.bayModal').modal('hide');
//     console.log(eventObject);
//     return false;
// });

// $("#buyProduct").submit(function(e) {
//
//     $('.bayModal').modal('hide');
//     var url = "/neworder"; // the script where you handle the form input.
//     $.ajax({
//         type: "POST",
//         url: url,
//         data: $("#buyProduct").serialize(), // serializes the form's elements.
//         success: function(data)
//         {
//             $('.baySuccess').modal('show');
//             console.log(data);
//         },
//         error: function(data)
//         {
//             $('.bayError').modal('show');
//             console.log(data)
//         }
//     });
//     e.preventDefault(); // avoid to execute the actual submit of the form.
//
// });

$("#feedback").submit(function(e) {

    $('.feedbackModal').modal('hide');
    var url = "/newfeedback"; // the script where you handle the form input.
    $.ajax({
        type: "POST",
        url: url,
        data: $("#feedback").serialize(), // serializes the form's elements.
        success: function(data)
        {
            $('.feedbackSuccess').modal('show');
            console.log(data);
        },
        error: function(data)
        {
            $('.feedbackError').modal('show');
            console.log(data)
        }
    });
    e.preventDefault(); // avoid to execute the actual submit of the form.

});

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        prices: [0,0,0],
        accessories: [],
        parameters: []
    },
    actions: {},
    mutations: {
        savePrices(state, prices){
            state.prices = prices
        },
        saveAccessories(state, accessories){
            state.accessories = accessories
        },
        saveParameters(state, parameters){
            state.parameters = parameters
        }
    },
    getters: {
        getPrices(state, getters){
            return state.prices;
        },
        getAccessories(state, getters){
            return state.accessories;
        },
        getParameters(state, getters){
            return state.parameters;
        }
    },
    modules: {}
});

