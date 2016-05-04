$(function () {

    var APLLICATION_ID = "93F0C6F8-B946-90BC-FF45-596FCC8FFF00",
            SECRET_KEY = "38DECE74-C002-E7AA-FFA6-232638674100",
            VERSION = "v1";

    Backendless.initApp(APLLICATION_ID, SECRET_KEY, VERSION);
    if (Backendless.UserService.isValidLogin()) {
        userLoggedIn(Backendless.LocalCache.get("current-user-id"))
    } else {
        var loginScript = $("#login-template").html();
        var loginTemplate = Handlebars.compile(loginScript);

        $('.main-container').html(loginTemplate);
    }
    $(document).on('submit', '.form-signin', function (event) {
        event.preventDefault();

        var data = $(this).serializeArray(),
                name = data[0].value,
                password = data[1].value;

        Backendless.UserService.login(name, password, true, new Backendless.Async(userLoggedIn, gotError));
    });

    $(document).on('click', '.add-task', function () {

        var addtaskScript = $("#add-task-template").html();
        var addtaskTemplate = Handlebars.compile(addtaskScript);

        $('.main-container').html(addtaskTemplate);
        tinymce.init({selector: 'textarea', selector: "textarea",
                    plugins: [
                        "advlist autolink lists link image charmap print preview anchor",
                        "searchreplace visualblocks code fullscreen",
                        "insertdatetime media table contextmenu paste"
                    ],
            toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image"});

    });
    $(document).on('submit', '.form-add-task', function (event) {
        event.preventDefault();
        var data = $(this).serializeArray(),
                content = data[0].value;

        if (content === "")
        {
            Materialize.toast('ERROR List IS EMPTY', 2000);
        }
        else {
            Materialize.toast('POSTED', 2000);
            var dataStore = Backendless.Persistence.of(Posts);
            console.log(Backendless.UserService.getCurrentUser());
            var postObject = new Posts({
                content: content,
                comeplete: false,
                authorName: Backendless.UserService.getCurrentUser().name
            });
            dataStore.save(postObject);
            this.content.value = "";

        }
    });
    $(document).on('click', '.logout', function () {
        Backendless.UserService.logout(new Backendless.Async(userLoggedout, gotError));
        var loginScript = $("#login-template").html();
        var loginTemplate = Handlebars.compile(loginScript);

        $('.main-container').html(loginTemplate);
    });
});

function userLoggedout() {
    console.log("logged out");
}
function Posts(args) {
    args = args || {};
    this.content = args.content || "";
    this.authorName = args.authorName || "";
    this.complete = args.complete || "";
}

function userLoggedIn(user) {
    console.log("logged in");
    var userData;
    if (typeof user === "string") {
        userData = Backendless.Data.of(Backendless.User).findById(user);
    } else {
        userData = user;
    }
    var welcomeScript = $('#welcome-template').html();
    var welcomeTemplate = Handlebars.compile(welcomeScript);
    var welcomeHTML = welcomeTemplate(userData);

    $('.main-container').html(welcomeHTML);
}
function gotError() {
    Materialize.toast('ERROR USER OR PASSWORD IS WRONG', 2000);
}