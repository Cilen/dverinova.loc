function showBlock (id) {
    $('.form-group[data-block='+id+']').show();;
};
function hideBlock () {
    $('#add-product-form .form-group:nth-of-type(n+2)').hide();
};
function updateProductForm(el){
    hideBlock();
    var category = $(el).val();
    switch (category) {
        case 'internalDoor':
            showBlock('name');
            showBlock('type');
            showBlock('availability');
            showBlock('size')
            showBlock('producer');
            showBlock('price');
            showBlock('discount');
            showBlock('description');
            showBlock('submit');
            break;
        case 'externalDoor':
            showBlock('name');
            showBlock('availability');
            showBlock('producer');
            showBlock('price');
            showBlock('discount');
            showBlock('description');
            showBlock('submit');
            showBlock('height');
            showBlock('width');
            showBlock('thickness');
            showBlock('lock');
            showBlock('filler');
            showBlock('covering');
            break;
        case 'laminate':
            showBlock('name');
            showBlock('availability');
            showBlock('producer');
            showBlock('price');
            showBlock('discount');
            showBlock('description');
            showBlock('submit');
            showBlock('length');
            showBlock('width');
            showBlock('thickness');
            showBlock('number_in_package');
            showBlock('total_area');
            break;
        case 'tile':
            showBlock('name');
            showBlock('availability');
            showBlock('producer');
            showBlock('price');
            showBlock('discount');
            showBlock('description');
            showBlock('submit');
            showBlock('length');
            showBlock('width');
            showBlock('thickness');
            showBlock('number_in_package');
            showBlock('total_area');
            break;
        default:
            hideBlock();
    };
};
//
// $('#buyProduct').submit(function(eventObject){
//     $('.bayModal').modal('hide');
//     console.log(eventObject);
//     return false;
// });

$("#buyProduct").submit(function(e) {

    $('.bayModal').modal('hide');
    var url = "/neworder"; // the script where you handle the form input.
    $.ajax({
        type: "POST",
        url: url,
        data: $("#buyProduct").serialize(), // serializes the form's elements.
        success: function(data)
        {
            $('.baySuccess').modal('show');
            console.log(data);
        },
        error: function(data)
        {
            $('.bayError').modal('show');
            console.log(data)
        }
    });
    e.preventDefault(); // avoid to execute the actual submit of the form.

});

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
        prices: [0,0,0]
    },
    actions: {},
    mutations: {
        savePrices(state, prices){
            state.prices = prices
        },
    },
    getters: {
        getPrices(state, getters){
            return state.prices;
        }
    },
    modules: {}
});