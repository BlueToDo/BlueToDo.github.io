$(function(){
   var APLLICATION_ID = "93F0C6F8-B946-90BC-FF45-596FCC8FFF00", 
       SECRET_KEY = "38DECE74-C002-E7AA-FFA6-232638674100",
       VERSION = "v1";
       
       Backendless.initApp(APLLICATION_ID ,SECRET_KEY,VERSION);
       
       var postsCollection = Backendless.Persistence.of(Posts).find();
        
    console.log(postsCollection);
    var wrapper = {
        posts: postsCollection.data
    };
    
    Handlebars.registerHelper('format', function (time) {
        return moment(time).format("ddd, MMM Do YYYY");
    }); 
    Handlebars.registerHelper('poststoday',function () {
    var ALPHA = 0;
    
        return ALPHA;
    });
    
    var blogScript = $("#blogs-template").html();
    var blogTemplate = Handlebars.compile(blogScript);
    var blogHTML =  blogTemplate(wrapper);
    
    $('.main-container').html(blogHTML);
        
    var blogScriptB = $("#poststoday-template").html();
    var blogTemplateB = Handlebars.compile(blogScriptB);
    var blogHTMLB =  blogTemplateB(wrapper);
    
    $('.badge').html(blogHTMLB);
    
    var blogScriptC = $("#Titles-template").html();
    var blogTemplateC = Handlebars.compile(blogScriptC);
    var blogHTMLC =  blogTemplateC(wrapper);

   $('#post-titles').html(blogHTMLC);

});
function Posts(args){
    args = args || {};
    this.title = args.title || "";
    this.content = args.content || "";
    this.authorName = args.authorName || "";
}
// add bool 'complete and incompelete/
//if done do thing
//handlebars backendless delete