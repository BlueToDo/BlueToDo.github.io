$(function () {
    var APLLICATION_ID = "93F0C6F8-B946-90BC-FF45-596FCC8FFF00",
            SECRET_KEY = "38DECE74-C002-E7AA-FFA6-232638674100",
            VERSION = "v1";

    Backendless.initApp(APLLICATION_ID, SECRET_KEY, VERSION);

    if (Backendless.UserService.isValidLogin()) {
        userLoggedIn(Backendless.LocalCache.get("current-user-id"));
    }
    var userData;
    function userLoggedIn(user) {
        console.log("logged in");
        if (typeof user === "string") {
            userData = Backendless.Data.of(Backendless.User).findById(user);
        } else {
            userData = user;
        }
    }
    var userId = Backendless.LocalCache.get("current-user-id");
    var dataQuery = {condition: "ownerId = '" + userId + "'"};
    var tasksCollection = Backendless.Persistence.of(Posts).find(dataQuery);

    var wrapper = {
        posts: tasksCollection.data
    };
    Handlebars.registerHelper('format', function (time) {
        return moment(time).format("ddd, MMM Do YYYY");
    });

    var taskScript = $("#tasks-template").html();
    var taskTemplate = Handlebars.compile(taskScript);
    var taskHTML = taskTemplate(wrapper);

    $('.main-container').html(taskHTML);


    function Posts(args) {
        args = args || {};
        this.content = args.content || "";
        this.authorName = args.authorName || "";
        this.complete = args.complete || "";
    }
    $(document).on('click', '.doneTask', function (event) {
               
        var dataStore = Backendless.Persistence.of(Posts)
        
        var markComplete = Backendless.Persistence.of(Posts).findById(event.target.attributes.data.nodeValue);
        
        markComplete["complete"] = !markComplete["complete"];
        
        dataStore.save(markComplete);
        Materialize.toast('DONE', 2000);
        location.reload();
            });
    $(document).on('click', '.deleteTask', function (event) {
        console.log(event.target.attributes.data.nodeValue);
        Backendless.Persistence.of(Posts).remove(event.target.attributes.data.nodeValue);
        Materialize.toast('DELETED', 2000);
        location.reload();
    });
});