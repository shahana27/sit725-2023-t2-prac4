/* const cardList = [{
    title: 'My second Picture',
    path: 'images/sky5.jpeg',
    subTitle: 'About my second picture',
    description: 'Hello There! This is my second picture.'
},
{
    title: 'My third Picture',
    path: 'images/sky9.jpeg',
    subTitle: 'About my third picture',
    description: 'Hello There! This is my third picture.'
},
{
    title: 'My fourth Picture',
    path: 'images/sky3.jpeg',
    subTitle: 'About my fourth picture',
    description: 'Hello There! This is my fourth picture.'
},
{
    title: 'My fifth Picture',
    path: 'images/sky4.jpeg',
    subTitle: 'About my fifth picture',
    description: 'Hello There! This is my fifth picture.'
},
{
    title: 'My sixth Picture',
    path: 'images/sky8.jpeg',
    subTitle: 'About my sixth picture',
    description: 'Hello There! This is my sixth picture.'
}]; */

const addCards = (items) => {
    items.forEach(item => {
        let itemToAppend = '<div class="col s4 center-align">' +
            '<div class="card medium"><div class="card-image waves-effect waves-block waves-light"><img class="activator" src="' + item.path + '">' +
            '</div><div class="card-content">' +
            '<span class="card-title activator grey-text text-darken-4">' + item.title + '<i class="material-icons right">more_vert</i></span><p><a href="#">' + item.subTitle + '</a></p></div>' +
            '<div class="card-reveal">' +
            '<span class="card-title grey-text text-darken-4">' + item.title + '<i class="material-icons right">close</i></span>' +
            '<p class="card-text">' + item.description + '</p>' +
            '</div></div></div>';
        $("#card-section").append(itemToAppend)
    });
}

const formSumitted = () => {
    let formData = {};
    formData.title = $('#title').val();
    formData.subTitle = $('#subtitle').val();
    formData.path = $('#path').val();
    formData.description = $('#description').val();

    console.log(formData);
    postCat(formData);
}

function postCat(cat) {
    $.ajax({
        url: '/api/cat',
        type: 'POST',
        data: cat,
        success: (result) => {
            if (result.statusCode === 201) {
                alert('cat added');
                addCards(data);
            }
        }
    });
}

function getAllCats() {
    $.get('/api/cats', (result) => {
        console.log(result.statusCode);
        if (result.statusCode === 200) {
            addCards(result.data);
        }
        //res.send(result.data);
        //res.send('Hello World');
    });
}

$(document).ready(function () {
    $('.materialboxed').materialbox();
    $('#formSubmit').click(() => {
        formSumitted();
    });
    $('.modal').modal();
    getAllCats();
});